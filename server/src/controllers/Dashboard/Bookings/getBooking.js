const dbClient = require("../../../utils/db");
const { ObjectId } = require("mongodb");

const getBooking = async (req, res) => {
  const bookingId = req.params.bookingId;
  console.log(bookingId);
  try {
    // Connect to the database
    await dbClient.connect();
    const db = dbClient.db(process.env.DB_NAME);

    // Retrieve the specific booking
    const booking = await db
      .collection("serviceBookings")
      .findOne({ _id: bookingId });

    // Handle booking not found
    if (!booking) {
      return res
        .status(404)
        .json({ status: 404, message: "Booking not found" });
    }

    // Retrieve client and service information
    const client = await db
      .collection("users")
      .findOne({ _id: booking.clientID });
    const service = await db
      .collection("services")
      .findOne({ _id: booking.serviceId });

    // Add client and service information to the booking object
    booking.clientInformation = {
      name: client?.name,
      profileImg: client?.profileImg,
      phoneNumber: client?.phoneNumber,
      email: client?.email,
    };

    let timesBooked = booking.selectedTimes.length;

    booking.reservationDate = {
      day: booking.selectedDate,
      hours: booking.selectedTimes,
    };

    // Respond with the booking details
    res.status(200).json({
      status: 200,
      message: "Booking retrieved successfully",
      booking: booking,
    });
  } catch (err) {
    console.error("Error in getBooking:", err);
    res.status(500).json({
      status: 500,
      message: "An unexpected error occurred",
    });
  } finally {
    // Close the database connection
    dbClient.close();
  }
};

module.exports = getBooking;
