import { X, Home, Cog, Info, Contact } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/userContext";

export const SideBar = () => {
  const { sideBar, setSideBar } = useUserContext();

  return (
    <div className={`bg-black montserrat text-white h-screen w-[50%] fixed right-0 top-0 z-20 ${sideBar ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}>
      <X onClick={() => setSideBar(false)} size={24} strokeWidth={2} className="absolute right-4 top-4" />

      <div className="flex flex-col gap-8 mt-20 ml-3 text-sm font-semibold">
        <NavLink onClick={() => setSideBar(false)} to="/" className="flex items-center gap-4">
          <Home size={20} strokeWidth={2} className="inline-block ml-2" />
          <p>HOME</p>
        </NavLink>

        <NavLink onClick={() => setSideBar(false)} to="/machines" className="flex items-center gap-4">
          <Cog size={20} strokeWidth={2} className="inline-block ml-2" />
          <p>MACHINES</p>
        </NavLink>

        <NavLink onClick={() => setSideBar(false)} to="/aboutUs" className="flex items-center gap-4">
          <Info size={20} strokeWidth={2} className="inline-block ml-2" />
          <p>ABOUT US</p>
        </NavLink>

        <NavLink onClick={() => setSideBar(false)} to="/contact" className="flex items-center gap-4">
          <Contact size={20} strokeWidth={2} className="inline-block ml-2" />
          <p>CONTACT</p>
        </NavLink>{" "}
      </div>
    </div>
  );
};
