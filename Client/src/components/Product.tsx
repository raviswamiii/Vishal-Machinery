import PackagingMachine from "../assets/Products/PackagingMachine.png";

const productInfo = [
  { label: "Capacity", value: "1000 Pouch/Hour" },
  { label: "Usage/Application", value: "Industrial" },
  { label: "Material To Be Processed", value: "Tea" },
  { label: "Automation Grade", value: "Automatic" },
  { label: "Brand", value: "Vishal Machinery" },
  { label: "Power", value: "220v" },
  { label: "Model Name/Number", value: "vm03" },
  { label: "Voltage", value: "220v" },
  { label: "Country Of Origin", value: "Made In India" },
  { label: "Delivery Time", value: "5 - 7 Days" },
];
const productInfo2 = [
  { label: "Usage/Application", value: "Food Processing Industry" },
  { label: "Packaging Material", value: "Plastic" },
  { label: "Sealing Type", value: "Center Seal" },
  { label: "Power", value: "4kw" },
  { label: "Phase", value: "Three Phases" },
  { label: "Capacity", value: "60 Pouch/Min(According to product)" },
  { label: "Driver Type", value: "Electric" },
  { label: "Brand", value: "Vishal Machinery" },
  { label: "Voltage", value: "220 V" },
  { label: "Automation Grade", value: "Automatic" },
  { label: "Model Name/Number", value: "SMT 002" },
  { label: "Power Requirement", value: "3 KW/AC" },
  { label: "Accuracy", value: "+/- 1%" },
  { label: "Net Weight", value: "780kg" },
  { label: "Dimension", value: "1050mm x 990mm x 2100mm" },
  { label: "Country Of Origin", value: "Made In India" },
];
export const Product = () => {
  return (
    <div className="md:px-10">
      <div className="h-[calc(100vh-60px)] overflow-hidden p-6 flex flex-col sm:flex-row-reverse gap-4">
        <div className="flex-1 min-h-0">
          <img
            src={PackagingMachine}
            className="bg-gray-200 h-full w-full object-contain"
            alt="Packaging Machine"
          />
        </div>

        <div className="flex flex-row h-[17vh] w-full gap-2 sm:flex-col sm:h-full sm:w-[17vw] sm:shrink-0 sm:gap-2">
          <img
            src={PackagingMachine}
            className="flex-1 min-w-0 min-h-0 bg-gray-200 object-contain"
            alt="Packaging Machine"
          />

          <img
            src={PackagingMachine}
            className="flex-1 min-w-0 min-h-0 bg-gray-200 object-contain"
            alt="Packaging Machine"
          />

          <img
            src={PackagingMachine}
            className="flex-1 min-w-0 min-h-0 bg-gray-200 object-contain"
            alt="Packaging Machine"
          />

          <img
            src={PackagingMachine}
            className="flex-1 min-w-0 min-h-0 bg-gray-200 object-contain"
            alt="Packaging Machine"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 px-6 pb-6">
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">₹3,90,000</p>
          <h1 className="text-xl font-bold montserrat">
            SEMI AUTOMATIC POUCH PACKING MACHINE
          </h1>
          <p className="text-sm">
            Cost-effective and efficient solution for small to medium
            production.
          </p>
        </div>

        <div>
          {productInfo.map((info, index) => (
            <div key={index} className="flex justify-between text-sm">
              <p className="py-1">{info.label}</p>
              <p className="py-1">{info.value}</p>
            </div>
          ))}
        </div>

        <div className="border border-gray-500/50">
          {productInfo2.map((info, index) => (
            <div
              key={index}
              className="flex justify-between text-xs last:[&>p]:border-b-0"
            >
              <p className="p-2 border-b border-r border-gray-500/50 w-[40%]">
                {info.label}
              </p>
              <p className="p-2 border-b border-gray-500/50 w-[60%]">
                {info.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
