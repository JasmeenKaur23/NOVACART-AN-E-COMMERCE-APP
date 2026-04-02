// import {sendEmail } from "./emailService.js";


// const sendEmailFun=async (to, subject, text, html)=> {

//     const result = await sendEmail( to,
//       subject,
//       text,
//       html);
//     if(result.success){
//         return true;
//     }
//     else{
//         return false;
//     }
  
  
// }
// export default sendEmailFun
// config/sendEmail.js
import nodemailer from "nodemailer";

export default async function sendEmailFun({ sendTo, subject, text, html }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,       // ✅ match your .env
        pass: process.env.EMAIL_PASS,  // ✅ match your .env
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: sendTo,
      subject,
      text,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", result.response);
    return result;
  } catch (error) {
    console.error("❌ Email send failed:", error);
    throw error;
  }
}
