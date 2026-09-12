import { useEffect, useState } from "react";
import { X, ShieldCheck } from "lucide-react";
import axios from "axios";

interface VerificationPopupProps {
  type: "email" | "whatsapp";
  value: string;
  name: string;
  verificationToken: string;
  onClose: () => void;
  onVerified: (verifiedToken: string) => void;
  onResendToken: (newToken: string) => void;
}

export const VerificationPopup = ({
  type,
  value,
  name,
  verificationToken,
  onClose,
  onVerified,
  onResendToken,
}: VerificationPopupProps) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const isEmail = type === "email";

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);

    setOtp(value);
    setError("");
  };

  const handleVerify = async () => {
    setError("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    if (!verificationToken) {
      setError("Verification session expired. Please request a new OTP.");
      return;
    }

    setLoading(true);

    try {
      let response;

      if (isEmail) {
        response = await axios.post(
          `${backendURL}/api/users/verify-email-otp`,
          {
            email: value.trim(),
            otp,
            verificationToken,
          },
        );
      } else {
        response = await axios.post(
          `${backendURL}/api/users/verify-whatsapp-otp`,
          {
            number: value.trim(),
            otp,
            verificationToken,
          },
        );
      }

      if (response.data?.success && response.data?.verifiedToken) {
        // Send the verified proof token back to Registration.tsx
        onVerified(response.data.verifiedToken);
      } else {
        setError(
          response.data?.message ||
            "Invalid verification code. Please try again.",
        );
      }
    } catch (error: any) {
      console.error("OTP verification error:", error);

      setError(
        error.response?.data?.message ||
          "Verification failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0 || loading) return;

    setError("");
    setOtp("");
    setLoading(true);

    try {
      let response;

      if (isEmail) {
        response = await axios.post(
          `${backendURL}/api/users/resend-email-otp`,
          {
            email: value.trim(),
            name,
            verificationToken,
          },
        );
      } else {
        response = await axios.post(
          `${backendURL}/api/users/resend-whatsapp-otp`,
          {
            number: value.trim(),
            verificationToken,
          },
        );
      }

      if (response.data?.success && response.data?.verificationToken) {
        // Replace the old OTP token with the new one
        onResendToken(response.data.verificationToken);

        // Start resend cooldown again
        setTimer(30);

        setError("");
      } else {
        setError(
          response.data?.message || "Unable to resend verification code.",
        );
      }
    } catch (error: any) {
      console.error("Resend OTP error:", error);

      setError(
        error.response?.data?.message || "Unable to resend verification code.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-sm rounded-2xl border border-[#2c2c2c] bg-[#111111] p-7 shadow-2xl">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-white transition"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full bg-[#ffc400]/10 flex items-center justify-center">
            <ShieldCheck size={30} className="text-[#ffc400]" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold">
            Verify {isEmail ? "Email" : "WhatsApp"}
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Enter the 6-digit verification code sent to
          </p>

          <p className="text-[#ffc400] text-sm font-semibold mt-1 break-all">
            {value}
          </p>
        </div>

        {/* OTP */}
        <div className="mt-7">
          <label className="block text-sm font-semibold text-white mb-2">
            Verification Code
          </label>

          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={handleOtpChange}
            className="w-full h-12 rounded-md border border-[#3a3a3a] bg-[#0d0d0d] px-4 text-center tracking-[0.5em] text-white text-lg font-semibold outline-none focus:border-[#ffc400] transition"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-3">{error}</p>
        )}

        {/* Verify */}
        <button
          type="button"
          onClick={handleVerify}
          disabled={loading || otp.length !== 6}
          className="w-full h-11 mt-5 bg-[#ffc400] hover:bg-[#ffd333] disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold rounded-md transition"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend */}
        <div className="text-center mt-5 text-sm">
          {timer > 0 ? (
            <p className="text-gray-500">
              Resend OTP in{" "}
              <span className="text-white font-semibold">{timer}s</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-[#ffc400] font-semibold hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
