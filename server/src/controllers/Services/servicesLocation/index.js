const client = require("../../../utils/db");

const getServicesWithLocations = async (req, res) => {
  try {
    // Connect to the database
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Retrieve only the location of services that have been approved from the database
    const services = await db
      .collection("services")
      .find({ status: "Approved" }, { projection: { location: 1, _id: 0 } })
      .toArray();

    // Respond with the modified list of services that includes location details
    res.status(200).json({
      status: 200,
      message: "Approved services with locations retrieved successfully",
      services: services,
    });
  } catch (err) {
    console.error("Error in getServicesWithLocations:", err);
    res.status(500).json({
      status: 500,
      message: "An unexpected error occurred",
    });
  } finally {
    // Close the database connection
    client.close();
  }
};

module.exports = getServicesWithLocations;
