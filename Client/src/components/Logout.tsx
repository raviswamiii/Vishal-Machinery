import { X } from "lucide-react";
import { useUserContext } from "../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const { showLogout, setShowLogout, setSideBar, setToken } = useUserContext();
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        `${backendURL}/api/users/logout`,
        null,
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      if (response.data.success) {
        localStorage.removeItem("token");
        setToken(null);
        setShowLogout(false);
        setSideBar(false);
        navigate("/login");
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error: any) {
      console.error(
        "Logout failed:",
        error.response?.data?.message || error.message,
      );
    }
  };
  return (
    <div>
      {showLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 text-black shadow-2xl">
            {/* Popup Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold"> Logout </h2>
              <X
                size={20}
                className="cursor-pointer text-gray-500 hover:text-black"
                onClick={() => setShowLogout(false)}
              />
            </div>
            {/* Popup Message */}
            <p className="mt-3 text-sm text-gray-600">
              Are you sure you want to logout?
            </p>
            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={logoutHandler}
                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
