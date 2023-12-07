const client = require("../../../utils/db");
const { ObjectId } = require("mongodb");
const addCategory = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Retrieve the user ID from the request body
    const { userId, category, certificateRequired } = req.body;

    // Retrieve the user from the users collection
    const user = await db.collection("users").findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is an admin
    if (user.userType !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized: Only admins can add categories" });
    }

    // Check if the category exists
    const existingCategory = await db
      .collection("servicesCategories")
      .findOne({ "categories.category": category });
    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists" });
    }

    // Create a new ObjectId for the category
    const categoryId = new ObjectId();

    // Add the category
    await db.collection("servicesCategories").updateOne(
      {},
      {
        $push: {
          categories: {
            _id: categoryId,
            category,
            numberOfServices: 0,
            certificateRequired,
            status: "Active",
          },
        },
      }
    );

    res.status(201).json({ message: "Category added successfully" });
  } catch (err) {
    console.error("Error adding category", err);
    res.status(500).json({ message: err.message });
  } finally {
    client.close();
  }
};

module.exports = addCategory;
