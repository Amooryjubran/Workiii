const nodeoutlook = require("nodejs-nodemailer-outlook");

async function AcceptBooking(
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
        <h2 style="color: #4F8A10;">Service Confirmation</h2>
        <p>Hello <strong>${clientName}</strong>,</p>
        <p>We are pleased to inform you that <strong>${labourerName}</strong> will be handling your request for <strong>${serviceTitle}</strong>.</p>
        <p>Details of the service:</p>
        <ul>
            <li>Location: ${formattedLocation}</li>
            <li>Date: ${formattedDate}</li>
            <li>Time: ${formattedTime}</li>
            <li>Total Price: ${totalPrice}</li>
        </ul>
        <p>Should you have any questions, please feel free to contact us.</p>
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
        <h2 style="color: #4F8A10;">Job Assignment Confirmation</h2>
        <p>Hello <strong>${labourerName}</strong>,</p>
        <p>You have been assigned a new job for <strong>${serviceTitle}</strong>.</p>
        <p>Details of the job:</p>
        <ul>
            <li>Client: ${clientName}</li>
            <li>Location: ${formattedLocation}</li>
            <li>Date: ${formattedDate}</li>
            <li>Time: ${formattedTime}</li>
            <li>Total Price: ${totalPrice}</li>
        </ul>
        <p>Please ensure to arrive on time and be well-prepared for the job.</p>
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
        onError: (e) => reject(e),
        onSuccess: (i) => resolve(i),
      });
    });
  };

  try {
    // Send email to the client
    await sendEmail(
      clientEmail,
      `Confirmation of Your Scheduled Job with ${labourerName}`,
      clientEmailHtml
    );

    // Wait for a short delay before sending the next email (e.g., 5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Send email to the laborer
    await sendEmail(
      labourerEmail,
      "Job Assignment Confirmation",
      labourerEmailHtml
    );
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = AcceptBooking;
