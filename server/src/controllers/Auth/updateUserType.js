const { ObjectId } = require("mongodb");
const client = require("../../utils/db");

const updateUserType = async (req, res) => {
  const { userId, userType } = req.body;

  try {
    await client.connect();
    const db = client.db("workiii");

    // Check if the user exists
    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    // Update the user's type
    await db.collection("users").updateOne(
      { _id: ObjectId(userId) },
      {
        $set: {
          userType: userType,
        },
      }
    );

    return res.status(200).json({
      status: 200,
      message: "User type updated successfully",
    });
  } catch (err) {
    console.log("Error updating user type", err);
    return res
      .status(500)
      .json({ status: 500, message: "An unexpected error occurred" });
  } finally {
    client.close();
  }
};

module.exports = updateUserType;
