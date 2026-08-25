import logo from "../assets/logo.png";
import { PiUserCirclePlusLight } from "react-icons/pi";
import { Plus } from "lucide-react";
import { AddItem } from "../components/AddItem";

export const Dashboard = () => {
  return (
    <div className="p-2 md:px-10 h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-300 pb-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <img
            className="h-10 w-auto rounded-full overflow-hidden"
            src={logo}
            alt="Vishal Machinery Logo"
          />

          <div>
            <h1 className="text-2xl tracking-widest bold-bebas-neue h-6">
              VISHAL
            </h1>

            <p className="text-[10px] tracking-[0.2em] bebas-neue">MACHINERY</p>
          </div>
        </div>

        <div className="flex bg-yellow-400 rounded-sm justify-center items-center gap-2 px-3 md:px-4 py-1 md:py-2 cursor-pointer">
          <PiUserCirclePlusLight className="text-lg md:text-xl" />

          <span className="text-xs font-bold montserrat">LOG OUT</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="border-r border-gray-300 py-4 h-full w-fit shrink-0 montserrat">
          <div className="py-2 px-4 text-md font-semibold border border-r-0 border-gray-300 rounded-l-md flex items-center gap-3">
            <Plus size={20} className="border rounded-full p-0.5" />

            <p className="hidden sm:block">Add Items</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 min-w-0 min-h-0 overflow-y-auto bg-gray-50">
          <AddItem />
        </div>
      </div>
    </div>
  );
};
