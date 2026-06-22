import { TfiHeadphoneAlt } from "react-icons/tfi";
import { GoArrowRight } from "react-icons/go";
import logo from "../assets/Logo/logo.png";
import { MdOutlineCopyright } from "react-icons/md";
import { Link } from "react-router-dom";

// Defines the structure of each footer link item
// path is optional because some items are only text currently
type FooterItem = {
  name: string;
  path?: string;
};

// Defines each footer section with a title and multiple items
type FooterSection = {
  title: string;
  items: FooterItem[];
};

// Footer navigation data
// Keeping data separate from JSX makes adding/removing links easier
const footerDetails: FooterSection[] = [
  {
    title: "QUICK LINKS",
    items: [
      { name: "Home", path: "/" },
      { name: "Machines", path: "/machines" },
      { name: "About Us", path: "/aboutUs" },
      { name: "Contact", path: "/contact" },
    ],
  },
  {
    title: "OUR PRODUCTS",
    items: [
      { name: "Pouch Packaging Machine" },
      { name: "Agarbatti Making Machine" },
      { name: "Slipper Making Machine" },
      { name: "Paper Cup Making Machine" },
    ],
  },
  {
    title: "SUPPORT",
    items: [
      { name: "FAQs" },
      { name: "Warranty" },
      { name: "Installation" },
      { name: "Maintenance" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className=" bg-black">

      {/* Main footer content container */}
      <div className="text-white pt-10 flex flex-col gap-6 px-[4vw] sm:px-[8vw]">
        
        {/* Contact CTA section */}
        <section className="border-b-[0.5px] border-gray-300/50">
          <div className="flex flex-col gap-6 pb-6 sm:w-fit">
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

            {/* Redirect user to contact page */}
            <Link
              to="/contact"
              className="bg-yellow-400 flex items-center justify-center text-black text-sm font-bold py-4 rounded-lg montserrat w-full"
            >
              CONTACT US
              <GoArrowRight className="ml-6 text-lg" />
            </Link>
          </div>
        </section>

        {/* Company information and navigation */}
        <section className="flex flex-col gap-4">
          {/* Company logo and brand name */}
          <div className="flex items-center gap-2">
            <img
              className="h-10 w-auto rounded-full overflow-hidden"
              src={logo}
              alt="Vishal Machinery Logo"
            />
            <div>
              <p className="text-2xl tracking-widest bold-bebas-neue h-6">
                VISHAL
              </p>
              <p className="text-[10px] tracking-[0.2em] bebas-neue">
                MACHINERY
              </p>
            </div>
          </div>

          {/* Company description */}
          <p className="text-sm text-gray-400 max-w-lg">
            Delivering high-quality machinery solutions with reliability,
            innovation and unmatched customer support.
          </p>
        </section>

        {/* Dynamic footer navigation sections */}
        <section className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          {footerDetails.map((details, index) => (
            <div key={index}>
              {/* Footer section heading */}
              <h3 className="montserrat text-sm font-semibold mb-4">
                {details.title}
              </h3>

              {/* Footer links */}
              <div className="flex flex-col gap-3">
                {details.items.map((item, i) =>
                  item.path ? (
                    <Link
                      key={i}
                      to={item.path}
                      className="text-sm text-gray-300 montserrat hover:text-white transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <p key={i} className="text-sm text-gray-300 montserrat">
                      {item.name}
                    </p>
                  ),
                )}
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Copyright section */}
      <section className="flex items-center gap-1 text-gray-500 justify-center w-full py-[4vh]">
        <MdOutlineCopyright />
        <small>Vishal Machinery. All rights reserved.</small>
      </section>
    </footer>
  );
};
