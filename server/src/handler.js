// Auth
const createUser = require("./controllers/Auth/createUser");
const verifyUser = require("./controllers/Auth/verifyUser");
const signIn = require("./controllers/Auth/signIn");

// Services
const topServices = require("./controllers/Services/TopServices");

module.exports = {
  // GET
  topServices,

  // POST
  createUser,
  verifyUser,
  signIn,
};
