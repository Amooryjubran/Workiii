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

    // Use map and Promise.all to handle async operations
    const bookingsWithClientInfo = await Promise.all(
      bookings.map(async (booking) => {
        const client = await db
          .collection("users")
          .findOne({ _id: booking.clientID });
        const service = await db
          .collection("services")
          .findOne({ _id: new ObjectId(booking.serviceId) });
        // Selecting specific fields from the client object
        booking.clientInformation = {
          name: client?.name,
          profileImg: client?.profileImg,
          phoneNumber: client?.phoneNumber,
          email: client?.email,
        };
        let timesBooked = booking.selectedTimes.length;
        let calculateAmount =
          Number(service?.serviceInfo?.servicePrice) * timesBooked;
        booking.serviceInfo = {
          title: service?.serviceInfo?.serviceTitle,
          category: service?.serviceInfo?.serviceCategory,
          image: service.images[0]?.src,
          amount: `$${calculateAmount}`,
        };
        booking.reservationDate = {
          day: booking.selectedDate,
          hours: booking.selectedTimes,
        };
        return booking;
      })
    );
    // Handle no bookings found
    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "No bookings found for this user" });
    }
    console.log();
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
