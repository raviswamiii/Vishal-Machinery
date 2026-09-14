import { X, Home, Cog, Info, Contact, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/userContext";

export const SideBar = () => {
  const { sideBar, setSideBar, showLogout, setShowLogout } = useUserContext();

  return (
    <>
      <div
        className={`bg-black montserrat text-white h-screen w-[50%] fixed right-0 top-0 z-20 ${sideBar ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}
      >
        <X
          onClick={() => setSideBar(false)}
          size={24}
          strokeWidth={2}
          className="absolute right-4 top-4"
        />

        <div className="flex flex-col gap-8 mt-20 ml-3 text-sm font-semibold">
          <NavLink
            onClick={() => setSideBar(false)}
            to="/"
            className="flex items-center gap-4"
          >
            <Home size={20} strokeWidth={2} className="inline-block ml-2" />
            <p>HOME</p>
          </NavLink>
          <NavLink
            onClick={() => setSideBar(false)}
            to="/machines"
            className="flex items-center gap-4"
          >
            <Cog size={20} strokeWidth={2} className="inline-block ml-2" />
            <p>MACHINES</p>
          </NavLink>
          <NavLink
            onClick={() => setSideBar(false)}
            to="/aboutUs"
            className="flex items-center gap-4"
          >
            <Info size={20} strokeWidth={2} className="inline-block ml-2" />
            <p>ABOUT US</p>
          </NavLink>
          <NavLink
            onClick={() => setSideBar(false)}
            to="/contact"
            className="flex items-center gap-4"
          >
            <Contact size={20} strokeWidth={2} className="inline-block ml-2" />
            <p>CONTACT</p>
          </NavLink>
          <div
            onClick={() => setShowLogout(true)}
            className="flex items-center gap-4"
          >
            <LogOut size={20} strokeWidth={2} className="inline-block ml-2" />
            <p>LOGOUT</p>
          </div>
        </div>
      </div>

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
    </>
  );
};
