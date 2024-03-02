const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const client = require("../../utils/db");
const sendVerificationEmail = require("../../helper/sendVerificationEmail");

// Function to generate verification code
function generateVerificationCode() {
  return Math.floor(Math.random() * 900000) + 100000;
}

const createUser = async (req, res) => {
  const { name, email, password, phoneNumber, userType } = req.body;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const existingUser = await db.collection("users").findOne({ email: email });

    // Check if the user exists
    if (existingUser) {
      if (!existingUser.isVerified) {
        // Generate a new verification code for the unverified user
        const newVerificationCode = generateVerificationCode().toString();

        // Update the user's verification code in the database
        await db
          .collection("users")
          .updateOne(
            { email: email },
            { $set: { verificationCode: newVerificationCode } }
          );

        // Send verification email
        await sendVerificationEmail(email, newVerificationCode);
        return res.status(200).json({
          status: "success",
          message: "New verification code sent to unverified user",
        });
      } else {
        // User exists and is verified, provide a friendly message
        return res.status(200).json({
          status: "info",
          message: "You already have an account. Please login instead.",
        });
      }
    }

    // If the user does not exist, create a new user
    const user = {
      _id: uuidv4(),
      name: name,
      profileImg: "",
      userType: userType,
      phoneNumber: phoneNumber,
      status: "active",
      email: email,
      password: "",
      isVerified: false,
      verificationCode: "",
      dateOfBirth: "",
      creditCards: [],
      wishList: [],
      creationDate: new Date().toISOString(),
      location: "",
      dateOfBirth: "",
    };

    // Generate a verification code for the new user
    user.verificationCode = generateVerificationCode().toString();

    // Hash the password
    user.password = await bcrypt.hash(password, 10);
    await db.collection("users").insertOne(user);

    // Send verification email
    await sendVerificationEmail(email, user.verificationCode);
    res.status(201).json({
      status: "success",
      data: {
        _id: user._id,
        email: email,
        isVerified: user.isVerified,
      },
      message: "User created and verification email sent",
    });
  } catch (err) {
    console.error(
      "Error during user creation or updating verification code: ",
      err
    );
    res
      .status(500)
      .json({ status: "error", message: "An unexpected error occurred" });
  } finally {
    await client.close();
  }
};

module.exports = createUser;
