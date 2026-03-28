const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "anandtalpada268@gmail.com",
        pass: "uqtm ycon mxla tich",
      },
    });

    // 🔥 check connection
    await transporter.verify();
    console.log("SMTP Server Ready ✅");

    const info = await transporter.sendMail({
      from: `"eGarage" <anandtalpada268@gmail.com>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.response);

  } catch (error) {
    console.log("Email error ❌:", error);
  }
};

module.exports = sendEmail;