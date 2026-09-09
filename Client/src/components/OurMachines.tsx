import { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import axios from "axios";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
}

export const OurMachines = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${backendUrl}/api/products/featured?limit=6`,
      );

      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, [backendUrl]);

  return (
    <div className="bg-[#F6FAEF] min-h-screen flex flex-col gap-8 px-[4vw] sm:px-[8vw] py-10 md:relative">
      {/* Header */}
      <div className="flex flex-col gap-3 md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <div className="flex items-center gap-2">
          <p className="text-yellow-400 text-md font-semibold montserrat">
            OUR MACHINES
          </p>

          <p className="bg-yellow-400 h-0.5 w-10"></p>
        </div>

        <h1 className="text-2xl font-bold montserrat">
          Engineered for every <br />
          Packaging need
        </h1>

        <p className="text-sm text-gray-800">
          From granules to powder, liquids to solids - Our machines deliver
          consistent performance across multiple industries.
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="min-h-75 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-yellow-400 rounded-full animate-spin"></div>

            <p className="text-sm text-gray-600 montserrat">
              Loading machines...
            </p>
          </div>
        </div>
      ) : products.length === 0 ? (
        /* No Products */
        <div className="min-h-75 flex items-center justify-center">
          <p className="text-gray-600 montserrat">No machines available.</p>
        </div>
      ) : (
        /* Products */
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-[2vw]">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white flex md:flex-col items-center rounded-xl shadow-lg overflow-hidden"
            >
              {/* Image */}
              <img
                className="h-55 w-[40%] md:w-full object-contain p-4"
                src={product.image1}
                alt={product.name}
              />

              {/* Product Information */}
              <div className="px-[2vw] md:px-[4vw] md:pb-[2vw] w-full">
                <h1 className="text-md font-bold montserrat mb-2 line-clamp-2">
                  {product.name}
                </h1>

                <p className="text-sm text-gray-800 mb-2 line-clamp-3">
                  {product.description}
                </p>

                <Link
                  to={`/product/${product._id}`}
                  className="text-yellow-400 text-sm montserrat font-semibold"
                >
                  VIEW DETAILS
                  <GoArrowRight className="text-lg inline-block ml-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View All Machines */}
      <Link
        to="/machines"
        className="montserrat flex justify-center border border-gray-600 font-bold text-sm py-4 md:px-4 rounded-sm md:absolute md:right-[10vw] md:top-[21vh]"
      >
        VIEW ALL MACHINES
        <GoArrowRight className="text-lg inline-block ml-4" />
      </Link>
    </div>
  );
};
