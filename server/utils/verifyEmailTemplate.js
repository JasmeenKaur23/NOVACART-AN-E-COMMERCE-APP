// verifyEmailTemplate.js

export default function VerificationEmail(name, verifyCode) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:20px; color:#333;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:white; border-radius:10px; overflow:hidden; box-shadow:0 0 8px rgba(0,0,0,0.1);">
      <tr>
        <td style="background:#007bff; color:white; text-align:center; padding:15px 0;">
          <h2 style="margin:0;">E-Commerce App</h2>
        </td>
      </tr>
      <tr>
        <td style="padding:30px;">
          <h3 style="margin-bottom:10px;">Hello ${name},</h3>
          <p>Thank you for registering with <b>E-Commerce App</b>.</p>
          <p>Please verify your email using the code below:</p>
          <div style="text-align:center; margin:30px 0;">
            <h1 style="display:inline-block; background:#f0f0f0; padding:15px 25px; border-radius:8px; color:#007bff; letter-spacing:4px;">
              ${verifyCode}
            </h1>
          </div>
          <p>This code is valid for the next <b>10 minutes</b>. If you didn’t request this, you can safely ignore this email.</p>
          <br/>
          <p style="font-size:14px; color:#555;">Best regards,<br/>The E-Commerce Team</p>
        </td>
      </tr>
      <tr>
        <td style="background:#f2f2f2; text-align:center; padding:10px; font-size:12px; color:#777;">
          © ${new Date().getFullYear()} E-Commerce App. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
