const client = require("../../../utils/db");
const { ObjectId } = require("mongodb");

const getReviews = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const serviceId = req.params.id;

    // Retrieve only the ratings from the service document
    const service = await db.collection("services").findOne(
      { _id: new ObjectId(serviceId) },
      { projection: { ratings: 1 } } // Projection to fetch only ratings
    );

    if (!service) {
      return res
        .status(404)
        .json({ status: 404, message: "Service not found" });
    }

    if (!service.ratings || service.ratings.length === 0) {
      return res.status(404).json({ status: 404, message: "No reviews found" });
    }

    // Calculate total reviews and average rating if ratings exist
    const totalReviews = service.ratings.length;
    const averageRating =
      service.ratings.reduce((acc, cur) => acc + cur.rate, 0) / totalReviews;
    const reviewsImagesCount = service.ratings.reduce(
      (acc, cur) => acc + (cur.images ? cur.images.length : 0),
      0
    );

    // Prepare the response object with reviews data
    const response = {
      averageRating,
      totalReviews,
      reviewsImagesCount,
      ratings: service.ratings,
    };

    res.status(200).json({ status: 200, data: response, message: "success" });
  } catch (err) {
    console.error("Error getting reviews", err);
    res.status(500).json({ status: 500, message: "Server Error" });
  }
};

module.exports = getReviews;
