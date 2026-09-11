import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    number: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationOTP: {
      type: String,
    },

    emailVerificationOTPExpires: {
      type: Date,
    },

    emailVerificationAttempts: {
      type: Number,
      default: 0,
    },

    emailVerificationLastSentAt: {
      type: Date,
    },

    emailVerificationResendCount: {
      type: Number,
      default: 0,
    },

    emailVerificationResendWindowStart: {
      type: Date,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
