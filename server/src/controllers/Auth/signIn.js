const client = require("../../utils/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(403).json({ status: 403, message: "Invalid password" });
    }

    delete user.password;

    return res.status(200).json({
      status: 200,
      user,
      token: "Bearer " + jwt.sign({ id: user._id }, process.env.JWT_SECRET),
    });
  } catch (err) {
    console.log("error", err);
    return res
      .status(500)
      .json({ status: 500, message: "An unexpected error occurred" });
  } finally {
    client.close();
  }
};
module.exports = signIn;
