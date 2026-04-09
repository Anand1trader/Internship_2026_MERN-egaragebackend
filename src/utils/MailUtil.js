const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,   // ✅ correct
        pass: process.env.EMAIL_PASS,   // ✅ correct
      },
    });

    // 🔥 Check connection
    await transporter.verify();
    console.log("✅ SMTP Ready");

    const info = await transporter.sendMail({
      from: `"eGarage" <${process.env.EMAIL_USER}>`, // ✅ FIXED
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.response);

  } catch (error) {
    console.log("❌ Email error:", error.message);
    throw error;
  }
};

module.exports = sendEmail;