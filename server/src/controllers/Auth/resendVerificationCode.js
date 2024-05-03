const client = require("../../utils/db");
const sendVerificationEmail = require("../../helper/sendVerificationEmail");

function generateVerificationCode() {
  return Math.floor(Math.random() * 900000) + 100000;
}

async function resendVerificationCode(req, res) {
  const { email } = req.body;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const user = await db.collection("users").findOne({ email: email });
    console.log(email);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    if (!user.isVerified) {
      const newVerificationCode = generateVerificationCode().toString();
      await db
        .collection("users")
        .updateOne(
          { email: email },
          { $set: { verificationCode: newVerificationCode } }
        );
      await sendVerificationEmail(email, newVerificationCode);
      return res.status(202).json({
        status: "success",
        message: "Verification code resent successfully",
      });
    } else {
      return res.status(400).json({
        status: "info",
        message: "User already verified. No need to resend verification code.",
      });
    }
  } catch (err) {
    console.error("Error during resending verification code: ", err);
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred",
    });
  } finally {
    await client.close();
  }
}

module.exports = resendVerificationCode;
