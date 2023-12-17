const client = require("../../../utils/db");
const { ObjectId } = require("mongodb");
const ApprovedServiceEmail = require("../../../templates/Dashboard/approveService");

const approveService = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const { serviceId } = req.params;

    // Update the service's status to 'Approved'
    const updateResult = await db
      .collection("services")
      .updateOne(
        { _id: new ObjectId(serviceId) },
        { $set: { status: "Approved" } }
      );

    if (updateResult.matchedCount === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "Service not found" });
    }

    // Fetch the updated service details
    const service = await db
      .collection("services")
      .findOne({ _id: new ObjectId(serviceId) });
    if (!service) {
      return res
        .status(404)
        .json({ status: 404, message: "Service not found" });
    }

    // Fetch user details
    const user = await db.collection("users").findOne({ _id: service.userId });
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    // Send confirmation Email
    await ApprovedServiceEmail(
      user.email,
      user.name,
      service.serviceInfo.serviceTitle
    );

    return res.status(200).json({
      status: 200,
      data: updateResult,
      message: "Service approved successfully",
    });
  } catch (err) {
    console.log("Error approving the service", err);
    return res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = approveService;
