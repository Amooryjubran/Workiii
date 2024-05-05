const client = require("../../../utils/db");

const topServices = async (req, res) => {
  // Once we have more users and data, we could generate the top providers based on their reviews/job completed.
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const result = await db.collection("topProviders").find().toArray();
    return result
      ? res.status(200).json({ status: 200, data: result, message: "success" })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log("Error getting list of top Providers", err);
    return res.status(500).json({ status: 500, message: err });
  }
};
module.exports = topServices;
