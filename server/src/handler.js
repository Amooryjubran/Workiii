// Auth
const createUser = require("./controllers/Auth/createUser");
const verifyUser = require("./controllers/Auth/verifyUser");
const resendVerificationCode = require("./controllers/Auth/resendVerificationCode");
const signIn = require("./controllers/Auth/signIn");

// Actions
const getServicesFromWishlist = require("./controllers/Services/wishList/getServicesFromWishlist");
const addToWishList = require("./controllers/Services/wishList/addToWishList");
const removeFromWishList = require("./controllers/Services/wishList/removeFromWishList");

// Services
const topServices = require("./controllers/Services/TopServices");
const servicesCategories = require("./controllers/Services/servicesCategories");
const listAService = require("./controllers/Services/listAService");
const getlAllApprovedServices = require("./controllers/Services/getlAllApprovedServices");
const getServiceDetail = require("./controllers/Services/getServiceDetail");

// Dashboard
const getCategories = require("./controllers/Dashboard/Categories/getCategories");
const addCategory = require("./controllers/Dashboard/Categories/addCategory");
const deleteCategory = require("./controllers/Dashboard/Categories/deleteCategory");

const getAllUsers = require("./controllers/Dashboard/Users/getAllUsers");
const getUser = require("./controllers/Dashboard/Users/getUser");
const getAllServices = require("./controllers/Dashboard/Services/getAllServices");
const getService = require("./controllers/Dashboard/Services/getService");
const approveService = require("./controllers/Dashboard/Services/approveService");
const declineService = require("./controllers/Dashboard/Services/declineService");

const getListOfBookings = require("./controllers/Dashboard/Bookings/getListOfBookings");
const acceptBooking = require("./controllers/Dashboard/Bookings/acceptBooking");
const declineBooking = require("./controllers/Dashboard/Bookings/declineBooking");
const getBooking = require("./controllers/Dashboard/Bookings/getBooking");

// PAYMENT
const addCreditCard = require("./controllers/Payment/CreditCards/addCreditCard");
const getCreditCards = require("./controllers/Payment/CreditCards/getCreditCards");
const bookService = require("./controllers/Payment/Booking/bookService");

// PROFILE PAGE
const updateUserProfile = require("./controllers/Profile/updateUserProfile");
const getListOfBookingsPagination = require("./controllers/Profile/getListOfBookingsPagination");

module.exports = {
  // GET
  topServices,
  getServicesFromWishlist,
  servicesCategories,
  getCategories,
  getAllUsers,
  getUser,
  getAllServices,
  getService,
  getlAllApprovedServices,
  getServiceDetail,
  getCreditCards,
  getListOfBookings,
  getBooking,
  getListOfBookingsPagination,

  // POST
  createUser,
  verifyUser,
  resendVerificationCode,
  signIn,
  listAService,
  addCategory,
  bookService,
  acceptBooking,
  declineBooking,

  // PATCH
  addToWishList,
  addCreditCard,

  // PUT
  approveService,
  declineService,
  updateUserProfile,

  // DELETE
  removeFromWishList,
  deleteCategory,
};
