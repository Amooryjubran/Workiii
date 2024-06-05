const client = require("../../../utils/db");
const { ObjectId } = require("mongodb");

const addReview = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const { serviceId } = req.body;

    // Fetch the service to ensure it exists before adding a review
    const service = await db
      .collection("services")
      .findOne({ _id: new ObjectId(serviceId) });
    if (!service) {
      return res
        .status(404)
        .json({ status: 404, message: "Service not found" });
    }

    // Generate a unique identifier for the review
    const reviewId = new ObjectId();

    // Construct the review object from request body
    const review = {
      _id: reviewId,
      name: req.body.name,
      email: req.body.email,
      title: req.body.reviewTitle,
      review: req.body.reviewText,
      rate: req.body.userRating,
      images: req.body.images,
      datePosted: new Date(),
    };

    // Add the review to the service
    const result = await db
      .collection("services")
      .updateOne(
        { _id: new ObjectId(serviceId) },
        { $push: { ratings: review } }
      );

    if (result.modifiedCount === 0) {
      throw new Error("Failed to add review");
    }

    res.status(201).json({ status: 201, message: "Review added successfully" });
  } catch (err) {
    console.error("Error adding review", err);
    res.status(500).json({ status: 500, message: "Server Error" });
  }
};

module.exports = addReview;
