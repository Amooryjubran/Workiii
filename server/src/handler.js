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

// Dashboard
const getCategories = require("./controllers/Dashboard/Categories/getCategories");
const addCategory = require("./controllers/Dashboard/Categories/addCategory");
const deleteCategory = require("./controllers/Dashboard/Categories/deleteCategory");

const getAllUsers = require("./controllers/Dashboard/Users/getAllUsers");
module.exports = {
  // GET
  topServices,
  getServicesFromWishlist,
  servicesCategories,
  getCategories,
  getAllUsers,

  // POST
  createUser,
  verifyUser,
  signIn,
  listAService,
  addCategory,

  // PATCH
  addToWishList,

  // DELETE
  removeFromWishList,
  deleteCategory,
};
