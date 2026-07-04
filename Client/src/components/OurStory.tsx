import Logo from "../assets/Logo/Logo.png";
import CompanyImage from "../assets/CompanyImage/CompanyImage.png";

export const OurStory = () => {
  return (
    <div className="bg-[#F6FAEF] px-[4vw] sm:px-[8vw] py-10">
      <div className="flex items-center gap-2 pb-[2vh]">
        <p className="text-yellow-400 text-md font-semibold montserrat">
          OUR STORY
        </p>
        <p className="bg-yellow-400 h-0.5 w-10"></p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-[6vh] mb-10 md:mb-15">
        <div className="flex flex-col gap-3 md:w-[60%] lg:w-[50%]">
          <h1 className="text-2xl font-bold montserrat">
            Engineered for every <br /> Packaging need
          </h1>
          <p className="text-sm text-gray-800">
            Vishal Machinery was founded with a simple goal to make advanced
            packaging technology accessible, reliable, and efficient for
            businesses of all sites.
          </p>
          <p className="text-sm text-gray-800">
            With years of industry expertise, a focus on innovation and a
            dedicated team, we have built machines that are trusted by 100+
            happy customers across 20+ countries.
          </p>
        </div>

        <div className="rounded-lg bg-black md:w-[60%] lg:w-[50%]">
          <img
            className="h-[35vh] md:h-[40vh] lg:h-[45vh] w-full object-contain rounded-lg"
            src={Logo}
            alt="Logo"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse md:justify-between md:items-center gap-[6vh]">
        <div className="flex flex-col gap-3 md:w-[60%] lg:w-[50%]">
          <h1 className="text-2xl font-bold montserrat">
            Our Manufacturing <br /> Excellence
          </h1>
          <p className="text-sm text-gray-800">
            At Vishal Machinery, every machine is built with precision, quality,
            and performance in mind. From design and fabrication to assembly and
            rigorous quality testing, every stage of our manufacturing process
            follows strict industry standards to ensure reliability and
            long-lasting performance.
          </p>
          <p className="text-sm text-gray-800">
            Equipped with modern infrastructure and a skilled team of engineers,
            we continuously innovate to deliver packaging solutions that meet
            the evolving needs of industries worldwide.
          </p>
        </div>

        <div className="rounded-lg md:w-[60%] lg:w-[50%]">
          <img
            className="h-[35vh] md:h-[40vh] lg:h-[45vh] w-full object-cover rounded-lg"
            src={CompanyImage}
            alt="Company Image"
          />
        </div>
      </div>
    </div>
  );
};
