const client = require("../../utils/db");
const { ObjectId } = require("mongodb");

const createPaginationLinks = (baseURL, page, totalPages) => {
  return {
    self: `${baseURL}?page=${page}`,
    first: `${baseURL}?page=1`,
    last: `${baseURL}?page=${totalPages}`,
    prev: page > 1 ? `${baseURL}?page=${page - 1}` : null,
    next: page < totalPages ? `${baseURL}?page=${page + 1}` : null,
  };
};

const getListOfBookingsPagination = async (req, res) => {
  const userId = req.params.userId;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const baseURL = `${req.protocol}://${req.get(
    "host"
  )}/api/${userId}/getListOfBookingsPagination`;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Validate User
    const existingUser = await db.collection("users").findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate the total number of bookings
    const totalBookings = await db
      .collection("serviceBookings")
      .countDocuments({ userId: userId });
    const totalPages = Math.ceil(totalBookings / pageSize);

    // Retrieve bookings for the user with pagination
    const bookings = await db
      .collection("serviceBookings")
      .find({ userId: userId })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user on page " + page });
    }

    // Use map and Promise.all to handle async operations for enriching bookings with additional details
    const bookingsWithDetails = await Promise.all(
      bookings.map(async (booking) => {
        const clientInfo = await db
          .collection("users")
          .findOne({ _id: booking.clientID });
        const service = await db
          .collection("services")
          .findOne({ _id: new ObjectId(booking.serviceId) });

        return {
          ...booking,
          clientInformation: {
            name: clientInfo?.name,
            profileImg: clientInfo?.profileImg,
            phoneNumber: clientInfo?.phoneNumber,
            email: clientInfo?.email,
          },
          serviceInfo: {
            title: service?.serviceInfo?.serviceTitle,
            category: service?.serviceInfo?.serviceCategory,
            image: service.images[0]?.src,
            amount: `$${
              service.serviceInfo.servicePrice * booking.selectedTimes.length
            }`,
          },
          reservationDate: {
            day: booking.selectedDate,
            hours: booking.selectedTimes,
          },
        };
      })
    );

    const paginationLinks = createPaginationLinks(baseURL, page, totalPages);

    res.json({
      status: 200,
      message: "Bookings retrieved successfully",
      bookings: bookingsWithDetails,
      pagination: {
        totalItems: totalBookings,
        currentPage: page,
        pageSize: pageSize,
        totalPages: totalPages,
        links: paginationLinks, // Including pagination links for easier navigation
      },
    });
  } catch (err) {
    console.error("Error in getListOfBookingsPagination:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getListOfBookingsPagination;
