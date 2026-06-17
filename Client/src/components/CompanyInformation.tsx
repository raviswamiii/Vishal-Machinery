import { CiUser } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { PiTrademarkRegistered } from "react-icons/pi";
import { GrShieldSecurity } from "react-icons/gr";
import { TiBusinessCard } from "react-icons/ti";
import { AiOutlineRise } from "react-icons/ai";
import { IoNewspaperOutline } from "react-icons/io5";
import { AiOutlineFieldNumber } from "react-icons/ai";

const information = [
  { icon: CiUser, lable: "Company CEO", information: "S Saini" },
  {
    icon: IoLocationOutline,
    lable: "Registered Address",
    information: "Shashtri Nagar, Jaipur, Rajasthan",
  },
  {
    icon: HiOutlineUserGroup,
    lable: "Total Employees",
    information: "Up to 10 People",
  },
  {
    icon: PiTrademarkRegistered,
    lable: "GST Registration",
    information: "July 2023",
  },
  {
    icon: GrShieldSecurity,
    lable: "GST Legal Status",
    information: "Proprietorship",
  },
  {
    icon: TiBusinessCard,
    lable: "Nature of Business",
    information: "Trader - Retailer",
  },
  { icon: AiOutlineRise, lable: "GST Turnover", information: "0 - 40L" },
  {
    icon: IoNewspaperOutline,
    lable: "GST Additional NOB",
    information: "Office/Sale Office, Retail Business",
  },
  {
    icon: AiOutlineFieldNumber,
    lable: "GST No.",
    information: "08**********1Z9",
  },
];

export const CompanyInformation = () => {
  return (
    <div className="bg-black text-white px-[4vw] sm:px-[8vw] py-10">
      <div className="flex items-center gap-2 pb-[2vh]">
        <p className="text-yellow-400 text-md font-semibold montserrat">
          COMPANY INFORMATION
        </p>
        <p className="bg-yellow-400 h-0.5 w-10"></p>
      </div>

      <div className="flex flex-col">
        {information.map((info, index) => (
          <div
            className="flex items-center gap-[4vw] py-3 border-b border-white/20 last:border-0"
            key={index}
          >
            <info.icon className="text-3xl md:text-4xl text-yellow-600" />
            <div>
              <p className="font-bold montserrat">{info.lable}</p>
              <p className="text-sm montserrat">{info.information}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
