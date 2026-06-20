import FactoryImage from "../assets/CompanyImage/Factory Image.jpg";

export const ContactHeroSection = () => {
  return (
    <div className="">
      <div className="relative h-[calc(100vh-60px)]">
        <img
          className="absolute h-full w-full object-cover"
          src={FactoryImage}
          alt="Factory Image"
        />

        <div className="absolute inset-0 bg-linear-to-r from-black/90 to-transparent"></div>

        <div className="w-[60%] md:w-[50%] relative z-10 text-white h-full flex flex-col justify-center pl-[4vw] sm:pl-[8vw] py-10">
          <p className="font-semibold bg-linear-to-r from-yellow-300 via-yellow-500 to-amber-700 bg-clip-text text-transparent mb-2">
            CONTACT US.
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold bebas-neue mb-4">
            GET IN TOUCH <br />{" "}
            <span className="text-yellow-400">WITH US.</span>
          </h1>{" "}
          <p className="bg-yellow-400 h-0.5 w-10"></p>
          <p className="text-xs sm:text-sm text-gray-300 mt-6">
            With years of experience and a commitment to quality, we strive to
            build strong relationships with our clients through reliable service
            and innovative solutions. Reach out to us today, and let’s explore
            how we can work together to achieve your goals and create lasting
            value for your business.
          </p>
        </div>
      </div>
    </div>
  );
};
