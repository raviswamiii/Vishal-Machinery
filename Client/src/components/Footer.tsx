import { TfiHeadphoneAlt } from "react-icons/tfi";
import { GoArrowRight } from "react-icons/go";
import logo from "../assets/Logo/logo.png";
import { FaFacebookF } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { MdOutlineCopyright } from "react-icons/md";

const socialMediaIcons = [
  { icon: FaFacebookF },
  { icon: FaWhatsapp },
  { icon: FaInstagram },
  { icon: FaLinkedinIn },
];

const pages = [
  { page: "HOME" },
  { page: "MACHINES" },
  { page: "ABOUT US" },
  { page: "CONTACT" },
];

export const Footer = () => {
  return (
    <div className="relative">
      <div className="bg-black min-h-screen text-white pt-10 px-[4vw] sm:px-[8vw]">
        <div className="flex flex-col gap-6 border-b-[0.5px] border-gray-300/50 pb-6">
          <div className="flex items-center gap-8">
            <TfiHeadphoneAlt className="text-5xl text-yellow-500" />
            <div>
              <p className="text-md font-semibold montserrat">
                NEED HELP CHOOSING THE RIGHT MACHINE?
              </p>
              <p className="text-sm text-gray-400">
                Talk to our experts today.
              </p>
            </div>
          </div>

          <button className="bg-yellow-400 flex items-center justify-center text-black text-sm font-bold py-4 rounded-lg montserrat w-full">
            CONTACT US
            <GoArrowRight className="ml-6 text-lg" />
          </button>
        </div>

        <div className="pt-6 flex flex-col gap-4">
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
              <p className="text-[10px] tracking-[0.2em] bebas-neue">
                MACHINERY
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-400">
            High performance packaging machines <br /> built for precision,
            reliability and efficiency.
          </p>

          <div className="flex gap-4 mt-2">
            {socialMediaIcons.map((socialMediaIcon, index) => (
              <div key={index} className="border rounded-full p-3">
                <socialMediaIcon.icon />
              </div>
            ))}
          </div>

          <div>
            {pages.map((page, index) => (
              <p
                key={index}
                className="py-3 text-sm text-gray-300 font-semibold border-b-[0.5px] border-gray-300/50 montserrat"
              >
                {page.page}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center text-xs gap-1 text-gray-500 justify-center absolute bottom-5 w-full">
        <MdOutlineCopyright />
        <p>Vishal Machinery. All rights reserved.</p>
      </div>
    </div>
  );
};
