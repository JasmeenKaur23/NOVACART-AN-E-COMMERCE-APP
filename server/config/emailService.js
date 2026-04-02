import nodemailer from "nodemailer";
import http from "http";

// Create reusable transporter object
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use true for 465
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// Async function to send email
 async function sendEmail(to, subject, text, html) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent successfully:", info.messageId);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
export { sendEmail};