const client = require("../../../utils/db");

const getServicesFromWishlist = async (req, res) => {
  const userId = req.params.userId;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Find the user by userId and get their wishlist
    const user = await db.collection("users").findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Get the wishlist items (assuming the wishlist contains item IDs)
    const wishlistItems = user.wishList || [];

    // Fetch the corresponding services/items from their collection
    const services = await db
      .collection("services")
      .find({ _id: { $in: wishlistItems } })
      .toArray();

    return res.status(200).json({
      status: "success",
      data: services,
    });
  } catch (err) {
    console.error("Error during fetching services from wishlist: ", err);
    res
      .status(500)
      .json({ status: "error", message: "An unexpected error occurred" });
  } finally {
    await client.close();
  }
};

module.exports = getServicesFromWishlist;
