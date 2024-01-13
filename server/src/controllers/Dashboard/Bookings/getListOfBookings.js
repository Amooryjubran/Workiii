const client = require("../../../utils/db");
const { ObjectId } = require("mongodb");

const getListOfBookings = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Connect to the database
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Validate User
    const existingUser = await db.collection("users").findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    // Retrieve bookings for the user
    const bookings = await db
      .collection("serviceBookings")
      .find({ userId: userId })
      .toArray();

    // Handle no bookings found
    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "No bookings found for this user" });
    }

    // Respond with the list of bookings
    res.status(200).json({
      status: 200,
      message: "Bookings retrieved successfully",
      bookings: bookings,
    });
  } catch (err) {
    console.error("Error in getListOfBookings:", err);
    res.status(500).json({
      status: 500,
      message: "An unexpected error occurred",
    });
  } finally {
    // Close the database connection
    client.close();
  }
};

module.exports = getListOfBookings;
