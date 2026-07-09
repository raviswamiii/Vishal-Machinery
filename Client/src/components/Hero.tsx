import PackagingMachine from "../assets/heroImage/PackagingMachine.png";
import BackgroundImg from "../assets/heroImage/BackgroundImage.png";
import { CiSettings } from "react-icons/ci";
import { MdOutlineSecurity } from "react-icons/md";
import { GrSuse } from "react-icons/gr";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { RiCameraLensFill } from "react-icons/ri";

const bottomBar = [
  { icon: CiSettings, lable: "PRECISION ENGINEERED" },
  { icon: MdOutlineSecurity, lable: "DURABLE & RELIABLE" },
  { icon: GrSuse, lable: "EASY TO USE & MAINTAIN" },
];

export const Hero = () => {
  return (
    <div className="h-[calc(100vh-60px)] max-h-187.5 flex flex-col bg-black">
      <div className="relative flex flex-col justify-center overflow-hidden">
        <div className="flex-1 absolute z-10 w-[50%] lg:w-[40%] text-white pl-[4vw] sm:pl-[8vw] flex flex-col justify-center gap-2">
          <div className="flex flex-col gap-1">
            <p className="font-semibold bg-linear-to-r from-yellow-300 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
              BUILD FOR PRECISION.
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold bebas-neue leading-none">
              BUILD FOR <br />{" "}
              <span className="text-yellow-400">PERFORMANCE.</span>
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-gray-300">
            High-performance industrial machines engineered for reliability,
            precision, and unmatched efficiency—helping businesses improve
            productivity and achieve consistent results across every operation.
          </p>

          <div className="flex flex-col gap-3 mt-2">
            <button className="bg-yellow-400 text-black text-xs font-extrabold rounded-sm flex justify-center items-center gap-2 py-4 px-[2vw] sm:w-[75%] md:w-[65%]">
              <RiCameraLensFill className="text-xl" />
              <span>EXPLORE MACHINES</span>
            </button>

            <button className="bg-black text-white border border-gray-100 text-xs font-bold rounded-sm flex justify-center items-center gap-2 py-4 px-[2vw] sm:w-[75%] md:w-[65%]">
              <MdOutlineSlowMotionVideo className="text-xl" />
              <span>WATCH VIDEO</span>
            </button>
          </div>
        </div>

        <div className="h-[calc(100vh-140px)] overflow-hidden relative">
          <img
            className="h-full w-full"
            src={BackgroundImg}
            alt="Packaging Machine"
          />
          <img
            className="h-full w-full object-cover md:object-contain absolute top-0 -right-30 sm:-right-35 md:-right-45 lg:-right-55"
            src={PackagingMachine}
            alt="Packaging Machine"
          />
        </div>
      </div>

      <div className="h-20 border-t border-white/20 text-white col-span-2 flex items-center">
        {bottomBar.map((items, index) => (
          <div
            key={index}
            className="border-r border-white/20 last:border-r-0 w-full flex items-center justify-center gap-2 text-xs px-2"
          >
            <items.icon className="text-4xl" />
            <p>{items.lable}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
