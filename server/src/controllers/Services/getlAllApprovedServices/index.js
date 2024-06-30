const client = require("../../../utils/db");

const getAllApprovedServices = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    let matchQuery = { status: "Approved" };
    const { category, priceMin, priceMax, rating, userId, search, city, sort } =
      req.query;

    let searchQuery = [];
    if (search) {
      const searchTerms = search.split(/\s+/);
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

    let pipeline = [
      {
        $match: {
          ...matchQuery,
          ...(searchQuery.length > 0 && { $or: searchQuery }),
        },
      },
      {
        $addFields: {
          "serviceInfo.convertedPrice": {
            $convert: { input: "$serviceInfo.servicePrice", to: "double" },
          },
          averageRating: {
            $ifNull: [{ $avg: "$ratings.rate" }, 0],
          },
        },
      },
    ];

    if (rating) {
      let ratingLowerBound = parseFloat(rating);
      let ratingUpperBound = Math.floor(ratingLowerBound) + 0.9;
      pipeline.push({
        $match: {
          averageRating: {
            $gte: ratingLowerBound,
            $lte: ratingUpperBound,
          },
        },
      });
    }

    if (city) {
      pipeline.push({
        $match: {
          "location.city": {
            $in: city.split(",").map((c) => new RegExp(c.trim(), "i")),
          },
        },
      });
    }

    if (category) {
      pipeline.push({ $match: { "serviceInfo.serviceCategory": category } });
    }

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

    if (sort === "lowest") {
      pipeline.push({ $sort: { "serviceInfo.convertedPrice": 1 } });
    } else if (sort === "highest") {
      pipeline.push({ $sort: { "serviceInfo.convertedPrice": -1 } });
    }

    const result = await db
      .collection("services")
      .aggregate(pipeline)
      .toArray();

    return result
      ? res.status(200).json({ status: 200, data: result, message: "success" })
      : res.status(404).json({ status: 404, message: "No services found" });
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
