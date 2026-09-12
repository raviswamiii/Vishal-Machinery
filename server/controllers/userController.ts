import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import { Request, Response } from "express";
import crypto from "crypto";
import transporter from "../config/email.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
import { sendVerificationWhatsApp } from "../utils/sendVerificationWhatsApp.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const createToken = (id: string, name: string) => {
  return jwt.sign({ id, name }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const sendEmailOTP = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    // -----------------------------
    // 1. Validate required fields
    // -----------------------------

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required.",
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
    // 4. Check if email already
    //    belongs to a registered user
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
    // 5. Generate 6-digit OTP
    // -----------------------------

    const otp = crypto.randomInt(100000, 1000000).toString();

    // -----------------------------
    // 6. Hash OTP
    // -----------------------------

    const otpHash = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(otp)
      .digest("hex");

    // -----------------------------
    // 7. Create temporary
    //    verification token
    // -----------------------------

    const verificationToken = jwt.sign(
      {
        purpose: "email_otp",
        target: normalizedEmail,
        otpHash,
      },
      JWT_SECRET,
      {
        expiresIn: "10m",
      },
    );

    // -----------------------------
    // 8. Send OTP email
    // -----------------------------

    try {
      await sendVerificationEmail(
        normalizedEmail,
        name.trim(),
        otp,
      );
    } catch (emailError) {
      console.error(
        "Email OTP sending error:",
        emailError,
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to send verification email. Please try again.",
      });
    }

    // -----------------------------
    // 9. Return temporary token
    // -----------------------------

    return res.status(200).json({
      success: true,
      message: "Verification OTP sent to your email.",
      verificationToken,
    });
  } catch (error) {
    console.error("Send email OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const verifyEmailOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp, verificationToken } = req.body;

    // -----------------------------
    // 1. Validate required fields
    // -----------------------------

    if (!email || !otp || !verificationToken) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, and verification token are required.",
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
    // 4. Validate OTP
    // -----------------------------

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "OTP must be a 6-digit number.",
      });
    }

    // -----------------------------
    // 5. Verify temporary OTP token
    // -----------------------------

    let otpPayload: jwt.JwtPayload;

    try {
      const decoded = jwt.verify(
        verificationToken,
        JWT_SECRET,
      );

      if (typeof decoded === "string") {
        return res.status(400).json({
          success: false,
          message: "Invalid verification token.",
        });
      }

      otpPayload = decoded;
    } catch {
      return res.status(400).json({
        success: false,
        message:
          "Verification session has expired. Please request a new OTP.",
      });
    }

    // -----------------------------
    // 6. Check token purpose
    // -----------------------------

    if (otpPayload.purpose !== "email_otp") {
      return res.status(400).json({
        success: false,
        message: "Invalid email verification token.",
      });
    }

    // -----------------------------
    // 7. Check email matches token
    // -----------------------------

    if (otpPayload.target !== normalizedEmail) {
      return res.status(400).json({
        success: false,
        message:
          "This verification code does not belong to this email.",
      });
    }

    // -----------------------------
    // 8. Check OTP hash exists
    // -----------------------------

    if (
      typeof otpPayload.otpHash !== "string" ||
      !otpPayload.otpHash
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification session.",
      });
    }

    // -----------------------------
    // 9. Hash entered OTP
    // -----------------------------

    const enteredOTPHash = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(otp)
      .digest("hex");

    // -----------------------------
    // 10. Compare OTP
    // -----------------------------

    const isOTPValid = crypto.timingSafeEqual(
      Buffer.from(enteredOTPHash, "hex"),
      Buffer.from(otpPayload.otpHash, "hex"),
    );

    if (!isOTPValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // -----------------------------
    // 11. Create verified proof token
    // -----------------------------

    const verifiedToken = jwt.sign(
      {
        purpose: "email_verified",
        target: normalizedEmail,
      },
      JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    // -----------------------------
    // 12. Success
    // -----------------------------

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      verifiedToken,
    });
  } catch (error) {
    console.error("Email OTP verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const resendEmailOTP = async (req: Request, res: Response) => {
  try {
    const { email, name, verificationToken } = req.body;

    // -----------------------------
    // 1. Validate required fields
    // -----------------------------

    if (!email || !name || !verificationToken) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, and verification token are required.",
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
    // 4. Verify old verification token
    // -----------------------------

    let oldTokenPayload: jwt.JwtPayload;

    try {
      const decoded = jwt.verify(
        verificationToken,
        JWT_SECRET,
      );

      if (typeof decoded === "string") {
        return res.status(400).json({
          success: false,
          message: "Invalid verification token.",
        });
      }

      oldTokenPayload = decoded;
    } catch {
      return res.status(400).json({
        success: false,
        message:
          "Verification session has expired. Please request verification again.",
      });
    }

    // -----------------------------
    // 5. Check token purpose
    // -----------------------------

    if (oldTokenPayload.purpose !== "email_otp") {
      return res.status(400).json({
        success: false,
        message: "Invalid email verification session.",
      });
    }

    // -----------------------------
    // 6. Make sure email matches
    // -----------------------------

    if (oldTokenPayload.target !== normalizedEmail) {
      return res.status(400).json({
        success: false,
        message:
          "This verification session does not belong to this email.",
      });
    }

    // -----------------------------
    // 7. Check whether email
    //    is already registered
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
    // 8. Generate new OTP
    // -----------------------------

    const otp = crypto
      .randomInt(100000, 1000000)
      .toString();

    // -----------------------------
    // 9. Hash new OTP
    // -----------------------------

    const otpHash = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(otp)
      .digest("hex");

    // -----------------------------
    // 10. Create new verification token
    // -----------------------------

    const newVerificationToken = jwt.sign(
      {
        purpose: "email_otp",
        target: normalizedEmail,
        otpHash,
      },
      JWT_SECRET,
      {
        expiresIn: "10m",
      },
    );

    // -----------------------------
    // 11. Send new OTP
    // -----------------------------

    try {
      await sendVerificationEmail(
        normalizedEmail,
        name.trim(),
        otp,
      );
    } catch (emailError) {
      console.error(
        "Resend email OTP error:",
        emailError,
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to send verification email. Please try again.",
      });
    }

    // -----------------------------
    // 12. Return new token
    // -----------------------------

    return res.status(200).json({
      success: true,
      message: "A new verification OTP has been sent.",
      verificationToken: newVerificationToken,
    });
  } catch (error) {
    console.error("Resend email OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const sendWhatsAppOTP = async (
  req: Request,
  res: Response,
) => {
  try {
    const { number } = req.body;

    // -----------------------------
    // 1. Validate required field
    // -----------------------------

    if (!number) {
      return res.status(400).json({
        success: false,
        message: "WhatsApp number is required.",
      });
    }

    // -----------------------------
    // 2. Normalize number
    // -----------------------------

    const normalizedNumber = number.trim();

    // -----------------------------
    // 3. Validate Indian 10-digit number
    // -----------------------------

    if (!/^\d{10}$/.test(normalizedNumber)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit WhatsApp number.",
      });
    }

    // -----------------------------
    // 4. Check if number already
    //    belongs to a registered user
    // -----------------------------

    const numberExists = await userModel.findOne({
      number: normalizedNumber,
    });

    if (numberExists) {
      return res.status(409).json({
        success: false,
        message: "WhatsApp number already registered.",
      });
    }

    // -----------------------------
    // 5. Generate 6-digit OTP
    // -----------------------------

    const otp = crypto
      .randomInt(100000, 1000000)
      .toString();

    // -----------------------------
    // 6. Hash OTP
    // -----------------------------

    const otpHash = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(otp)
      .digest("hex");

    // -----------------------------
    // 7. Create temporary
    //    verification token
    // -----------------------------

    const verificationToken = jwt.sign(
      {
        purpose: "whatsapp_otp",
        target: normalizedNumber,
        otpHash,
      },
      JWT_SECRET,
      {
        expiresIn: "10m",
      },
    );

    // -----------------------------
    // 8. Convert to WhatsApp format
    // -----------------------------

    const whatsappNumber = `+91${normalizedNumber}`;

    // -----------------------------
    // 9. Send WhatsApp OTP
    // -----------------------------

    try {
      await sendVerificationWhatsApp(
        whatsappNumber,
        otp,
      );
    } catch (whatsappError) {
      console.error(
        "WhatsApp OTP sending error:",
        whatsappError,
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to send WhatsApp verification code. Please try again.",
      });
    }

    // -----------------------------
    // 10. Return temporary token
    // -----------------------------

    return res.status(200).json({
      success: true,
      message: "Verification OTP sent to WhatsApp.",
      verificationToken,
    });
  } catch (error) {
    console.error(
      "Send WhatsApp OTP error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const verifyWhatsAppOTP = async (
  req: Request,
  res: Response,
) => {
  try {
    const { number, otp, verificationToken } = req.body;

    // -----------------------------
    // 1. Validate required fields
    // -----------------------------

    if (!number || !otp || !verificationToken) {
      return res.status(400).json({
        success: false,
        message:
          "WhatsApp number, OTP, and verification token are required.",
      });
    }

    // -----------------------------
    // 2. Normalize number
    // -----------------------------

    const normalizedNumber = number.trim();

    // -----------------------------
    // 3. Validate number
    // -----------------------------

    if (!/^\d{10}$/.test(normalizedNumber)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit WhatsApp number.",
      });
    }

    // -----------------------------
    // 4. Validate OTP
    // -----------------------------

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "OTP must be a 6-digit number.",
      });
    }

    // -----------------------------
    // 5. Verify temporary token
    // -----------------------------

    let otpPayload: jwt.JwtPayload;

    try {
      const decoded = jwt.verify(
        verificationToken,
        JWT_SECRET,
      );

      if (typeof decoded === "string") {
        return res.status(400).json({
          success: false,
          message: "Invalid verification token.",
        });
      }

      otpPayload = decoded;
    } catch {
      return res.status(400).json({
        success: false,
        message:
          "Verification session has expired. Please request a new OTP.",
      });
    }

    // -----------------------------
    // 6. Check token purpose
    // -----------------------------

    if (otpPayload.purpose !== "whatsapp_otp") {
      return res.status(400).json({
        success: false,
        message: "Invalid WhatsApp verification session.",
      });
    }

    // -----------------------------
    // 7. Check number matches token
    // -----------------------------

    if (otpPayload.target !== normalizedNumber) {
      return res.status(400).json({
        success: false,
        message:
          "This verification code does not belong to this WhatsApp number.",
      });
    }

    // -----------------------------
    // 8. Check OTP hash exists
    // -----------------------------

    if (
      typeof otpPayload.otpHash !== "string" ||
      !otpPayload.otpHash
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification session.",
      });
    }

    // -----------------------------
    // 9. Hash entered OTP
    // -----------------------------

    const enteredOTPHash = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(otp)
      .digest("hex");

    // -----------------------------
    // 10. Compare OTP
    // -----------------------------

    const isOTPValid = crypto.timingSafeEqual(
      Buffer.from(enteredOTPHash, "hex"),
      Buffer.from(otpPayload.otpHash, "hex"),
    );

    if (!isOTPValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // -----------------------------
    // 11. Create verified proof token
    // -----------------------------

    const verifiedToken = jwt.sign(
      {
        purpose: "whatsapp_verified",
        target: normalizedNumber,
      },
      JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    // -----------------------------
    // 12. Success
    // -----------------------------

    return res.status(200).json({
      success: true,
      message: "WhatsApp number verified successfully.",
      verifiedToken,
    });
  } catch (error) {
    console.error(
      "WhatsApp OTP verification error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const resendWhatsAppOTP = async (
  req: Request,
  res: Response,
) => {
  try {
    const { number, verificationToken } = req.body;

    if (!number || !verificationToken) {
      return res.status(400).json({
        success: false,
        message:
          "WhatsApp number and verification token are required.",
      });
    }

    const normalizedNumber = number.trim();

    // Validate WhatsApp number
    if (!/^\d{10}$/.test(normalizedNumber)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid 10-digit WhatsApp number.",
      });
    }

    // Verify the old OTP session token
    let oldTokenPayload: jwt.JwtPayload;

    try {
      const decoded = jwt.verify(
        verificationToken,
        JWT_SECRET,
      );

      if (typeof decoded === "string") {
        return res.status(400).json({
          success: false,
          message: "Invalid verification token.",
        });
      }

      oldTokenPayload = decoded;
    } catch {
      return res.status(400).json({
        success: false,
        message:
          "Verification session has expired. Please request verification again.",
      });
    }

    // Make sure this token is specifically for WhatsApp OTP
    if (oldTokenPayload.purpose !== "whatsapp_otp") {
      return res.status(400).json({
        success: false,
        message:
          "Invalid WhatsApp verification session.",
      });
    }

    // Make sure token belongs to this number
    if (oldTokenPayload.target !== normalizedNumber) {
      return res.status(400).json({
        success: false,
        message:
          "This verification session does not belong to this WhatsApp number.",
      });
    }

    // Check whether number is already registered
    const numberExists = await userModel.findOne({
      number: normalizedNumber,
    });

    if (numberExists) {
      return res.status(409).json({
        success: false,
        message:
          "WhatsApp number already registered.",
      });
    }

    // Generate a new 6-digit OTP
    const otp = crypto
      .randomInt(100000, 1000000)
      .toString();

    // Hash OTP using HMAC
    const otpHash = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(otp)
      .digest("hex");

    // Create a new verification session
    const newVerificationToken = jwt.sign(
      {
        purpose: "whatsapp_otp",
        target: normalizedNumber,
        otpHash,
      },
      JWT_SECRET,
      {
        expiresIn: "10m",
      },
    );

    // Send new OTP through WhatsApp
    try {
      await sendVerificationWhatsApp(
        `+91${normalizedNumber}`,
        otp,
      );
    } catch (whatsappError) {
      console.error(
        "Resend WhatsApp OTP error:",
        whatsappError,
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to send WhatsApp verification code. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "A new WhatsApp verification OTP has been sent.",
      verificationToken: newVerificationToken,
    });
  } catch (error) {
    console.error(
      "Resend WhatsApp OTP error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const userRegistration = async (req: Request, res: Response) => {
  try {
    const {
      name,
      number,
      email,
      password,
      emailVerificationToken,
      whatsappVerificationToken,
    } = req.body;

    // -----------------------------
    // 1. Validate required fields
    // -----------------------------

    if (
      !name ||
      !number ||
      !email ||
      !password ||
      !emailVerificationToken ||
      !whatsappVerificationToken
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, WhatsApp number, email, password, and both verification tokens are required.",
      });
    }

    // -----------------------------
    // 2. Normalize values
    // -----------------------------

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedNumber = number.trim();

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
    // 4. Validate WhatsApp number
    // -----------------------------

    if (!/^\d{10}$/.test(normalizedNumber)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit WhatsApp number.",
      });
    }

    // -----------------------------
    // 5. Validate password
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
    // 6. Verify email verification proof
    // -----------------------------

    let emailVerificationPayload: any;

    try {
      emailVerificationPayload = jwt.verify(
        emailVerificationToken,
        process.env.JWT_SECRET as string,
      );
    } catch {
      return res.status(400).json({
        success: false,
        message:
          "Email verification has expired or is invalid. Please verify your email again.",
      });
    }

    if (
      emailVerificationPayload.purpose !== "email_verified" ||
      emailVerificationPayload.target !== normalizedEmail
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid email verification.",
      });
    }

    // -----------------------------
    // 7. Verify WhatsApp verification proof
    // -----------------------------

    let whatsappVerificationPayload: any;

    try {
      whatsappVerificationPayload = jwt.verify(
        whatsappVerificationToken,
        process.env.JWT_SECRET as string,
      );
    } catch {
      return res.status(400).json({
        success: false,
        message:
          "WhatsApp verification has expired or is invalid. Please verify your WhatsApp number again.",
      });
    }

    if (
      whatsappVerificationPayload.purpose !== "whatsapp_verified" ||
      whatsappVerificationPayload.target !== normalizedNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid WhatsApp verification.",
      });
    }

    // -----------------------------
    // 8. Check existing email
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
    // 9. Check existing WhatsApp number
    // -----------------------------

    const numberExists = await userModel.findOne({
      number: normalizedNumber,
    });

    if (numberExists) {
      return res.status(409).json({
        success: false,
        message: "WhatsApp number already registered.",
      });
    }

    // -----------------------------
    // 10. Hash password
    // -----------------------------

    const hashedPassword = await bcrypt.hash(password, 12);

    // -----------------------------
    // 11. Create permanent user
    // -----------------------------

    const newUser = new userModel({
      name: name.trim(),
      number: normalizedNumber,
      email: normalizedEmail,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // -----------------------------
    // 12. Create login token
    // -----------------------------

    const token = createToken(
      user._id.toString(),
      user.name,
    );

    // -----------------------------
    // 13. Success
    // -----------------------------

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        number: user.number,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // -----------------------------
    // 1. Check required fields
    // -----------------------------

    if (!email || !password) {
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
    // 4. Find user
    // -----------------------------

    const exists = await userModel.findOne({
      email: normalizedEmail,
    });

    // -----------------------------
    // 5. Don't reveal whether
    //    email exists
    // -----------------------------

    if (!exists) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // -----------------------------
    // 6. Check password
    // -----------------------------

    const isMatch = await bcrypt.compare(
      password,
      exists.password,
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // -----------------------------
    // 7. Create JWT
    // -----------------------------

    const token = createToken(
      exists._id.toString(),
      exists.name,
    );

    // -----------------------------
    // 8. Return successful login
    // -----------------------------

    return res.status(200).json({
      success: true,
      message: "Sign in successful.",
      token,
      user: {
        id: exists._id,
        name: exists.name,
        email: exists.email,
        number: exists.number,
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
