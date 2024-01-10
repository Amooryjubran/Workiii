# Booking Service Documentation

## Overview

This folder contains the booking service functionality for our application, primarily managed by the `bookService.js` file. This file handles service booking requests, interacts with Stripe for payment handling, and updates our database accordingly.

## `bookService.js` Explained

The `bookService.js` file is responsible for:

- Parsing request data (user and service details, selected dates, pricing, etc.).
- Validating the user and service data with the database.
- Creating a payment intent with Stripe that authorizes but does not capture the charge.
- Updating our database with the booking and payment information.
- Sending a booking success email to the user.

### Stripe Payment Handling

The Stripe payment process authorizes a charge but does not immediately capture it. This allows us to capture or cancel the charge based on service fulfillment.

## Implementing Payment Capture and Cancellation

### Capturing Payment

To capture a payment after service delivery, use the following function:

```javascript
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Function to Capture the Payment
const capturePayment = async (paymentIntentId) => {
  try {
    const capturedPayment = await stripe.paymentIntents.capture(
      paymentIntentId
    );
    console.log("Payment captured:", capturedPayment);
    // Handle post-capture logic (e.g., updating database, sending confirmation)
  } catch (err) {
    console.error("Error capturing payment:", err);
    // Error handling
  }
};
```

### Cancelling Payment Authorization

If the service is cancelled or not provided, use this function:

```javascript
// Function to Cancel the Authorization
const cancelAuthorization = async (paymentIntentId) => {
  try {
    const canceledIntent = await stripe.paymentIntents.cancel(paymentIntentId);
    console.log("Authorization canceled:", canceledIntent);
    // Handle post-cancellation logic (e.g., updating database, notifying user)
  } catch (err) {
    console.error("Error canceling authorization:", err);
    // Error handling
  }
};
```

### Usage

To book a service, send a POST request with the necessary data (userId, serviceId, etc.) to the booking endpoint. The service will handle the rest, including payment authorization with Stripe.

Notes:

- Ensure that the Stripe API version you are using is compatible with the code.
- Regularly update the database and email templates as needed.
- Handle exceptions and errors gracefully to improve user experience.
- Refer to inline comments in bookService.js for more detailed information.
