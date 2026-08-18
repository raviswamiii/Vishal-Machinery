import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
} from "lucide-react";
import { useUserContext } from "../context/userContext";

export const Registration = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { setToken } = useUserContext();

  const onSubmitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!name || !number || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${backendURL}/api/users/register`, {
        name,
        number,
        email,
        password,
      });

      if (response.data?.success) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        navigate("/");
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
            <h1 className="text-white text-3xl font-bold">
              Create your account
            </h1>
          </div>

          {/* Form */}

          <form onSubmit={onSubmitHandler} className="space-y-5">
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

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                What's App Number
              </label>

              <div className="h-10 flex items-center gap-3 px-4 rounded-md border border-[#3a3a3a] bg-[#0d0d0d] focus-within:border-[#ffc400] transition">
                <Phone size={20} className="text-gray-400" />

                <input
                  type="tel"
                  placeholder="Enter your number"
                  value={number}
                  onChange={(e) => {
                    setNumber(e.target.value);
                    setError("");
                  }}
                  className="w-full bg-transparent outline-none text-white text-sm placeholder:text-gray-600"
                />
              </div>
            </div>
            {/* Email */}

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Email
              </label>

              <div className="h-10 flex items-center gap-3 px-4 rounded-md border border-[#3a3a3a] bg-[#0d0d0d] focus-within:border-[#ffc400] transition">
                <Mail size={20} className="text-gray-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="w-full bg-transparent outline-none text-white text-sm placeholder:text-gray-600"
                />
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
      </div>
    </div>
  );
};
