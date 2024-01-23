const nodeoutlook = require("nodejs-nodemailer-outlook");

async function DeclineBooking(
  clientEmail,
  clientName,
  labourerEmail,
  labourerName,
  location,
  selectedDate,
  totalPrice,
  selectedTimes,
  profileImg,
  serviceTitle
) {
  const logoUrl = process.env.IMG_LOGO;

  const formattedDate = new Date(selectedDate).toLocaleDateString();
  const formattedTime = selectedTimes.join(", ");
  const formattedLocation = `${location.street}, ${location.city}, ${location.state}, ${location.country}, ${location.postalCode}`;

  // Email template for the client
  const clientEmailHtml = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #D9534F;">Service Cancellation Notice</h2>
        <p>Hello <strong>${clientName}</strong>,</p>
        <p>We regret to inform you that your booking for <strong>${serviceTitle}</strong> with <strong>${labourerName}</strong> has been declined.</p>
        <p>Details of the cancelled service:</p>
        <ul>
            <li>Location: ${formattedLocation}</li>
            <li>Date: ${formattedDate}</li>
            <li>Time: ${formattedTime}</li>
            <li>Total Price: ${totalPrice}</li>
        </ul>
        <p>We apologize for any inconvenience this may have caused. Please feel free to contact us for any further assistance or to make another booking.</p>
        <div style="margin-top: 30px;">
            <img src="${
              profileImg || logoUrl
            }" alt="Company Logo" style="height: 80px;"/>
        </div>
        <p style="margin-top: 20px; font-size: 0.9em; color: #555;">
            Best Regards,<br>
            Your Company Name
        </p>
    </div>
  `;

  // Email template for the laborer
  const labourerEmailHtml = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #D9534F;">Job Cancellation Notice</h2>
        <p>Hello <strong>${labourerName}</strong>,</p>
        <p>We would like to inform you that your assigned job for <strong>${serviceTitle}</strong> with <strong>${clientName}</strong> has been cancelled.</p>
        <p>Details of the cancelled job:</p>
        <ul>
            <li>Client: ${clientName}</li>
            <li>Location: ${formattedLocation}</li>
            <li>Date: ${formattedDate}</li>
            <li>Time: ${formattedTime}</li>
            <li>Total Price: ${totalPrice}</li>
        </ul>
        <p>We apologize for any inconvenience caused. We will keep you updated on future job assignments.</p>
        <div style="margin-top: 30px;">
            <img src="${
              profileImg || logoUrl
            }" alt="Company Logo" style="height: 80px;"/>
        </div>
        <p style="margin-top: 20px; font-size: 0.9em; color: #555;">
            Best Regards,<br>
            Your Company Name
        </p>
    </div>
  `;

  // Function to send email
  // Function to send email
  const sendEmail = (to, subject, html) => {
    return new Promise((resolve, reject) => {
      nodeoutlook.sendEmail({
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
        onError: (e) => {
          console.error("Email sending failed to:", to, "Error:", e);
          reject(e);
        },
        onSuccess: (i) => {
          console.log("Email sent successfully to:", to);
          resolve(i);
        },
      });
    });
  };

  try {
    // Send email to the client
    await sendEmail(
      clientEmail,
      `Notice of Booking Cancellation with ${labourerName}`,
      clientEmailHtml
    );
    console.log("Email sent successfully to client:", clientEmail);

    // Wait for a short delay before sending the next email (e.g., 5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Send email to the laborer
    await sendEmail(
      labourerEmail,
      "Notice of Job Cancellation",
      labourerEmailHtml
    );
    console.log("Email sent successfully to laborer:", labourerEmail);
  } catch (error) {
    console.error("Error in DeclineBooking function:", error);
  }
}

module.exports = DeclineBooking;
