const client = require("../../utils/db");

const updateUserProfile = async (req, res) => {
  const { _id, name, phoneNumber, email, dateOfBirth, location, profileImg } =
    req.body;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    // Find the current user by _id
    console.log(_id);
    const currentUser = await db.collection("users").findOne({ _id: _id });
    if (!currentUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    // Check if email is being used by another user
    const existingUserWithEmail = await db
      .collection("users")
      .findOne({ email: email, _id: { $ne: _id } });
    if (existingUserWithEmail) {
      return res.status(400).json({
        status: "error",
        message: "Email is already in use by another account.",
      });
    }

    // Check if the updates are necessary
    const isDateOfBirthChanged =
      JSON.stringify(currentUser.dateOfBirth) === JSON.stringify(dateOfBirth);

    const isLocationChanged =
      JSON.stringify(currentUser.location) !== JSON.stringify(location);

    if (
      currentUser.name === name &&
      currentUser.phoneNumber === phoneNumber &&
      currentUser.email === email &&
      isDateOfBirthChanged &&
      !isLocationChanged &&
      currentUser.profileImg === profileImg
    ) {
      return res.status(200).json({
        status: "info",
        message:
          "No updates are necessary; provided information matches the current profile.",
      });
    }
    console.log(req.body);

    console.log(currentUser.dateOfBirth);

    // Perform the update
    await db.collection("users").updateOne(
      { _id: _id },
      {
        $set: { name, phoneNumber, email, dateOfBirth, location, profileImg },
      }
    );
    // Perform the update
    const updateResult = await db.collection("users").updateOne(
      { _id: _id },
      {
        $set: { name, phoneNumber, email, dateOfBirth, location, profileImg },
      }
    );

    console.log("Update result:", updateResult);

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
