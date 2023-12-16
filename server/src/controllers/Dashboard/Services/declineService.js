const client = require("../../../utils/db");
const { ObjectId } = require("mongodb");

const declineService = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Extract the service ID from request parameters
    const { serviceId } = req.params;

    // Update the service's status to 'Declined'
    const updateResult = await db
      .collection("services")
      .updateOne(
        { _id: new ObjectId(serviceId) },
        { $set: { status: "Declined" } }
      );
    if (updateResult.matchedCount === 0) {
      // Service not found, send a 404 response
      return res
        .status(404)
        .json({ status: 404, message: "Service not found" });
    }

    // Send a success response
    return res.status(200).json({
      status: 200,
      data: updateResult,
      message: "Service declined successfully",
    });
  } catch (err) {
    // Log and handle any errors
    console.log("Error declining the service", err);
    return res.status(500).json({ status: 500, message: err.message });
  } finally {
    // Ensure the database connection is closed
    client.close();
  }
};

module.exports = declineService;
