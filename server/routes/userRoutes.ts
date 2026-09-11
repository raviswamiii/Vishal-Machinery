import express from "express";
import {
  userRegistration,
  userLogin,
  verifyEmail,
  resendVerificationOTP,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userRegistration);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification-otp", resendVerificationOTP);
router.post("/login", userLogin);

export default router;
