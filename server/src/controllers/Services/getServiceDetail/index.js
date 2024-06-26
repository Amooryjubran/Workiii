const client = require("../../../utils/db");
const { ObjectId } = require("mongodb");

const getServiceDetail = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const serviceId = req.params.id;

    const service = await db
      .collection("services")
      .findOne({ _id: new ObjectId(serviceId) });
    if (!service) {
      return res
        .status(404)
        .json({ status: 404, message: "Service not found" });
    }

    let response = { ...service };
    // Calculate the average rating and count reviews if ratings exist
    if (service.ratings && service.ratings.length > 0) {
      const totalReviews = service.ratings.length;
      const averageRating =
        service.ratings.reduce((acc, cur) => acc + cur.rate, 0) / totalReviews;
      // Calculate total images across all reviews
      const reviewsImagesCount = service.ratings.reduce(
        (acc, cur) => acc + (cur.images ? cur.images.length : 0),
        0
      );
      response = {
        ...response,
        averageRating,
        totalReviews,
        reviewsImagesCount,
      };
    } else {
      response = {
        ...response,
        averageRating: 0,
        totalReviews: 0,
      };
    }

    if (service.status === "Approved") {
      const user = await db
        .collection("users")
        .findOne({ _id: service.userId });

      if (!user) {
        return res.status(404).json({ status: 404, message: "User not found" });
      }

      response = {
        ...response,
        providerName: user.name,
        pageType: "SERVICE",
      };
    }

    switch (service.status) {
      case "Pending":
        return res
          .status(403)
          .json({ status: 403, message: "Service is pending approval" });

      case "Declined":
        return res
          .status(403)
          .json({ status: 403, message: "Service has been declined" });

      default:
        res
          .status(200)
          .json({ status: 200, data: response, message: "success" });
    }
  } catch (err) {
    console.error("Error getting service detail", err);
    res.status(500).json({ status: 500, message: "Server Error" });
  }
};

module.exports = getServiceDetail;
