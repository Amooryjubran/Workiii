// Auth
const createUser = require("./controllers/Auth/createUser");
const verifyUser = require("./controllers/Auth/verifyUser");
const signIn = require("./controllers/Auth/signIn");

module.exports = {
  createUser,
  verifyUser,
  signIn,
};
