const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const client = require("../../../utils/db");

const addCreditCard = async (req, res) => {
  const userId = req.params._id;
  const paymentMethodId = req.body.paymentMethodId;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    const existingUser = await db.collection("users").findOne({ _id: userId });
    console.log(existingUser);
    if (!existingUser) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    if (!paymentMethod) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid payment method" });
    }

    const cardExists = existingUser.creditCards.find(
      (card) => card.creditCardTokenID === paymentMethodId
    );
    if (cardExists) {
      return res
        .status(409)
        .json({ status: 409, message: "Card already added" });
    }

    let stripeCustomerId = existingUser.stripeCustomerId;

    if (!stripeCustomerId) {
      const stripeCustomer = await stripe.customers.create({
        payment_method: paymentMethodId,
        email: existingUser.email,
        invoice_settings: { default_payment_method: paymentMethodId },
      });
      stripeCustomerId = stripeCustomer.id;
      await db
        .collection("users")
        .updateOne({ _id: userId }, { $set: { stripeCustomerId } });
    } else {
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: stripeCustomerId,
      });
      await stripe.customers.update(stripeCustomerId, {
        invoice_settings: { default_payment_method: paymentMethodId },
      });
    }

    const cardInfo = {
      firstName: paymentMethod.billing_details.name.split(" ")[0],
      lastName: paymentMethod.billing_details.name.split(" ")[1] || "",
      creditCardTokenID: paymentMethodId,
      creditCardType: paymentMethod.card.brand,
      expiryDate: `${paymentMethod.card.exp_month}/${paymentMethod.card.exp_year}`,
      last4: paymentMethod.card.last4,
    };

    await db
      .collection("users")
      .updateOne({ _id: userId }, { $push: { creditCards: cardInfo } });

    res.status(200).json({ status: 200, message: "Card added successfully" });
  } catch (err) {
    console.error("Error in addCreditCard:", err);
    res
      .status(500)
      .json({ status: 500, message: "An unexpected error occurred" });
  } finally {
    client.close();
  }
};

module.exports = addCreditCard;
