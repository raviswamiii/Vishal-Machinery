import { GrVirtualMachine } from "react-icons/gr";
import { BsGlobe2 } from "react-icons/bs";
import { GoPeople } from "react-icons/go";
import { MdAccessTime } from "react-icons/md";

const achievementData = [
  { icon: GrVirtualMachine, number: "500+", label: "MACHINES INSTALLED" },
  { icon: BsGlobe2, number: "20+", label: "COUNTRIES SERVED" },
  { icon: GoPeople, number: "1000+", label: "HAPPY CLIENTS" },
  { icon: MdAccessTime, number: "10+", label: "YEARS OF EXPERIENCE" },
];

export const AchievementPage = () => {
  return (
    <div className="bg-[#F6FAEF] flex flex-col md:flex-row md:justify-between px-[4vw] sm:px-[8vw] md:py-10 h-full">
      {achievementData.map((achievement, index) => (
        <div
          key={index}
          className="flex items-center md:justify-center gap-4 flex-1 md:w-full py-[4vh] md:px-4 border-b-[0.5px] md:border-b-0 md:border-r-[0.5px] border-gray-700/50 last:border-0"
        >
          <achievement.icon className="text-4xl" />
          <div>
            <p className="text-lg font-bold montserrat">{achievement.number}</p>
            <p className="text-xs text-gray-700 font-bold montserrat">
              {achievement.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
