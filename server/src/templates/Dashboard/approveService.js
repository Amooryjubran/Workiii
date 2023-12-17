const nodeoutlook = require("nodejs-nodemailer-outlook");

async function ApprovedServiceEmail(email, userName, serviceTitle) {
  const logoUrl = process.env.IMG_LOGO;
  const emailHtml = /*html*/ `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #ffb142;">
            <h2 style="color: #4F8A10;">Service Approval Notification</h2>
            <p>Hello <strong>${userName}</strong>,</p>
            <p>Congratulations! Your request for the service <strong>${serviceTitle}</strong> has been approved.</p>
            <p>We're excited to work with you and looking forward to providing the best service possible.</p>
            <p>Thank you for choosing us.</p>
            <div style="margin-top: 30px;">
                <img src="${logoUrl}" alt="Company Logo" style="height: 80px;"/>
            </div>
            <p style="margin-top: 20px; font-size: 0.9em; color: #555;">
                Best Regards,<br>
                Workiii
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
    subject: "Your Service Request Has Been Approved!",
    html: emailHtml,
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i),
  });
}

module.exports = ApprovedServiceEmail;
