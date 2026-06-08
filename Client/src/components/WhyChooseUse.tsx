import { MdOutlineSettingsSuggest } from "react-icons/md";
import { MdSecurity } from "react-icons/md";
import { BsTools } from "react-icons/bs";
import { RiBox3Fill } from "react-icons/ri";

const reasons = [
  {
    icon: MdOutlineSettingsSuggest,
    title: "ADVANCED TECHNOLOGY",
    description: "Latest technology for high accuracy and performance.",
  },
  {
    icon: MdSecurity,
    title: "QUALITY ASSURED",
    description: "Every machine is tested for quality, safety and reliability.",
  },
  {
    icon: BsTools,
    title: "AFTER SALES SUPPORT",
    description: "Quick support and service to keep your business running.",
  },
  {
    icon: RiBox3Fill,
    title: "CUSTOMIZED SOLUTIONS",
    description: "Tailored solutions to meet your unique packaging needs.",
  },
];

export const WhyChooseUse = () => {
  return (
    <div className="min-h-screen flex flex-col gap-8 bg-black px-4 py-10">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <p className="text-yellow-400 text-md font-semibold montserrat">
            WHY CHOOSE US
          </p>
          <p className="bg-yellow-400 h-0.5 w-10"></p>
        </div>

        <h1 className="text-2xl text-white font-bold montserrat">
          Machines that <br /> make the difference
        </h1>
        <p className="text-sm text-gray-300">
          We combine technology, precision and experience to deliver machines
          that stand the best of time.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {reasons.map((reason, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center p-4 rounded-lg bg-zinc-900 border border-gray-700">
              <reason.icon className="text-5xl text-yellow-600" />
            </div>
            <div>
              <h1 className="text-md font-bold montserrat mb-1 text-white">
                {reason.title}
              </h1>
              <p className="text-gray-300 text-sm">{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
