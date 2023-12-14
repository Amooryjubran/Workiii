const client = require("../../../utils/db");

const listAService = async (req, res) => {
  try {
    // Connect to the database
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Destructure userData and serviceData from request body
    const { userId, serviceData } = req.body;
    // Check if the user exists in the 'users' collection
    const user = await db.collection("users").findOne({ _id: userId });
    if (!user) {
      // User not found, send a 404 response
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    // Enrich the service data with additional fields
    const enrichedServiceData = {
      ...serviceData,
      status: "Pending", // Set the status to 'Pending'
      ratings: [],
      dateCreated: new Date(), // Record the creation date and time
      userId: user._id, // Link the service to the user's ID
    };

    // Insert the new enriched service data into the 'services' collection
    const result = await db
      .collection("services")
      .insertOne(enrichedServiceData);

    // Send a success response if the insertion was successful
    return result
      ? res.status(200).json({
          status: 200,
          data: result,
          message: "Service listed successfully",
        })
      : res.status(409).json({ status: 409, message: "Error saving service" });
  } catch (err) {
    // Log and handle any errors
    console.log("Error listing a service", err);
    return res.status(500).json({ status: 500, message: err.message });
  } finally {
    // Ensure the database connection is closed
    client.close();
  }
};
module.exports = listAService;
