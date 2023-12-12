const client = require("../../../utils/db");

const getUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Get a single user by userId
    const user = await db.collection("users").findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    // Remove sensitive information
    const { password, verificationCode, ...sanitizedUser } = user;

    // Return the response
    return res
      .status(200)
      .json({ status: 200, data: sanitizedUser, message: "success" });
  } catch (err) {
    console.log("Error getting user", err);
    return res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

module.exports = getUser;
