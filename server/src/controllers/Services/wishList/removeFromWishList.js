const client = require("../../../utils/db");

const removeFromWishList = async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Find the user by userId
    const user = await db.collection("users").findOne({ _id: userId });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Check if the item is in the user's wishlist
    if (!user.wishList.includes(itemId)) {
      return res.status(404).json({
        status: "error",
        message: "Item not found in wishlist",
      });
    }

    // Remove the item from the user's wishlist
    await db
      .collection("users")
      .updateOne({ _id: userId }, { $pull: { wishList: itemId } });

    return res.status(200).json({
      status: "success",
      message: "Item removed from wishlist",
    });
  } catch (err) {
    console.error("Error during removing item from wishlist: ", err);
    res
      .status(500)
      .json({ status: "error", message: "An unexpected error occurred" });
  } finally {
    await client.close();
  }
};

module.exports = removeFromWishList;
