const client = require("../../../utils/db");

const getAllApprovedServices = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Basic query for approved services
    let matchQuery = { status: "Approved" };

    // Extract query parameters
    const { category, priceMin, priceMax, rating } = req.query;

    if (category) {
      matchQuery["serviceInfo.serviceCategory"] = category;
    }
    if (rating) {
      matchQuery["serviceInfo.serviceRating"] = { $gte: parseInt(rating) };
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
