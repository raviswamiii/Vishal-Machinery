import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, MailCheck } from "lucide-react";
import { useUserContext } from "../context/userContext";

export const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken } = useUserContext();

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // Email received from Registration page
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 10-minute OTP countdown
  const [timeLeft, setTimeLeft] = useState(10 * 60);

  // 60-second resend cooldown
  const [resendTimeLeft, setResendTimeLeft] = useState(60);

  // -----------------------------
  // OTP expiry countdown
  // -----------------------------
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // -----------------------------
  // Resend countdown
  // -----------------------------
  useEffect(() => {
    if (resendTimeLeft <= 0) return;

    const timer = setInterval(() => {
      setResendTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimeLeft]);

  // -----------------------------
  // Format OTP expiry
  // -----------------------------
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // -----------------------------
  // Verify OTP
  // -----------------------------
  const onVerifyHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!email) {
      setError("Email information is missing. Please register again.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${backendURL}/api/users/verify-email`,
        {
          email,
          otp,
        },
      );

      if (response.data?.success) {
        const token = response.data.token;

        // Store JWT after successful verification
        localStorage.setItem("token", token);
        setToken(token);

        // User is now authenticated
        navigate("/");
      } else {
        setError(response.data?.message || "Email verification failed.");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Resend OTP
  // -----------------------------
  const resendOTP = async () => {
    setError("");

    if (!email) {
      setError("Email information is missing. Please register again.");
      return;
    }

    if (resendTimeLeft > 0) {
      return;
    }

    try {
      const response = await axios.post(
        `${backendURL}/api/users/resend-verification-otp`,
        {
          email,
        },
      );

      if (response.data?.success) {
        setOtp("");
        setTimeLeft(10 * 60);
        setResendTimeLeft(60);
      } else {
        setError(response.data?.message || "Unable to resend OTP.");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Unable to resend OTP.");
    }
  };

  // -----------------------------
  // Missing email
  // -----------------------------
  if (!email) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-red-500 mb-4">Email information is missing.</p>

          <Link to="/register" className="text-[#ffc400] hover:underline">
            Go back to registration
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6">
      {/* Back button */}
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-[#ffc400] hover:underline">
          <ArrowLeft size={20} />
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-[#2c2c2c] bg-linear-to-br from-[#151515] to-[#101010] p-7 sm:p-10 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-full bg-[#ffc400]/10 flex items-center justify-center">
              <MailCheck size={30} className="text-[#ffc400]" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl font-bold">Verify your email</h1>

            <p className="text-gray-500 text-sm mt-3">
              We've sent a 6-digit verification code to
            </p>

            <p className="text-white text-sm font-semibold mt-1 break-all">
              {email}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onVerifyHandler} className="space-y-5">
            {/* OTP */}
            <div>
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
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);

                  setOtp(value);
                  setError("");
                }}
                className="w-full h-12 rounded-md border border-[#3a3a3a] bg-[#0d0d0d] text-white text-center text-xl tracking-[0.5em] outline-none focus:border-[#ffc400] transition"
              />
            </div>

            {/* Expiry */}
            <div className="text-center">
              {timeLeft > 0 ? (
                <p className="text-gray-500 text-sm">
                  Code expires in{" "}
                  <span className="text-[#ffc400] font-semibold">
                    {formatTime(timeLeft)}
                  </span>
                </p>
              ) : (
                <p className="text-red-500 text-sm">This OTP has expired.</p>
              )}
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {/* Verify */}
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full h-10 bg-[#ffc400] hover:bg-[#ffd333] text-black font-bold rounded-md flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          {/* Resend */}
          <div className="text-center mt-7">
            {resendTimeLeft > 0 ? (
              <p className="text-sm text-gray-500">
                Didn't receive the code? Resend in{" "}
                <span className="text-white font-semibold">
                  {resendTimeLeft}s
                </span>
              </p>
            ) : (
              <button
                type="button"
                onClick={resendOTP}
                className="text-sm text-[#ffc400] font-semibold hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>

          {/* Login */}
          <div className="text-center text-sm text-gray-500 mt-5">
            Already verified?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#ffc400] hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
