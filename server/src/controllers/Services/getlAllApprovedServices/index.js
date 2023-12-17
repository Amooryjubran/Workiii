const client = require("../../../utils/db");

const getAllApprovedServices = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    // Query condition to only fetch services with status 'Approved'
    const query = { status: "Approved" };
    // Projection to exclude booking, dateCreated, and status fields
    const projection = { booking: 0, dateCreated: 0, status: 0 };
    const result = await db
      .collection("services")
      .find(query, { projection })
      .toArray();
    return result
      ? res.status(200).json({ status: 200, data: result, message: "success" })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log("Error getting list of all approved services", err);
    return res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

module.exports = getAllApprovedServices;
