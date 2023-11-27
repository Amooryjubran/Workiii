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
const servicesCategories = require("./controllers/Services/servicesCategories");
const listAService = require("./controllers/Services/listAService");

module.exports = {
  // GET
  topServices,
  getServicesFromWishlist,
  servicesCategories,

  // POST
  createUser,
  verifyUser,
  signIn,
  listAService,

  // PATCH
  addToWishList,

  // DELETE
  removeFromWishList,
};
