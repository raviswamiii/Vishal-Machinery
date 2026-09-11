import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { VerificationPopup } from "./VerificationPopup";
import axios from "axios";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
  Phone,
  LogIn,
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";

export const Registration = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isWhatsappVerified, setIsWhatsappVerified] = useState(false);

  const [emailVerificationToken, setEmailVerificationToken] = useState("");
  const [whatsappVerificationToken, setWhatsappVerificationToken] =
    useState("");

  const [verificationType, setVerificationType] = useState<
    "email" | "whatsapp" | null
  >(null);

  const [verificationToken, setVerificationToken] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    // Changing email means previous verification is no longer valid
    setIsEmailVerified(false);

    setEmailVerificationToken("");

    setError("");
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, "");

    setNumber(value);

    // Changing number means previous verification is no longer valid
    setIsWhatsappVerified(false);

    setWhatsappVerificationToken("");

    setError("");
  };

  const handleVerifyEmail = async () => {
    setError("");
    if (!email.trim()) {
      setError("Please enter your email address first.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendURL}/api/users/send-email-otp`,
        { email: email.trim() },
      );
      if (response.data?.success) {
        setVerificationToken(response.data.verificationToken);
        setVerificationType("email");
      } else {
        setError(response.data?.message || "Failed to send email OTP.");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Unable to send verification code to email.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyWhatsapp = async () => {
    setError("");
    if (!number.trim()) {
      setError("Please enter your WhatsApp number first.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendURL}/api/users/send-whatsapp-otp`,
        { number: number.trim() },
      );
      if (response.data?.success) {
        setVerificationToken(response.data.verificationToken);
        setVerificationType("whatsapp");
      } else {
        setError(response.data?.message || "Failed to send WhatsApp OTP.");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Unable to send verification code to WhatsApp.",
      );
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!name || !number || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Check email verification
    if (!isEmailVerified && !isWhatsappVerified) {
      setError(
        "Please verify your email and WhatsApp number before continuing.",
      );
      return;
    }

    if (!isEmailVerified) {
      setError("Please verify your email address before continuing.");
      return;
    }

    // Check WhatsApp verification
    if (!isWhatsappVerified) {
      setError("Please verify your WhatsApp number before continuing.");
      return;
    }

    if (!emailVerificationToken || !whatsappVerificationToken) {
      setError("Verification is incomplete. Please verify again.");
      return;
    }

    setLoading(true);

    try {
      /*
        This registration API will be changed later
        when we implement the backend verification system.
      */

      const response = await axios.post(`${backendURL}/api/users/register`, {
        name: name.trim(),
        number: number.trim(),
        email: email.trim(),
        password,
        emailVerificationToken,
        whatsappVerificationToken,
      });

      if (response.data?.success) {
        navigate("/login");
      } else {
        setError(response.data?.message || "Registration failed.");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6 pt-10">
      <div className="absolute top-4 left-4">
        <Link
          to="/"
          className="text-[#ffc400] hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={20} />
        </Link>
      </div>
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-[#2c2c2c] bg-linear-to-br from-[#151515] to-[#101010] p-7 sm:p-10 shadow-2xl">
          {/* Heading */}

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[#ffc400]/10 flex items-center justify-center">
                <ShieldCheck size={27} className="text-[#ffc400]" />
              </div>
            </div>

            <h1 className="text-white text-3xl font-bold">
              Create your account
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Verify your email and WhatsApp number
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Name
              </label>

              <div className="h-10 flex items-center gap-3 px-4 rounded-md border border-[#3a3a3a] bg-[#0d0d0d] focus-within:border-[#ffc400] transition">
                <UserRound size={20} className="text-gray-400" />

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  className="w-full bg-transparent outline-none text-white text-sm placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                WhatsApp Number
              </label>

              <div className="flex gap-2">
                <div className="h-10 flex-1 flex items-center gap-3 px-4 rounded-md border border-[#3a3a3a] bg-[#0d0d0d] focus-within:border-[#ffc400] transition">
                  <Phone size={20} className="text-gray-400" />

                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="Enter your number"
                    value={number}
                    onChange={handleNumberChange}
                    className="w-full bg-transparent outline-none text-white text-sm placeholder:text-gray-600"
                  />
                </div>

                {isWhatsappVerified ? (
                  <div className="h-10 px-3 flex items-center gap-1 text-green-500 text-sm font-semibold">
                    <CheckCircle size={18} />
                    Verified
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleVerifyWhatsapp}
                    disabled={!number}
                    className="h-10 px-3 bg-[#ffc400] hover:bg-[#ffd333] disabled:opacity-40 disabled:cursor-not-allowed text-black text-sm font-semibold rounded-md transition"
                  >
                    Verify
                  </button>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Email
              </label>

              <div className="flex gap-2">
                <div className="h-10 flex-1 flex items-center gap-3 px-4 rounded-md border border-[#3a3a3a] bg-[#0d0d0d] focus-within:border-[#ffc400] transition">
                  <Mail size={20} className="text-gray-400" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full bg-transparent outline-none text-white text-sm placeholder:text-gray-600"
                  />
                </div>

                {isEmailVerified ? (
                  <div className="h-10 px-3 flex items-center gap-1 text-green-500 text-sm font-semibold">
                    <CheckCircle size={18} />
                    Verified
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    disabled={!email}
                    className="h-10 px-3 bg-[#ffc400] hover:bg-[#ffd333] disabled:opacity-40 disabled:cursor-not-allowed text-black text-sm font-semibold rounded-md transition"
                  >
                    Verify
                  </button>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Password
              </label>

              <div className="h-10 flex items-center gap-3 px-4 rounded-md border border-[#3a3a3a] bg-[#0d0d0d] focus-within:border-[#ffc400] transition">
                <LockKeyhole size={20} className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="w-full bg-transparent outline-none text-white text-sm placeholder:text-gray-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {/* Sign In */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-[#ffc400] hover:bg-[#ffd333] text-black font-bold rounded-md flex items-center justify-center gap-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn size={19} />

              {loading ? "Creating Account..." : "Create your account"}
            </button>
          </form>

          {/* Login */}
          <div className="text-center text-sm text-gray-500 mt-7">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#ffc400] hover:underline"
            >
              Login here
            </Link>
          </div>
        </div>

        {verificationType && (
          <VerificationPopup
            type={verificationType}
            value={verificationType === "email" ? email : number}
            verificationToken={verificationToken}
            onClose={() => {
              setVerificationType(null);
              setVerificationToken("");
            }}
            onVerified={(verifiedToken: string) => {
              if (verificationType === "email") {
                setIsEmailVerified(true);
                setEmailVerificationToken(verifiedToken);
              } else {
                setIsWhatsappVerified(true);
                setWhatsappVerificationToken(verifiedToken);
              }
              setVerificationType(null);
              setVerificationToken("");
            }}
            onResendToken={(newToken: string) => {
              setVerificationToken(newToken);
            }}
          />
        )}
      </div>
    </div>
  );
};
