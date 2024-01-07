const client = require("../../../utils/db");

const getCreditCards = async (req, res) => {
  const userId = req.params._id;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    const existingUser = await db.collection("users").findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const creditCards = existingUser.creditCards || [];
    res.status(200).json({ status: 200, creditCards });
  } catch (err) {
    console.error("Error in getCreditCards:", err);
    res
      .status(500)
      .json({ status: 500, message: "An unexpected error occurred" });
  } finally {
    client.close();
  }
};

module.exports = getCreditCards;
