// Auth
const createUser = require("./controllers/Auth/createUser");
const verifyUser = require("./controllers/Auth/verifyUser");
const signIn = require("./controllers/Auth/signIn");

// Actions
const getServicesFromWishlist = require("./controllers/Services/wishList/getServicesFromWishlist");
const addToWishList = require("./controllers/Services/wishList/addToWishList");
const removeFromWishList = require("./controllers/Services/wishList/removeFromWishList");

// Services
const topServices = require("./controllers/Services/TopServices");

module.exports = {
  // GET
  topServices,
  getServicesFromWishlist,

  // POST
  createUser,
  verifyUser,
  signIn,

  // PATCH
  addToWishList,

  // DELETE
  removeFromWishList,
};
