import jwt, { JwtPayload } from "jsonwebtoken";
import userModel from "../models/userModel.js";
import blacklistTokenModel from "../models/blacklistToken.js";
import { Request, Response, NextFunction } from "express";

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Token not found." });

    const blackListed = await blacklistTokenModel.findOne({ token });

    if (blackListed)
      return res
        .status(403)
        .json({ success: false, message: "Invalid Token." });

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, jwtSecret) as CustomJwtPayload;

    const user = await userModel.findById(decoded.id).select("-userPassword");

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    req.user = user;

    next();
  } catch (error: any) {
    console.error("Auth error:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Token." });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired, please login again.",
      });
    }

    return res
      .status(500)
      .json({ success: false, message: "Authorization error." });
  }
};
