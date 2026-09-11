import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export const Product = () => {
  const [product, setProduct] = useState<any>(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const productId = window.location.pathname.split("/").pop();

  const navigate = useNavigate();
  const { token } = useUserContext();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/products/getProduct/${productId}`,
      );

      if (response.data.success) {
        setProduct(response.data.product);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleGetQuote = () => {
    if (!token) {
      navigate("/login");
      return;
    }
  };

  return (
    <div className="md:px-10">
      <div className="h-[calc(100vh-60px)] overflow-hidden p-6 flex flex-col sm:flex-row-reverse gap-4">
        {/* Main Image */}
        <div className="flex-1 min-h-0">
          <img
            src={product?.image1}
            className="bg-gray-200 p-[4vw] h-full w-full object-contain"
            alt="Packaging Machine"
          />
        </div>

        {/* Thumbnail Images */}
        <div className="flex flex-row h-[17vh] w-full gap-2 sm:flex-col sm:h-full sm:w-[17vw] sm:shrink-0 sm:gap-2">
          <img
            src={product?.image1}
            className="flex-1 min-w-0 min-h-0 bg-gray-200 object-contain p-[2vw] md:p-[1vw]"
            alt="Packaging Machine"
          />

          <img
            src={product?.image2}
            className="flex-1 min-w-0 min-h-0 bg-gray-200 object-contain p-[2vw] md:p-[1vw]"
            alt="Packaging Machine"
          />

          <img
            src={product?.image3}
            className="flex-1 min-w-0 min-h-0 bg-gray-200 object-contain p-[2vw] md:p-[1vw]"
            alt="Packaging Machine"
          />

          <img
            src={product?.image4}
            className="flex-1 min-w-0 min-h-0 bg-gray-200 object-contain p-[2vw] md:p-[1vw]"
            alt="Packaging Machine"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 px-6 pb-6">
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">
            ₹{product?.price?.toLocaleString("en-IN")}
          </p>

          <h1 className="text-xl font-bold montserrat">{product?.name}</h1>

          <p className="text-sm">{product?.description}</p>

          <button
            type="button"
            className="mt-3 w-full sm:w-fit px-8 py-3 bg-[#ffc400] hover:bg-[#ffd333] text-black font-semibold rounded-md transition duration-200"
            onClick={handleGetQuote}
          >
            Get a Quote
          </button>
        </div>

        <div>
          {product?.productInfo?.map((info: any, index: number) => (
            <div key={index} className="flex justify-between text-sm">
              <p className="py-1">{info.label}</p>
              <p className="py-1">{info.value}</p>
            </div>
          ))}
        </div>

        <div className="border border-gray-500/50">
          {product?.productInfo2?.map((info: any, index: number) => (
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
