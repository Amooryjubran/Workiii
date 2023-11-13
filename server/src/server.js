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
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.WEBSOCKET,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
const {
  getServicesFromWishlist,
  createUser,
  verifyUser,
  signIn,
  topServices,
  addToWishList,
  removeFromWishList,
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

// POST
app.post("/api/createUser", createUser);
app.post("/api/verifyUser", verifyUser);
app.post("/api/signIn", signIn);

// PATCH
app.patch("/api/addToWishList", addToWishList);

// DELETE
app.delete("/api/removeFromWishList", removeFromWishList);

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
