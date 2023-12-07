const client = require("../../../utils/db");
const { ObjectId } = require("mongodb");

const deleteCategory = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Retrieve the user ID and category ID from the request body
    const { userId, categoryId } = req.body;
    // Retrieve the user from the users collection
    const user = await db.collection("users").findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is an admin
    if (user.userType !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized: Only admins can delete categories" });
    }

    // Delete the category
    const result = await db
      .collection("servicesCategories")
      .updateOne(
        {},
        { $pull: { categories: { _id: new ObjectId(categoryId) } } }
      );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Category not found or already deleted" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error deleting category", err);
    res.status(500).json({ message: err.message });
  } finally {
    client.close();
  }
};

module.exports = deleteCategory;
