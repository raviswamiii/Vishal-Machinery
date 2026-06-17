import CompanyImage from "../assets/CompanyImage/CompanyImage.png";

export const OurStory = () => {
  return (
    <div className="bg-[#F6FAEF] px-[4vw] sm:px-[8vw] py-10 flex flex-col md:flex-row md:justify-between md:items-center gap-[6vh]">
      <div className="flex flex-col gap-3 md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <div className="flex items-center gap-2">
          <p className="text-yellow-400 text-md font-semibold montserrat">
            OUR STORY
          </p>
          <p className="bg-yellow-400 h-0.5 w-10"></p>
        </div>

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
          dedicated team, we have built machines that are trusted by 100+ happy
          customers across 20+ countries.
        </p>
      </div>

      <div className="rounded-lg md:w-[50%] ">
        <img
          className="h-full sm:h-[50vh] md:h-[40vh] lg:h-[45vh] w-full object-cover rounded-lg"
          src={CompanyImage}
          alt="Company Image"
        />
      </div>
    </div>
  );
};
