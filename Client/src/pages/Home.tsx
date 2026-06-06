import packagingMachine from "../assets/heroImage/PackagingMachin.png";

export const Home = () => {
  return (
    <div className="h-screen flex-1 overflow-hidden bg-black relative">
      <img
        className="absolute -right-25"
        src={packagingMachine}
        alt="Packaging Machine"
      />

      <div className="flex flex-col gap-4 p-4 w-[60%] text-white absolute top-20">
        <div className="flex flex-col gap-2">
          <p className="font-semibold bg-linear-to-r from-yellow-300 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
            BUILD FOR PRECISION.
          </p>

          <h1 className="montserrat text-3xl font-semibold ">
            BUILD FOR <br />{" "}
            <span className="text-yellow-400">PERFORMANCE.</span>
          </h1>
        </div>

        <p className="text-sm text-gray-300">
          High performance packaging machines designed for reliability, speed
          and unmatched efficiency.
        </p>

        <div className="montserrat flex flex-col gap-4">
          <button className="bg-yellow-400 text-black text-xs font-bold px-6 py-4 rounded-sm">
            EXPLORE MACHINES
          </button>

          <button className="border bg-black border-gray-100 text-xs font-bold px-6 py-4 rounded-sm">
            WATCH VIDEO
          </button>
        </div>
      </div>
    </div>
  );
};
