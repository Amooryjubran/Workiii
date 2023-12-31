const client = require("../../../utils/db");
const { ObjectId } = require("mongodb");

const getServiceDetail = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    const serviceId = req.params.id;

    // Fetch the service by _id, without filtering by status
    const service = await db
      .collection("services")
      .findOne({ _id: new ObjectId(serviceId) });

    if (!service) {
      return res
        .status(404)
        .json({ status: 404, message: "Service not found" });
    }

    // Check the status of the service and respond accordingly
    switch (service.status) {
      case "Approved":
        const user = await db
          .collection("users")
          .findOne({ _id: service.userId });

        if (!user) {
          return res
            .status(404)
            .json({ status: 404, message: "User not found" });
        }

        const { ...serviceData } = service;
        const response = {
          ...serviceData,
          providerName: user.name,
          pageType: "SERVICE",
        };

        return res
          .status(200)
          .json({ status: 200, data: response, message: "success" });

      case "Pending":
        return res
          .status(403)
          .json({ status: 403, message: "Service is pending approval" });

      case "Declined":
        return res
          .status(403)
          .json({ status: 403, message: "Service has been declined" });

      default:
        return res
          .status(500)
          .json({ status: 500, message: "Unexpected status value" });
    }
  } catch (err) {
    console.log("Error getting service detail", err);
    return res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

module.exports = getServiceDetail;
