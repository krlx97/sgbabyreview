const nodemailer = require("nodemailer");

const sendEmail = async (app, params) => {
  const {io} = app;
  const {name, email, subject, message} = params;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "dyingsquirrel97@gmail.com",
      pass: ""
    }
  });

  await transporter.sendMail({
    from: email,
    to: "dyingsquirrel97@gmail.com",
    subject,
    text: message
  });

  io.notification("Email sent successfully.");
};

module.exports = sendEmail;