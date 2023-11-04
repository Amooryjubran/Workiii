const { ObjectId } = require("mongodb");
const client = require("../../utils/db");

const receiveClerkWebhook = async (req, res) => {
  await client.connect();
  const db = client.db("workiii");
  const { data } = req.body;
  console.log("Webhook received:", req.body);
  try {
    switch (req.body.type) {
      case "user.created":
      case "user.updated":
        if (
          !data ||
          !data.email_addresses ||
          data.email_addresses.length === 0
        ) {
          throw new Error("No email addresses found in webhook data");
        }

        // Construct user object from Clerk data
        const user = {
          email: data.email_addresses[0].email_address,
          clerkId: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          phoneNumber: data.phone_numbers[0].phone_number,
          isVerified:
            data.email_addresses[0].verification.status === "verified",
          userType: null,
        };

        // Check if the user already exists in the database
        const existingUser = await db
          .collection("users")
          .findOne({ clerkId: data.id });
        if (existingUser) {
          // Update existing user
          await db
            .collection("users")
            .updateOne({ clerkId: data.id }, { $set: user });
        } else {
          // Insert new user
          await db.collection("users").insertOne(user);
        }
        break;
      // Add more case handlers if you're expecting other event types
      default:
        console.log(`Unhandled event type ${req.body.type}`);
    }

    res.status(200).send("Webhook received");
  } catch (err) {
    console.error("Webhook handler error:", err);
    res.status(500).send("Server Error");
  } finally {
    // Always close the client, regardless of success or failure
    await client.close();
  }
};

module.exports = { receiveClerkWebhook };
