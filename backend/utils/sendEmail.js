const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    debug: true, // Enable debugging output
  });
  
console.log(options.text)
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  // Send Email
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      console.log("Error Occurs");
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;