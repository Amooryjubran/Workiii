const client = require("../../../utils/db");

const getCategories = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Get categories
    const result = await db.collection("servicesCategories").find().toArray();
    let categories = result[0]?.categories;

    // Get services
    const services = await db.collection("services").find().toArray();

    // Count the number of services for each category
    categories = categories.map((category) => {
      const serviceCount = services.filter(
        (service) => service.serviceInfo?.serviceCategory === category.category
      ).length;

      return { ...category, numberOfServices: serviceCount };
    });

    // Combine categories and services in the response
    const responseData = { ...result[0], categories };

    return res
      .status(200)
      .json({ status: 200, data: responseData, message: "success" });
  } catch (err) {
    console.log("Error getting list of the services", err);
    return res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

module.exports = getCategories;
