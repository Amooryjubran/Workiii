const client = require("../../../utils/db");

const getAllUsers = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Get all users
    const users = await db.collection("users").find().toArray();

    // Remove sensitive information like passwords
    const sanitizedUsers = users.map(
      ({ password, verificationCode, ...user }) => user
    );

    // Return the response
    return res
      .status(200)
      .json({ status: 200, data: sanitizedUsers, message: "success" });
  } catch (err) {
    console.log("Error getting list of users", err);
    return res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

module.exports = getAllUsers;
