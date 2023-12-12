const client = require("../../../utils/db");
const { ObjectId } = require("mongodb");

const getService = async (req, res) => {
  const serviceId = req.params.serviceId;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Get a single service by serviceId
    const service = await db
      .collection("services")
      .findOne({ _id: new ObjectId(serviceId) });

    if (!service) {
      return res
        .status(404)
        .json({ status: 404, message: "service not found" });
    }

    // Return the response
    return res
      .status(200)
      .json({ status: 200, data: service, message: "success" });
  } catch (err) {
    console.log("Error getting service", err);
    return res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

module.exports = getService;
