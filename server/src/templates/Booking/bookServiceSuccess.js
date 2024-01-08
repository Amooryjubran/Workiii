const nodeoutlook = require("nodejs-nodemailer-outlook");

async function BookServiceSuccessEmail(email, userName, serviceDetails) {
  const logoUrl = process.env.IMG_LOGO;
  const emailHtml = /*html*/ `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #ffb142;">
            <h2>Service Booking Confirmation</h2>
            <p>Hello <strong>${userName}</strong>,</p>
            <p>Your booking for the service <strong>${
              serviceDetails.title
            }</strong> on <strong>${
    serviceDetails.date
  }</strong> has been successfully confirmed.</p>
            <p>Here are your booking details:</p>
            <ul>
                <li>Date: ${serviceDetails.date}</li>
                <li>Time: ${serviceDetails.times.join(", ")}</li>
                <li>Price: ${serviceDetails.price}</li>
                <li>Service Fee: ${serviceDetails.serviceFee}</li>
            </ul>
            <p>Thank you for choosing our services.</p>
            <div style="margin-top: 30px;">
                <img src="${logoUrl}" alt="Company Logo" style="height: 80px;"/>
            </div>
            <p style="margin-top: 20px; font-size: 0.9em; color: #555;">
                Best Regards,<br>
                Your Company Name
            </p>
        </div>
    `;

  nodeoutlook.sendEmail({
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Service Booking Confirmation",
    html: emailHtml,
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i),
  });
}

module.exports = BookServiceSuccessEmail;
