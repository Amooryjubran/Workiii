const client = require("../../../utils/db");
const { ObjectId } = require("mongodb");

const addToWishList = async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Check if the item exists in the services collection
    const itemExists = await db
      .collection("services")
      .findOne({ _id: new ObjectId(itemId) });
    if (!itemExists) {
      return res.status(404).json({
        status: "error",
        errorCode: "ITEM_NOT_FOUND",
        message: "Item not found in services",
      });
    }

    // Find the user by userId and check for duplicates
    const user = await db.collection("users").findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        status: "error",
        errorCode: "USER_NOT_FOUND",
        message: "User not found",
      });
    }

    if (user.wishList.includes(itemId)) {
      return res.status(409).json({
        status: "error",
        errorCode: "ITEM_ALREADY_IN_WISHLIST",
        message: "Item already in wishlist",
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
    res.status(500).json({
      status: "error",
      errorCode: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    });
  } finally {
    await client.close();
  }
};

module.exports = addToWishList;
