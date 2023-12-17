const nodeoutlook = require("nodejs-nodemailer-outlook");

async function DeclineServiceEmail(email, userName, serviceTitle) {
  const logoUrl = process.env.IMG_LOGO;
  const emailHtml = /*html*/ `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #ffb142;">
            <h2 style="color: #D9534F;">Service Request Declined</h2>
            <p>Hello <strong>${userName}</strong>,</p>
            <p>We regret to inform you that your request for the service <strong>${serviceTitle}</strong> has been declined.</p>
            <p>Please do not hesitate to contact us for further information or assistance.</p>
            <p>Thank you for considering us.</p>
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
    subject: "Your Service Request Has Been Declined",
    html: emailHtml,
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i),
  });
}

module.exports = DeclineServiceEmail;
