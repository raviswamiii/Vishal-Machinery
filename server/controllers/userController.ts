import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel";
import { Request, Response } from "express";

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

    if (!name || !email || !number || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const emailExists = await userModel.findOne({ email });

    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }

    const numberExists = await userModel.findOne({ number });

    if (numberExists) {
      return res.status(409).json({
        success: false,
        message: "Phone number already registered.",
      });
    }

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      number,
    });

    const user = await newUser.save();

    const token = createToken(user._id.toString(), user.name);

    return res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
