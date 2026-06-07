import packagingMachine from "../assets/heroImage/PackagingMachin.png";
import { CiSettings } from "react-icons/ci";
import { MdOutlineSecurity } from "react-icons/md";
import { GrSuse } from "react-icons/gr";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { RiCameraLensFill } from "react-icons/ri";

export const Home = () => {
  return (
    <div className="h-screen flex-1 overflow-hidden bg-black relative">
      <img
        className="absolute -right-25"
        src={packagingMachine}
        alt="Packaging Machine"
      />

      <div className="flex flex-col gap-4 px-4 w-[60%] text-white absolute top-20">
        <div className="flex flex-col gap-2">
          <p className="font-semibold bg-linear-to-r from-yellow-300 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
            BUILD FOR PRECISION.
          </p>

          <h1 className="text-5xl font-semibold bebas-neue">
            BUILD FOR <br />{" "}
            <span className="text-yellow-400">PERFORMANCE.</span>
          </h1>
        </div>

        <p className="text-sm text-gray-300">
          High performance packaging machines designed for reliability, speed
          and unmatched efficiency.
        </p>

        <div className="flex flex-col gap-4">
          <button className="bg-yellow-400 text-black text-xs font-extrabold rounded-sm flex justify-center items-center gap-2 py-4">
            <RiCameraLensFill className="text-xl" />
            <span>EXPLORE MACHINES</span>
          </button>

          <button className="bg-black text-white border border-gray-100 text-xs font-bold rounded-sm flex justify-center items-center gap-2 py-4">
            <MdOutlineSlowMotionVideo className="text-xl" />
            <span>WATCH VIDEO</span>
          </button>
        </div>
      </div>

      <div className="text-white absolute bottom-0 flex text-xs border-t border-white/30 py-8">
        <div className="border-r border-white/30 flex gap-2 px-2">
          <CiSettings className="text-4xl" />
          <p>PRECISION ENGINEERED</p>
        </div>

        <div className="border-r border-white/30 flex gap-2 px-2">
          <MdOutlineSecurity className="text-4xl" />
          <p>DURABLE & RELIABLE</p>
        </div>
        <div className="flex gap-2 px-2">
          <GrSuse className="text-4xl" />
          <p>EASY TO USE & MAINTAIN</p>
        </div>
      </div>
    </div>
  );
};
