const client = require("../../../utils/db");

const addToWishList = async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Check if the item exists in the services collection
    const itemExists = await db.collection("services").findOne({ _id: itemId });
    if (!itemExists) {
      return res.status(404).json({
        status: "error",
        message: "Item not found in services",
      });
    }

    // Find the user by userId
    const user = await db.collection("users").findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Add the item to the user's wishlist
    await db
      .collection("users")
      .updateOne({ _id: userId }, { $push: { wishList: itemId } });

    return res.status(200).json({
      status: "success",
      message: "Item added to wishlist",
    });
  } catch (err) {
    console.error("Error during adding item to wishlist: ", err);
    res
      .status(500)
      .json({ status: "error", message: "An unexpected error occurred" });
  } finally {
    await client.close();
  }
};

module.exports = addToWishList;

module.exports = addToWishList;
