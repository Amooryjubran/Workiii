const client = require("../../utils/db");
const verifyUser = async (req, res) => {
  const { email, code } = req.body;
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: 404, message: "User does not exist" });
    }

    if (user.verificationCode === code) {
      // Update user's verification status in the database
      await db
        .collection("users")
        .updateOne(
          { email },
          { $set: { isVerified: true, verificationCode: "" } }
        );

      // Fetch updated user's data
      const updatedUser = await db.collection("users").findOne({ email });

      // Remove password from the user data to be returned
      delete updatedUser.password;

      // Return updated user's data as a part of the response
      return res.status(200).json({
        status: 200,
        message: "User verified",
        user: updatedUser,
      });
    } else {
      return res
        .status(403)
        .json({ status: 403, message: "Incorrect verification code" });
    }
  } catch (err) {
    console.log("error", err);
    return res
      .status(500)
      .json({ status: 500, message: "An unexpected error occurred" });
  } finally {
    client.close();
  }
};
module.exports = verifyUser;
