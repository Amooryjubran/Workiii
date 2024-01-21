const client = require("../../../utils/db");
const { ObjectId } = require("mongodb");
const AcceptBooking = require("../../../templates/Dashboard/acceptBooking");

const acceptBooking = async (req, res) => {
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

    // Check if bookedServices contains the bookingId
    if (
      !clientDoc.bookedServices ||
      !clientDoc.bookedServices.includes(bookingId)
    ) {
      return res.status(404).json({
        status: 404,
        message: "Booking ID not found in client's booked services",
      });
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

    // Check if booking is already in progress
    if (booking.status === "IN-PROGRESS") {
      return res.status(400).json({
        status: 400,
        message: "Booking is already in progress",
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

    // Update booking status
    await db
      .collection("serviceBookings")
      .updateOne({ _id: bookingId }, { $set: { status: "IN-PROGRESS" } });

    // Send email notifications
    AcceptBooking(
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
      message: "Booking accepted successfully",
    });
  } catch (err) {
    console.error("Error in acceptBooking:", err);
    res.status(500).json({
      status: 500,
      message: "An unexpected error occurred",
    });
  } finally {
    client.close();
  }
};

module.exports = acceptBooking;
