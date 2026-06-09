import packagingMachine from "../assets/heroImage/PackagingMachine.png";
import { CiSettings } from "react-icons/ci";
import { MdOutlineSecurity } from "react-icons/md";
import { GrSuse } from "react-icons/gr";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { RiCameraLensFill } from "react-icons/ri";

export const Hero = () => {
  return (
    <div className="h-[calc(100vh-60px)] overflow-hidden bg-black relative">
      <img
        className="h-[calc(100vh-140px)] absolute z-0 -right-20 sm:-right-2 md:right-0 scale-110"
        src={packagingMachine}
        alt="Packaging Machine"
      />

      <div className="absolute z-10 h-[calc(100vh-140px)] flex flex-col justify-center gap-4 px-4 md:px-10 w-[60%] sm:w-[55%] md:w-[65%] text-white">
        <div className="flex flex-col gap-2 sm:gap-3">
          <p className="md:text-md font-semibold bg-linear-to-r from-yellow-300 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
            BUILD FOR PRECISION.
          </p>

          <h1 className="text-5xl md:text-6xl font-semibold bebas-neue">
            BUILD FOR <br />{" "}
            <span className="text-yellow-400">PERFORMANCE.</span>
          </h1>
        </div>

        <p className="text-sm md:text-md text-gray-300 sm:w-[60%]">
          High performance packaging machines designed for reliability, speed
          and unmatched efficiency.
        </p>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-5">
          <button className="bg-yellow-400 text-black text-xs md:text-sm font-extrabold rounded-sm flex justify-center items-center gap-2 py-4 md:px-6">
            <RiCameraLensFill className="text-xl" />
            <span>EXPLORE MACHINES</span>
          </button>

          <button className="bg-black text-white border border-gray-100 text-xs md:text-sm font-bold rounded-sm flex justify-center items-center gap-2 py-4 md:px-6">
            <MdOutlineSlowMotionVideo className="text-xl" />
            <span>WATCH VIDEO</span>
          </button>
        </div>
      </div>

      <div className="text-white bg-black h-20 w-full absolute bottom-0 flex justify-between text-xs sm:text-sm border-t border-white/30 py-4 sm:px-4">
        <div className="border-r border-white/30 w-full flex items-center justify-center gap-2 px-[4vw] sm:pl-5">
          <CiSettings className="text-4xl" />
          <p>PRECISION ENGINEERED</p>
        </div>

        <div className="border-r border-white/30 w-full flex items-center justify-center gap-2 px-2 sm:pl-5">
          <MdOutlineSecurity className="text-4xl" />
          <p>DURABLE & RELIABLE</p>
        </div>

        <div className="w-full flex gap-2 items-center justify-center px-2 sm:pl-5">
          <GrSuse className="text-4xl" />
          <p>EASY TO USE & MAINTAIN</p>
        </div>
      </div>
    </div>
  );
};
