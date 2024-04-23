const verificationEmail = (email, code) => {
  const logoSrc =
    "https://res.cloudinary.com/movieslify/image/upload/v1713914841/hxvzkwlrra5mit3hu7q7.svg";
  const primaryColor = "#123456";
  const secondaryColor = "#ffb142";

  return `
          <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; color: ${secondaryColor}; max-width: 600px; margin: 20px auto; padding: 20px; border-top: 10px solid ${secondaryColor};">
            <table style="width: 100%; margin-bottom: 20px;">
              <tr>
                <td style="text-align: center;">
                  <table >
                    <tr>
                      <td style="padding-right: 10px;">
                        <div style="background: ${secondaryColor};; border-radius: 8px; padding: 4.688px 3.125px 3.125px 4.688px;">
                          <img src="${logoSrc}" alt="Workiii Logo" style="width: 50px; height: 50px; border-radius: 50%; filter: brightness(0) invert(1);">
                        </div>
                      </td>
                      <td>
                        <h1 style="margin: 0; font-size: 24px; color: ${primaryColor};">Workiii</h1>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <div style="text-align: left;">
              <h1 style="color: ${primaryColor}; padding: 10px 0; font-size: 18px;">Hi,</h1>
              <h1 style="line-height: 1.7; color: ${primaryColor}; padding: 10px 0; font-size: 18px;">Thanks for verifying your ${email} account! Your verification code is:</h1>
              <h1 style="padding: 24px; border-radius: 8px; border: 1px solid #D0D5DD; font-size: 24px; color: ${primaryColor}; margin: 10px 0; text-align: center">${code}</h1>
              <span style="display: block; color: ${primaryColor}; padding: 10px 0;">Sincerely yours,</span>
              <span style="display: block; color: ${primaryColor}; padding: 10px 0;">The Workiii Team</span>
            </div>
            <footer style="color: ${secondaryColor}; border-top: 1px solid #ddd; padding: 20px 0;">
            <table style="width: 100%; margin-bottom: 20px;">
            <tr>
              <td style="text-align: center;">
                <table style="margin: auto;">
                  <tr>
                    <td style="padding-right: 10px;">
                      <div style="background: ${secondaryColor}; border-radius: 8px; padding: 4.688px 3.125px 3.125px 4.688px;">
                        <img src="${logoSrc}" alt="Workiii Logo" style="width: 32px; height: 32px; border-radius: 50%; filter: brightness(0) invert(1);">
                      </div>
                    </td>
                    <td>
                      <h1 style="margin: 0; font-size: 24px; color: #fff;">Workiii</h1>
                    </td>
                  </tr>
                  
                </table>
                <p style="color: #fff; font-size: 12px; margin: 15px 0">Copyright &copy; ${new Date().getFullYear()} Workiii. All rights reserved.</p>
              <p><a href="https://workiii.com/privacy-policy" style="color: #fff; text-decoration: none; font-size: 12px;">Privacy Policy</a></p>
              </td>
            </tr>
          </table>
            </footer>
          </div>
        `;
};

module.exports = verificationEmail;
