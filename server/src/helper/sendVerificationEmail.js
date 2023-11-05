const nodeoutlook = require("nodejs-nodemailer-outlook");
async function sendVerificationEmail(email, code) {
  nodeoutlook.sendEmail({
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Account Verification",
    html: `<p>Your verification code is: ${code}</p>`,
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i),
  });
}
module.exports = sendVerificationEmail;
