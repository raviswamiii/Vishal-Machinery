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

export const MachinesOurMachinesSection = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchAllProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${backendUrl}/api/products/getAllProducts`,
      );

      setAllProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching all products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [backendUrl]);

  // Group products according to category
  const productsByCategory = allProducts.reduce(
    (groups: Record<string, Product[]>, product) => {
      const categoryName = product.category?.name;

      if (!categoryName) return groups;

      if (!groups[categoryName]) {
        groups[categoryName] = [];
      }

      groups[categoryName].push(product);

      return groups;
    },
    {},
  );

  return (
    <div className="bg-[#F6FAEF] min-h-screen flex flex-col gap-8 px-[4vw] sm:px-[8vw] py-10">
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

      {/* Loader */}
      {loading ? (
        <div className="flex flex-1 min-h-75 items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-yellow-400 animate-spin"></div>

            <p className="text-sm text-gray-600 montserrat">
              Loading machines...
            </p>
          </div>
        </div>
      ) : allProducts.length === 0 ? (
        /* Empty State */
        <div className="flex flex-1 min-h-75 items-center justify-center">
          <p className="text-gray-600 montserrat">No machines available.</p>
        </div>
      ) : (
        /* Categories */
        Object.entries(productsByCategory).map(([categoryName, products]) => (
          <div key={categoryName}>
            {/* Category name */}
            <h1 className="text-[22px] font-bold pb-4 montserrat">
              {categoryName}
            </h1>

            {/* Products */}
            <div className="flex overflow-x-auto no-scrollbar h-55 md:h-full md:grid md:grid-cols-3 md:overflow-visible gap-x-3 sm:gap-[2vw]">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white flex md:flex-col items-center rounded-xl shadow-lg min-w-[85vw] sm:min-w-[70vw] md:min-w-0 overflow-hidden"
                >
                  {/* Image */}
                  <img
                    className="h-55 min-w-[40vw] sm:min-w-[30vw] p-4 object-contain"
                    src={product.image1}
                    alt={product.name}
                  />

                  {/* Product information */}
                  <div className="px-[2vw] md:pb-[2vw] lg:px-[4vw] w-full">
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
          </div>
        ))
      )}
    </div>
  );
};
