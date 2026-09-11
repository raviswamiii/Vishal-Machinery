import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import { Request, Response } from "express";
import crypto from "crypto";
import transporter from "../config/email.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const createToken = (id: string, name: string) => {
  return jwt.sign({ id, name }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const userRegistration = async (req: Request, res: Response) => {
  try {
    const { name, number, email, password } = req.body;

    // -----------------------------
    // 1. Validate required fields
    // -----------------------------

    if (!name || !email || !number || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // -----------------------------
    // 2. Normalize email
    // -----------------------------

    const normalizedEmail = email.toLowerCase().trim();

    // -----------------------------
    // 3. Validate email
    // -----------------------------

    if (!validator.isEmail(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // -----------------------------
    // 4. Check existing email
    // -----------------------------

    const emailExists = await userModel.findOne({
      email: normalizedEmail,
    });

    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }

    // -----------------------------
    // 5. Check existing number
    // -----------------------------

    const numberExists = await userModel.findOne({
      number,
    });

    if (numberExists) {
      return res.status(409).json({
        success: false,
        message: "Phone number already registered.",
      });
    }

    // -----------------------------
    // 6. Validate password
    // -----------------------------

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters and contain one uppercase letter, one lowercase letter, and one number.",
      });
    }

    // -----------------------------
    // 7. Hash password
    // -----------------------------

    const hashedPassword = await bcrypt.hash(password, 12);

    // -----------------------------
    // 8. Generate OTP
    // -----------------------------

    const otp = crypto.randomInt(100000, 1000000).toString();

    // -----------------------------
    // 9. Hash OTP before storing
    // -----------------------------

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    // -----------------------------
    // 10. OTP expiry
    // -----------------------------

    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    // -----------------------------
    // 11. Create user
    // -----------------------------

    const newUser = new userModel({
      name: name.trim(),
      number: number.trim(),
      email: normalizedEmail,
      password: hashedPassword,

      isEmailVerified: false,

      emailVerificationOTP: hashedOTP,
      emailVerificationOTPExpires: otpExpires,

      emailVerificationAttempts: 0,

      emailVerificationLastSentAt: new Date(),

      emailVerificationResendCount: 0,

      emailVerificationResendWindowStart: new Date(),
    });

    const user = await newUser.save();

    // -----------------------------
    // 12. Send verification email
    // -----------------------------

    try {
      await sendVerificationEmail(user.email, user.name, otp);
    } catch (emailError) {
      console.error("Verification email error:", emailError);

      // Delete account if initial verification email
      // could not be sent.
      await userModel.findByIdAndDelete(user._id);

      return res.status(500).json({
        success: false,
        message: "Unable to send verification email. Please try again.",
      });
    }

    // -----------------------------
    // 13. Success
    // -----------------------------

    return res.status(201).json({
      success: true,
      message: "Registration successful. Verification OTP sent to your email.",
      email: user.email,
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    // -----------------------------
    // 1. Validate input
    // -----------------------------

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // OTP must be exactly 6 digits
    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "OTP must be a 6-digit number.",
      });
    }

    // -----------------------------
    // 2. Find user
    // -----------------------------

    const user = await userModel.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // -----------------------------
    // 3. Already verified?
    // -----------------------------

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified.",
      });
    }

    // -----------------------------
    // 4. Check attempts
    // -----------------------------

    if ((user.emailVerificationAttempts ?? 0) >= 5) {
      return res.status(429).json({
        success: false,
        message: "Too many incorrect attempts. Please request a new OTP.",
      });
    }

    // -----------------------------
    // 5. Check OTP exists
    // -----------------------------

    if (!user.emailVerificationOTP || !user.emailVerificationOTPExpires) {
      return res.status(400).json({
        success: false,
        message: "No active OTP. Please request a new verification code.",
      });
    }

    // -----------------------------
    // 6. Check expiry
    // -----------------------------

    if (user.emailVerificationOTPExpires.getTime() < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    // -----------------------------
    // 7. Hash entered OTP
    // -----------------------------

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    // -----------------------------
    // 8. Compare OTP
    // -----------------------------

    if (hashedOTP !== user.emailVerificationOTP) {
      user.emailVerificationAttempts =
        (user.emailVerificationAttempts ?? 0) + 1;

      await user.save();

      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // -----------------------------
    // 9. Verification successful
    // -----------------------------

    user.isEmailVerified = true;

    // Remove OTP information
    user.emailVerificationOTP = undefined;
    user.emailVerificationOTPExpires = undefined;
    user.emailVerificationAttempts = 0;

    await user.save();

    // -----------------------------
    // 10. Create JWT
    // -----------------------------

    const token = createToken(user._id.toString(), user.name);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        number: user.number,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    console.error("Email verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const resendVerificationOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // -----------------------------
    // 1. Validate email
    // -----------------------------

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // -----------------------------
    // 2. Find user
    // -----------------------------

    const user = await userModel.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // -----------------------------
    // 3. Already verified?
    // -----------------------------

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified.",
      });
    }

    // -----------------------------
    // 4. 60-second cooldown
    // -----------------------------

    if (user.emailVerificationLastSentAt) {
      const secondsSinceLastOTP =
        (Date.now() - user.emailVerificationLastSentAt.getTime()) / 1000;

      if (secondsSinceLastOTP < 60) {
        const remainingSeconds = Math.ceil(60 - secondsSinceLastOTP);

        return res.status(429).json({
          success: false,
          message: `Please wait ${remainingSeconds} seconds before requesting another OTP.`,
          retryAfter: remainingSeconds,
        });
      }
    }

    // -----------------------------
    // 5. Reset hourly resend window
    // -----------------------------

    const now = new Date();

    let resendCount = user.emailVerificationResendCount ?? 0;

    if (
      !user.emailVerificationResendWindowStart ||
      now.getTime() - user.emailVerificationResendWindowStart.getTime() >
        60 * 60 * 1000
    ) {
      resendCount = 0;
      user.emailVerificationResendWindowStart = now;
    }

    // -----------------------------
    // 6. Maximum 5 resends/hour
    // -----------------------------

    if (resendCount >= 5) {
      return res.status(429).json({
        success: false,
        message: "Too many OTP requests. Please try again later.",
      });
    }

    // -----------------------------
    // 7. Generate new OTP
    // -----------------------------

    const otp = crypto.randomInt(100000, 1000000).toString();

    // -----------------------------
    // 8. Hash OTP
    // -----------------------------

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    // -----------------------------
    // 9. New expiry
    // -----------------------------

    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    // -----------------------------
    // 10. Update user
    // -----------------------------

    user.emailVerificationOTP = hashedOTP;

    user.emailVerificationOTPExpires = otpExpires;

    user.emailVerificationAttempts = 0;

    user.emailVerificationLastSentAt = now;

    user.emailVerificationResendCount = resendCount + 1;

    await user.save();

    // -----------------------------
    // 11. Send new OTP
    // -----------------------------

    try {
      await sendVerificationEmail(user.email, user.name, otp);
    } catch (emailError) {
      console.error("Resend email error:", emailError);

      return res.status(500).json({
        success: false,
        message: "Unable to send OTP. Please try again later.",
      });
    }

    // -----------------------------
    // 12. Success
    // -----------------------------

    return res.status(200).json({
      success: true,
      message: "A new verification OTP has been sent.",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // 2. Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // 3. Validate email
    if (!validator.isEmail(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // 4. Find user
    const exists = await userModel.findOne({
      email: normalizedEmail,
    });

    // 5. Don't reveal whether email exists
    if (!exists) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // 6. Check password
    const isMatch = await bcrypt.compare(password, exists.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // 7. Check email verification
    if (!exists.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
        emailVerified: false,
        email: exists.email,
      });
    }

    // 8. Create JWT only after email verification
    const token = createToken(exists._id.toString(), exists.name);

    // 9. Return successful login
    return res.status(200).json({
      success: true,
      message: "Sign in successful.",
      token,
      user: {
        id: exists._id,
        name: exists.name,
        email: exists.email,
        number: exists.number,
        isEmailVerified: exists.isEmailVerified,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
