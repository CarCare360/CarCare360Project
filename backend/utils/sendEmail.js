const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true, // Enable debugging output
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      subject: options.subject,
      html: options.text,
    };

    if (options.to instanceof Array) {
      // Send to multiple recipients (mailing list or array of email addresses)
      mailOptions.to = options.to.join(", ");
    } else {
      // Send to a single recipient (individual email)
      mailOptions.to = options.to;
    }

    // Send Email
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
