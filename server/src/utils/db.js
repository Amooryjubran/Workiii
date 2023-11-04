const { MongoClient } = require("mongodb");
const { MONGODB_URI } = process.env;

// Since the options are deprecated, you can now omit them completely
const client = new MongoClient(MONGODB_URI);

module.exports = client;
