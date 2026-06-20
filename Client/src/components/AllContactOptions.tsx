import { IoIosCall } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { IoLocationOutline } from "react-icons/io5";
import { GoArrowRight } from "react-icons/go";

const contactOptions = [
  {
    icon: IoIosCall,
    label: "Call Us",
    text: "Sales & Technical Assistance",
    paragraph:
      "Speak directly with our experts for machine inquiries, quotations, and technical guidance tailored to your production requirements.",
    buttonText: "CONNECT WITH EXPERT",
  },
  {
    icon: FaWhatsapp,
    label: "Whats App",
    text: "Quick Business Support",
    paragraph:
      "Get instant responses from our team regarding machine specifications, availability, pricing, and project requirements.",
    buttonText: "START CONVERSATION",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    text: "Explore Our Work",
    paragraph:
      "Follow our latest projects, machine installations, manufacturing updates, and industry achievements.",
    buttonText: "VIEW INSTAGRAM",
  },
  {
    icon: FaFacebookF,
    label: "Facebook",
    text: "Stay Connected",
    paragraph:
      "Follow our company updates, industry insights, and customer success stories from our manufacturing journey.",
    buttonText: "FOLLOW PAGE",
  },
  {
    icon: TfiEmail,
    label: "Email",
    text: "Send Your Requirements",
    paragraph:
      "Share your project details with us and receive professional recommendations, proposals, and technical solutions.",
    buttonText: "SEND INQUIRY",
  },
  {
    icon: IoLocationOutline,
    label: "Head Office",
    text: "Visit Our Facility",
    paragraph:
      "Meet our team, explore our capabilities, and discuss customized machinery solutions at our manufacturing facility.",
    buttonText: "GET DIRECTIONS",
  },
];

export const AllContactOptions = () => {
  return (
    <div className="bg-[#111315] flex flex-col gap-y-3 md:gap-[2vw] md:grid md:grid-cols-2 xl:grid-cols-3 montserrat px-[4vw] sm:px-[8vw] py-10">
      {contactOptions.map((options, index) => (
        <div
          key={index}
          className="bg-linear-to-tl from-black/95 via-black/60 to-transparent border-[#2A2D31] text-white flex flex-col gap-4 rounded-xl p-8"
        >
          <div className="flex items-center gap-6">
            <div className={`border border-[#C89B3C]  rounded-full p-2`}>
              <options.icon className="text-4xl text-[#C89B3C]" />
            </div>
            <p className="font-bold text-xl">{options.label}</p>
          </div>
          <p className="text-lg">{options.text}</p>
          <p className="text-xs text-gray-200/50">{options.paragraph}</p>

          <button
            className={`montserrat text-[#C89B3C] border border-[#2A2D31] font-bold text-sm py-4 md:px-4 rounded-xl`}
          >
            {options.buttonText}
            <GoArrowRight className="text-lg inline-block ml-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
