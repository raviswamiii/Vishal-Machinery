import transporter from "../config/email.js";

// export const sendVerificationEmail = async (
//   email: string,
//   name: string,
//   otp: string,
// ) => {
//   await transporter.sendMail({
//     from: `"Vishal Machinery" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "Verify your email address",
//     html: `
//       <div
//         style="
//           font-family: Arial, sans-serif;
//           max-width: 500px;
//           margin: auto;
//           padding: 30px;
//         "
//       >
//         <h2>Email Verification</h2>

//         <p>Hello ${name},</p>

//         <p>
//           Thank you for creating your account.
//           Use the verification code below to verify your email address.
//         </p>

//         <div
//           style="
//             font-size: 32px;
//             font-weight: bold;
//             letter-spacing: 8px;
//             margin: 30px 0;
//           "
//         >
//           ${otp}
//         </div>

//         <p>
//           This code will expire in <strong>10 minutes</strong>.
//         </p>

//         <p>
//           If you did not create this account, you can safely ignore this email.
//         </p>

//         <p>Thank you,<br />Vishal Machinery</p>
//       </div>
//     `,
//   });
// };

export const sendVerificationEmail = async (
  email: string,
  name: string,
  otp: string,
) => {
  try {
    console.log("📧 Sending email to:", email);
    console.log("📧 EMAIL_USER exists:", !!process.env.EMAIL_USER);
    console.log("📧 EMAIL_PASSWORD exists:", !!process.env.EMAIL_PASSWORD);

    const result = await transporter.sendMail({
      from: `"Vishal Machinery" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your email address",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 30px;">
          <h2>Email Verification</h2>
          <p>Hello ${name},</p>
          <p>Thank you for creating your account.</p>
          <p>Use the verification code below to verify your email address.</p>

          <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 30px 0;">
            ${otp}
          </div>

          <p>This code will expire in <strong>10 minutes</strong>.</p>

          <p>If you did not create this account, you can safely ignore this email.</p>

          <p>Thank you,<br />Vishal Machinery</p>
        </div>
      `,
    });

    console.log("✅ EMAIL SENT:", result.messageId);

    return result;
  } catch (error) {
    console.error("❌ SEND MAIL ERROR:", error);
    throw error;
  }
};