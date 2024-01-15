const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const client = require("../../../utils/db");
const { ObjectId } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const BookServiceSuccessEmail = require("../../../templates/Booking/bookServiceSuccess");

const bookService = async (req, res) => {
  // Step 1: Request Data Parsing
  const {
    userId,
    serviceId,
    location,
    selectedDate,
    selectedTimes,
    totalPrice,
    serviceFee,
    selectedCreditCard,
  } = req.body;

  try {
    // Step 2: Database Validation
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Validate User
    const existingUser = await db.collection("users").findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    // Validate Service
    const existingService = await db
      .collection("services")
      .findOne({ _id: new ObjectId(serviceId) });
    if (!existingService) {
      return res
        .status(404)
        .json({ status: 404, message: "Service not found" });
    }

    // Validate Credit Card
    const selectedCard = existingUser.creditCards.find(
      (card) => card.creditCardTokenID === selectedCreditCard
    );
    if (!selectedCard) {
      return res.status(400).json({ status: 400, message: "Card not found" });
    }

    // Step 3: Stripe Payment Processing
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice + serviceFee,
      currency: "usd",
      customer: existingUser.stripeCustomerId,
      payment_method: selectedCreditCard,
      confirm: true,
      capture_method: "manual", // capture the charge in the bank (hold in the payment), if the labourler accepts, we charge, otherwise we release
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    const ID = uuidv4();
    // Step 4: Database Update for Service Booking
    const serviceBooking = {
      _id: ID,
      userId: userId,
      location,
      selectedDate,
      selectedTimes,
      totalPrice,
      serviceFee,
      paymentStatus: paymentIntent.status,
      serviceId: serviceId,
      status: "PENDING",
      createdAt: new Date(),
      clientID: existingUser._id,
    };
    const bookingResult = await db
      .collection("serviceBookings")
      .insertOne(serviceBooking);
    const bookingId = ID;

    // Update User's bookedServices
    await db
      .collection("users")
      .updateOne({ _id: userId }, { $push: { bookedServices: bookingId } });

    // Update Service's bookedServices
    await db
      .collection("services")
      .updateOne(
        { _id: new ObjectId(serviceId) },
        { $push: { bookedServices: bookingId } }
      );

    // Prepare email details
    const serviceDetails = {
      title: existingService.serviceInfo.serviceTitle,
      date: selectedDate,
      times: selectedTimes,
      price: totalPrice,
      serviceFee: serviceFee,
    };
    await BookServiceSuccessEmail(
      existingUser.email,
      existingUser.name,
      serviceDetails
    );

    // Step 5: Response Handling
    res.status(200).json({
      status: 200,
      message: "Service booked and payment successful",
      bookingId: bookingId,
      bookingDetails: serviceBooking,
      paymentDetails: paymentIntent,
    });
  } catch (err) {
    console.error("Error in bookService:", err);
    res
      .status(500)
      .json({ status: 500, message: "An unexpected error occurred" });
  } finally {
    client.close();
  }
};

module.exports = bookService;
