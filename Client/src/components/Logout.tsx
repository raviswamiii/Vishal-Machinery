import { X } from "lucide-react";
import { useUserContext } from "../context/userContext";

export const Logout = () => {
  const { showLogout, setShowLogout, setSideBar } = useUserContext();
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
                onClick={() => {
                  setShowLogout(false);
                  setSideBar(false);
                }}
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
