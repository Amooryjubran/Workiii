const client = require("../../../utils/db");

const getAllApprovedServices = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Basic query for approved services
    let matchQuery = { status: "Approved" };

    // Extract query parameters
    const { category, priceMin, priceMax, rating, userId, search, city } =
      req.query;

    let searchQuery = [];
    if (search) {
      const searchTerms = search.split(/\s+/); // Split the search string into words
      searchQuery = searchTerms.flatMap((term) => [
        { "serviceInfo.serviceTitle": { $regex: term, $options: "i" } },
        { "serviceInfo.serviceDescription": { $regex: term, $options: "i" } },
        { "serviceInfo.serviceCategory": { $regex: term, $options: "i" } },
        { "location.street": { $regex: term, $options: "i" } },
        { "location.city": { $regex: term, $options: "i" } },
        { "location.state": { $regex: term, $options: "i" } },
        { "location.postalCode": { $regex: term, $options: "i" } },
        { "location.country": { $regex: term, $options: "i" } },
      ]);
    }

    if (searchQuery.length > 0) {
      matchQuery.$or = searchQuery;
    }

    if (city) {
      const cities = city.split(",").map((c) => c.trim());
      matchQuery["location.city"] = {
        $in: cities.map((c) => new RegExp(c, "i")),
      }; // Filter by multiple cities
    }

    if (category) {
      matchQuery["serviceInfo.serviceCategory"] = category;
    }
    if (rating) {
      matchQuery["serviceInfo.serviceRating"] = { $gte: parseInt(rating) };
    }

    // Initialize user wishlist
    let userWishlist = [];
    let userExists = false;

    // Check if the service is in the user's wishlist
    if (userId) {
      const user = await db.collection("users").findOne({ _id: userId });
      if (user) {
        userExists = true;
        userWishlist = user.wishList || [];
      }
    }

    // Aggregation pipeline
    let pipeline = [
      { $match: matchQuery },
      {
        $addFields: {
          "serviceInfo.convertedPrice": {
            $convert: { input: "$serviceInfo.servicePrice", to: "double" },
          },
        },
      },
    ];

    if (priceMin !== undefined || priceMax !== undefined) {
      let priceRangeQuery = {};
      if (priceMin !== undefined) {
        priceRangeQuery.$gte = Number(priceMin);
      }
      if (priceMax !== undefined) {
        priceRangeQuery.$lte = Number(priceMax);
      }
      pipeline.push({
        $match: { "serviceInfo.convertedPrice": priceRangeQuery },
      });
    }

    // Join with the users collection
    pipeline.push({
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userInfo",
      },
    });

    // Unwind userInfo array (if needed)
    pipeline.push({
      $unwind: {
        path: "$userInfo",
        preserveNullAndEmptyArrays: true,
      },
    });

    // Add fields (or project) to reshape the document
    pipeline.push({
      $addFields: {
        userName: "$userInfo.name",
        userProfileImg: "$userInfo.profileImg",
        isWishlisted: userExists ? { $in: ["$_id", userWishlist] } : "No User",
      },
    });

    // Exclude fields
    pipeline.push({
      $project: {
        booking: 0,
        dateCreated: 0,
        status: 0,
        userInfo: 0,
      },
    });

    const result = await db
      .collection("services")
      .aggregate(pipeline)
      .toArray();

    return result
      ? res.status(200).json({ status: 200, data: result, message: "success" })
      : res.status(409).json({ status: 409, message: "No services found" });
  } catch (err) {
    console.error("Error getting list of all approved services", err);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: err.message,
    });
  } finally {
    client.close();
  }
};

module.exports = getAllApprovedServices;
