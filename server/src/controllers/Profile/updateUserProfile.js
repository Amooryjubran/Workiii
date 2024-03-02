const client = require("../../utils/db");

const updateUserProfile = async (req, res) => {
  const {
    userId,
    name,
    phoneNumber,
    email,
    dateOfBirth,
    location,
    profileImg,
  } = req.body;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Find the current user by userId
    const currentUser = await db.collection("users").findOne({ _id: userId });
    if (!currentUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Check if email is being used by another user
    const existingUserWithEmail = await db
      .collection("users")
      .findOne({ email: email, _id: { $ne: userId } });
    if (existingUserWithEmail) {
      return res.status(400).json({
        status: "error",
        message: "Email is already in use by another account.",
      });
    }

    // Check if the updates are necessary
    const isDateOfBirthChanged =
      currentUser.dateOfBirth.year !== dateOfBirth.year ||
      currentUser.dateOfBirth.month !== dateOfBirth.month ||
      currentUser.dateOfBirth.day !== dateOfBirth.day;

    const isLocationChanged =
      JSON.stringify(currentUser.location) !== JSON.stringify(location);

    if (
      currentUser.name === name &&
      currentUser.phoneNumber === phoneNumber &&
      currentUser.email === email &&
      !isDateOfBirthChanged &&
      !isLocationChanged &&
      currentUser.profileImg === profileImg
    ) {
      return res.status(200).json({
        status: "info",
        message:
          "No updates are necessary; provided information matches the current profile.",
      });
    }

    // Perform the update
    await db.collection("users").updateOne(
      { _id: userId },
      {
        $set: { name, phoneNumber, email, dateOfBirth, location, profileImg },
      }
    );

    res.status(200).json({
      status: "success",
      message: "User profile updated successfully.",
    });
  } catch (err) {
    console.error("Error during user profile update:", err);
    res
      .status(500)
      .json({ status: "error", message: "An unexpected error occurred" });
  } finally {
    await client.close();
  }
};

module.exports = updateUserProfile;
