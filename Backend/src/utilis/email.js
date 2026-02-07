import nodemailer from "nodemailer";

const userEmail = "rohanmache15317thala@gmail.com"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userEmail,
    pass: "qccvfdnqtrsqzauj",
  },
});

export async function sendEmail({ to, subject, text }) {
  if (!to) throw new Error("No recipient provided");

  const mailOptions = {
    from: `"KrishiVaani" <${userEmail}>`,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
    return info;
  } catch (err) {
    console.error("❌ Error sending email:", err);
    throw err;
  }
}