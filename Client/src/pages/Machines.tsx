import PackagingMachine from "../assets/Products/PackagingMachine.png";
import { GoArrowRight } from "react-icons/go";

const productSection = [1, 2, 3, 4, 5];
const products = [1, 2, 3, 4, 5];

export const Machines = () => {
  return (
    <div className="bg-[#F6FAEF] min-h-screen flex flex-col gap-8 px-[4vw] sm:px-[8vw] py-10 md:relative">
      <div className="flex flex-col gap-3 md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <div className="flex items-center gap-2">
          <p className="text-yellow-400 text-md font-semibold montserrat">
            OUR MACHINES
          </p>
          <p className="bg-yellow-400 h-0.5 w-10"></p>
        </div>

        <h1 className="text-2xl font-bold montserrat">
          Engineered for every <br /> Packaging need
        </h1>
        <p className="text-sm text-gray-800">
          From granules to powder, liquids to solids - Our machines deliver
          consistent performance across multiple industries.
        </p>
      </div>

      {productSection.map((_, index) => (
        <div key={index}>
          <h1 className="text-[22px] font-bold pb-4 montserrat">
            Pouch Packing Machine
          </h1>

          <div className="flex overflow-x-auto no-scrollbar md:grid md:grid-cols-3 md:overflow-visible gap-x-3 sm:gap-[2vw]">
            {products.map((_, index) => (
              <div
                key={index}
                className="bg-white flex md:flex-col items-center rounded-xl shadow-lg min-w-[85vw] sm:min-w-[70vw]  md:min-w-0"
              >
                <img
                  className="h-55"
                  src={PackagingMachine}
                  alt="Packaging Machines"
                />

                <div className="px-[2vw] md:pb-[2vw] lg:px-[4vw]">
                  <h1 className="text-md font-bold montserrat mb-2">
                    SEMI AUTOMATIC POUCH PACKING MACHINE
                  </h1>
                  <p className="text-sm text-gray-800 mb-2">
                    Cost-effective and efficient solution for small to medium
                    production.
                  </p>
                  <button className="text-yellow-400 text-sm montserrat font-semibold">
                    VIEW DETAILS
                    <GoArrowRight className="text-lg inline-block ml-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
