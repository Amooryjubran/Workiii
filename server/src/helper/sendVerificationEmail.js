const nodeoutlook = require("nodejs-nodemailer-outlook");
const verificationEmail = require("../templates/Auth/createUser");
async function sendVerificationEmail(email, code) {
  nodeoutlook.sendEmail({
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    from: {
      name: "Workiii",
      address: process.env.EMAIL_USER,
    },
    to: email,
    subject: "Account Verifications",
    html: verificationEmail(email, code),
    text: "Workiii",
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i),
  });
}
module.exports = sendVerificationEmail;
