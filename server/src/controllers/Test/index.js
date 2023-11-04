const client = require("../../utils/db");

const test = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("workiii");
    const result = await db.collection("Test").find().toArray();
    console.log("oamnr");
    return result
      ? res.status(200).json({ status: 200, data: result, message: "success" })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log("Error getting list of users", err);
    return res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};
module.exports = test;
