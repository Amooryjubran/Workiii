const client = require("../../../utils/db");

const getAllServices = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Fetch all services
    const services = await db.collection("services").find().toArray();

    // Extract unique userIds from services
    const userIds = [...new Set(services.map((service) => service.userId))];

    // Fetch users data based on userIds
    const users = await db
      .collection("users")
      .find({
        _id: { $in: userIds.map((id) => id) },
      })
      .toArray();

    // Create a mapping of userId to user name
    const userNameMap = users.reduce((acc, user) => {
      acc[user._id.toString()] = user.name;
      return acc;
    }, {});

    // Map services with user names and remove sensitive information
    const servicesWithUserNames = services.map((service) => {
      const { booking, dateCreated, location, ...serviceData } = service;
      return {
        ...serviceData,
        providerName: userNameMap[service.userId],
      };
    });

    return res
      .status(200)
      .json({ status: 200, data: servicesWithUserNames, message: "success" });
  } catch (err) {
    console.log("Error getting list of Services", err);
    return res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

module.exports = getAllServices;
