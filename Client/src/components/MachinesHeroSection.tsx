import HeroImage from "../assets/CompanyImage/MachinesPageHeroImage.png";

export const MachinesHeroSection = () => {
  return (
    <div className="relative h-[calc(100vh-60px)] max-h-187.5">
      <img
        className="absolute h-full w-full object-cover"
        src={HeroImage}
        alt="Hero Image"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/90 to-transparent"></div>

      <div className="w-[60%] md:w-[50%] relative z-10 text-white h-full flex flex-col justify-center pl-[4vw] sm:pl-[8vw] py-10">
        <p className="font-semibold bg-linear-to-r from-yellow-300 via-yellow-500 to-amber-700 bg-clip-text text-transparent mb-2">
          EXPLORE MACHINES.
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold bebas-neue mb-4">
          MACHINES THAT <br />{" "}
          <span className="text-yellow-400">MOVE INDUSTRY.</span>
        </h1>{" "}
        <p className="bg-yellow-400 h-0.5 w-10"></p>
        <p className="text-xs sm:text-sm text-gray-300 mt-6">
          Discover our range of high-performance industrial machines engineered
          to deliver unmatched precision, exceptional reliability, and maximum
          productivity. Designed for demanding applications, our solutions help
          businesses streamline operations, reduce downtime, and achieve
          consistent results across every stage of production.
        </p>
      </div>
    </div>
  );
};
