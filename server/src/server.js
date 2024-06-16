"use strict";

require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const http = require("http");
const { Server } = require("socket.io");
const morgan = require("morgan");
const cors = require("cors");

const { MongoClient } = require("mongodb");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.WEBSOCKET,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  },
});
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.WEBSOCKET,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
const {
  // GET
  getServicesFromWishlist,
  servicesCategories,
  topServices,
  getCategories,
  getAllUsers,
  getUser,
  getAllServices,
  getService,
  getlAllApprovedServices,
  getServiceDetail,
  getReviews,
  getCreditCards,
  getListOfBookings,
  getBooking,
  getListOfBookingsPagination,
  servicesLocations,

  // POST
  listAService,
  createUser,
  verifyUser,
  resendVerificationCode,
  signIn,
  removeFromWishList,
  addCategory,
  deleteCategory,
  bookService,
  acceptBooking,
  declineBooking,
  addReview,

  // PATCH
  addToWishList,
  addCreditCard,

  // PUT
  approveService,
  declineService,
  updateUserProfile,
} = require("./handler");

// controllers
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// GET
app.get("/api/topServices", topServices);
app.get("/api/user/:userId/wishlist", getServicesFromWishlist);
app.get("/api/servicesCategories", servicesCategories);
app.get("/api/getCategories", getCategories);
app.get("/api/getAllUsers", getAllUsers);
app.get("/api/user/:userId", getUser);
app.get("/api/getAllServices", getAllServices);
app.get("/api/service/:serviceId", getService);
app.get("/api/getlAllApprovedServices", getlAllApprovedServices);
app.get("/api/getServiceDetail/:id", getServiceDetail);
app.get("/api/getReviews/:id", getReviews);
app.get("/api/user/:_id/creditCards", getCreditCards);
app.get("/api/:userId/getListOfBookings", getListOfBookings);
app.get("/api/bookings/:bookingId", getBooking);
app.get(
  "/api/:userId/getListOfBookingsPagination",
  getListOfBookingsPagination
);
app.get("/api/servicesLocations", servicesLocations);

// POST
app.post("/api/createUser", createUser);
app.post("/api/resendVerificationCode", resendVerificationCode);
app.post("/api/verifyUser", verifyUser);
app.post("/api/signIn", signIn);
app.post("/api/listAService", listAService);
app.post("/api/addCategory", addCategory);
app.post("/api/bookService", bookService);
app.post("/api/acceptBooking", acceptBooking);
app.post("/api/declineBooking", declineBooking);
app.post("/api/addReview", addReview);

// PATCH
app.patch("/api/addToWishList", addToWishList);
app.patch("/api/user/:_id/creditCards", addCreditCard);

// PUT
app.put("/api/:serviceId/approve", approveService);
app.put("/api/:serviceId/decline", declineService);
app.put("/api/updateUserProfile", updateUserProfile);

// DELETE
app.delete("/api/removeFromWishList", removeFromWishList);
app.delete("/api/deleteCategory", deleteCategory);

// Start the server with server.listen, not app.listen
server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

// MongoDB connection
(async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  app.locals.db = client.db();
  try {
    await client.connect();
    console.log("Connected correctly to MongoDB server");
  } catch (err) {
    console.error(err);
  }
})();
