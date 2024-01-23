const client = require("../../../utils/db");
const { ObjectId } = require("mongodb");
const DeclineBooking = require("../../../templates/Dashboard/declineBooking");

const declineBooking = async (req, res) => {
  const { userId, bookingId, clientId } = req.body;
  console.log(req.body);
  if (!userId || !bookingId || !clientId) {
    return res.status(400).json({ status: 400, message: "Missing parameters" });
  }

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Find the user by userId
    const user = await db.collection("users").findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    // Find the client by clientId
    const clientDoc = await db.collection("users").findOne({ _id: clientId });
    if (!clientDoc) {
      return res.status(404).json({ status: 404, message: "Client not found" });
    }

    // Find the booking
    const booking = await db
      .collection("serviceBookings")
      .findOne({ _id: bookingId });
    if (!booking) {
      return res
        .status(404)
        .json({ status: 404, message: "Booking not found" });
    }

    // Check if booking is already in progress or completed
    if (
      booking.status === "IN-PROGRESS" ||
      booking.status === "COMPLETED" ||
      booking.status === "DECLINED"
    ) {
      return res.status(400).json({
        status: 400,
        message: "Cannot decline a booking that is in progress or completed",
      });
    }

    // Find the service information
    const service = await db
      .collection("services")
      .findOne({ _id: new ObjectId(booking.serviceId) });

    // Extract necessary details
    const { name: clientName, email: clientEmail } = clientDoc;
    const { name: labourerName, email: labourerEmail, profileImg } = user;
    const { location, selectedDate, totalPrice, selectedTimes } = booking;
    const { serviceInfo, images } = service;
    const { serviceTitle } = serviceInfo;

    // Update booking status to CANCELED or DECLINED
    await db
      .collection("serviceBookings")
      .updateOne({ _id: bookingId }, { $set: { status: "DECLINED" } });

    // DeclineBooking call with object
    DeclineBooking(
      clientEmail,
      clientName,
      labourerEmail,
      labourerName,
      location,
      selectedDate,
      totalPrice,
      selectedTimes,
      images[0]?.src || profileImg,
      serviceTitle
    );

    res.status(200).json({
      status: 200,
      message: "Booking declined successfully",
    });
  } catch (err) {
    console.error("Error in declineBooking:", err);
    res.status(500).json({
      status: 500,
      message: "An unexpected error occurred",
    });
  } finally {
    client.close();
  }
};

module.exports = declineBooking;
