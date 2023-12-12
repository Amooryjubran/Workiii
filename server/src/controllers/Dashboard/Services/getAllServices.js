const client = require("../../../utils/db");

const getAllServices = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const result = await db.collection("services").find().toArray();

    // Remove sensitive information
    const serivesList = result.map(
      ({ booking, dateCreated, location, ...service }) => service
    );
    return result
      ? res
          .status(200)
          .json({ status: 200, data: serivesList, message: "success" })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log("Error getting list of Services", err);
    return res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};
module.exports = getAllServices;
