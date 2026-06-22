import { RiMenu3Fill } from "react-icons/ri";
import logo from "../assets/Logo/logo.png";
import { PiUserCirclePlusLight } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "HOME", path: "/" },
  { name: "MACHINES", path: "/machines" },
  { name: "ABOUT US", path: "/aboutUs" },
  { name: "CONTACT", path: "/contact" },
];

export const Navbar = () => {
  return (
    <div className="h-15 bg-[#F6FAEF] flex justify-between items-center p-2 md:px-10">
        
      {/* Brand Logo */}
      <div className="flex items-center gap-2">
        <img
          className="h-10 w-auto rounded-full overflow-hidden"
          src={logo}
          alt="Vishal Machinery Logo"
        />
        <div>
          <h1 className="text-2xl tracking-widest bold-bebas-neue h-6">VISHAL</h1>
          <p className="text-[10px] tracking-[0.2em] bebas-neue">MACHINERY</p>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden montserrat text-sm font-bold md:flex justify-between w-[50%]">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex flex-col gap-2 items-center"
          >
            <p>{item.name}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-yellow-400 hidden" />
          </NavLink>
        ))}
      </div>

      {/* Sign Up Button and Mobile Menu */}
      <div className="flex items-center gap-4">

        {/* Sign Up Button */}
        <button className="flex bg-yellow-400 rounded-sm justify-center items-center gap-2 px-3 md:px-4 py-1 md:py-2 cursor-pointer">
          <PiUserCirclePlusLight className="text-lg md:text-xl" />
          <span className="text-xs font-bold montserrat">SIGN UP</span>
        </button>

        {/* Mobile Hamburger Menu Button */}
        <button className="md:hidden">
          <RiMenu3Fill className="text-xl" />
        </button>
      </div>
    </div>
  );
};
