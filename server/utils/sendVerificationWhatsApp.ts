export const sendVerificationWhatsApp = async (
  phoneNumber: string,
  otp: string,
) => {
  console.log("=================================");
  console.log("WHATSAPP OTP");
  console.log(`Number: ${phoneNumber}`);
  console.log(`OTP: ${otp}`);
  console.log("=================================");
};


// import axios from "axios";

// export const sendVerificationWhatsApp = async (
//   phoneNumber: string,
//   otp: string,
// ) => {
//   const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
//   const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

//   if (!accessToken || !phoneNumberId) {
//     throw new Error(
//       "WhatsApp API credentials are not configured.",
//     );
//   }

//   const url = `https://graph.facebook.com/v23.0/${phoneNumberId}/messages`;

//   await axios.post(
//     url,
//     {
//       messaging_product: "whatsapp",
//       to: phoneNumber,
//       type: "template",
//       template: {
//         name: "verification_code",
//         language: {
//           code: "en_US",
//         },
//         components: [
//           {
//             type: "body",
//             parameters: [
//               {
//                 type: "text",
//                 text: otp,
//               },
//             ],
//           },
//         ],
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     },
//   );
// };