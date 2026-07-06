import {
  PiSealQuestion,
  PiShieldCheck,
  PiWrench,
  PiGear,
} from "react-icons/pi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const supportAndServices = [
  {
    icon: PiSealQuestion,
    title: "FAQs",
    paragraph:
      "Get quick answers to the most common questions about our machines and services.",
    items: [
      { icon: IoMdCheckmarkCircleOutline, title: "Machine Features" },
      { icon: IoMdCheckmarkCircleOutline, title: "Technical Specifications" },
      { icon: IoMdCheckmarkCircleOutline, title: "Ordering & Delivery" },
      { icon: IoMdCheckmarkCircleOutline, title: "Payment & More" },
    ],
  },
  {
    icon: PiShieldCheck,
    title: "Warranty",
    paragraph:
      "Every machine comes with dependable warranty coverage and genuine spare parts support.",
    items: [
      { icon: IoMdCheckmarkCircleOutline, title: "Warranty Coverage" },
      { icon: IoMdCheckmarkCircleOutline, title: "Quality Assurance" },
      { icon: IoMdCheckmarkCircleOutline, title: "Genuine Spare Parts" },
      { icon: IoMdCheckmarkCircleOutline, title: "Reliable Support" },
    ],
  },
  {
    icon: PiWrench,
    title: "Installation",
    paragraph:
      "Professional installation and commissioning to get your machine running efficiently.",
    items: [
      { icon: IoMdCheckmarkCircleOutline, title: "On-site Installation" },
      { icon: IoMdCheckmarkCircleOutline, title: "Testing & Commissioning" },
      { icon: IoMdCheckmarkCircleOutline, title: "Operator Training" },
      { icon: IoMdCheckmarkCircleOutline, title: "Smooth Handover" },
    ],
  },
  {
    icon: PiGear,
    title: "Maintenance",
    paragraph:
      "Preventive maintenance and fast technical support to maximize machine uptime.",
    items: [
      { icon: IoMdCheckmarkCircleOutline, title: "Preventive Maintenance" },
      { icon: IoMdCheckmarkCircleOutline, title: "Quick Response" },
      { icon: IoMdCheckmarkCircleOutline, title: "Technical Support" },
      { icon: IoMdCheckmarkCircleOutline, title: "Long-term Reliability" },
    ],
  },
];

export const SupportAndServices = () => {
  return (
    <div className="px-[4vw] sm:px-[8vw] py-10">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-center mt-4 montserrat">
          WE'VE GOT YOU COVERED
        </h1>
        <p className="text-sm text-center mt-2">
          From the moment you choose our machines and long after installation,
          our team is here to ensure reliability, performance and peace of mind.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
        {supportAndServices.map((service) => {
          const Icon = service.icon;

          return (
            <div
              key={service.title}
              className="group bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-8 flex flex-col border"
            >
              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-yellow-50 flex items-center justify-center mb-6 group-hover:bg-yellow-100 transition">
                  <Icon className="text-4xl text-yellow-500" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900">
                {service.title}
              </h2>

              <div className="w-12 h-1 bg-yellow-400 rounded-full my-4"></div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-7">
                {service.paragraph}
              </p>

              {/* Bullet Points */}
              <div className="mt-6 space-y-3">
                {service.items.map((item) => {
                  const ItemIcon = item.icon;

                  return (
                    <div key={item.title} className="flex items-center gap-3">
                      <ItemIcon className="text-yellow-500 text-lg flex-shrink-0" />
                      <span className="text-gray-700 text-sm">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
