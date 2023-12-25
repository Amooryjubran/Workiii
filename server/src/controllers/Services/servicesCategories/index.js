const client = require("../../../utils/db");

const servicesCategories = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Aggregation pipeline to filter categories with status 'Active' and include only _id and category
    const pipeline = [
      {
        $unwind: "$categories",
      },
      {
        $match: { "categories.status": "Active" },
      },
      {
        $project: {
          _id: "$categories._id",
          category: "$categories.category",
        },
      },
    ];

    const result = await db
      .collection("servicesCategories")
      .aggregate(pipeline)
      .toArray();
    console.log(result);
    return result.length > 0
      ? res.status(200).json({ status: 200, data: result, message: "success" })
      : res
          .status(409)
          .json({ status: 409, message: "No active categories found" });
  } catch (err) {
    console.log("Error getting list of the services", err);
    return res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

module.exports = servicesCategories;
