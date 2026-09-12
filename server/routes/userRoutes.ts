import express from "express";
import {
  userRegistration,
  userLogin,
  sendEmailOTP,
  verifyEmailOTP,
  resendEmailOTP,
  sendWhatsAppOTP,
  verifyWhatsAppOTP,
  resendWhatsAppOTP,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userRegistration);
router.post("/login", userLogin);

router.post("/send-email-otp", sendEmailOTP);
router.post("/verify-email-otp", verifyEmailOTP);
router.post("/resend-email-otp", resendEmailOTP);

router.post("/send-whatsapp-otp", sendWhatsAppOTP);
router.post("/verify-whatsapp-otp", verifyWhatsAppOTP);
router.post("/resend-whatsapp-otp", resendWhatsAppOTP);

export default router;
