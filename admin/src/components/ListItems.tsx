import { useEffect, useState } from "react";
import axios from "axios";
import { Package, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";

import { backendUrl } from "../App";
import { DeleteProduct } from "./DeleteProduct";
import { UpdateProduct } from "./UpdateProduct";

interface ProductInfo {
  label: string;
  value: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;

  category:
    | string
    | {
        _id: string;
        name: string;
      };

  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;

  productInfo: ProductInfo[];
  productInfo2: ProductInfo[];

  createdAt: string;
  updatedAt: string;
}

export const ListItems = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${backendUrl}/api/products/list`);

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to load products");
      }
    } catch (error) {
      console.error(error);

      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleted = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product._id !== productId));
  };

  const handleUpdated = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product,
      ),
    );
  };

  const getCategoryName = (category: Product["category"]) => {
    if (typeof category === "string") {
      return category;
    }

    return category?.name || "N/A";
  };

  return (
    <div className="p-4 sm:p-6 montserrat">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            List Items
          </h1>

          <p className="text-sm text-gray-500 mt-1">Manage all your products</p>
        </div>

        <button
          type="button"
          onClick={fetchProducts}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-4 py-2
            border border-gray-300 rounded-md bg-white
            text-sm font-medium text-gray-700
            hover:bg-gray-50 transition
            disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Product Count */}
      {!loading && (
        <p className="text-sm text-gray-500 mb-4">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
      )}

      {/* Loading */}
      {loading ? (
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />

            <p className="mt-4 text-sm text-gray-500">Loading products...</p>
          </div>
        </div>
      ) : products.length === 0 ? (
        /* Empty State */
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
              <Package size={28} className="text-gray-500" />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              No products found
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              You haven't added any products yet.
            </p>
          </div>
        </div>
      ) : (
        /* Table */
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-4 font-semibold text-gray-700">
                    Product
                  </th>

                  <th className="text-left px-5 py-4 font-semibold text-gray-700">
                    Category
                  </th>

                  <th className="text-left px-5 py-4 font-semibold text-gray-700">
                    Price
                  </th>

                  <th className="text-left px-5 py-4 font-semibold text-gray-700">
                    Added
                  </th>

                  <th className="text-right px-5 py-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition">
                    {/* Product */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3 min-w-55">
                        <div className="w-14 h-14 rounded-md bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                          {product.image1 ? (
                            <img
                              src={product.image1}
                              alt={product.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package size={22} className="text-gray-400" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate max-w-62.5">
                            {product.name}
                          </p>

                          <p className="text-xs text-gray-500 mt-1 truncate max-w-62.5">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                        {getCategoryName(product.category)}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-semibold text-gray-900">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500">
                      {new Date(product.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <UpdateProduct
                          product={product}
                          onUpdated={handleUpdated}
                        />

                        <DeleteProduct
                          productId={product._id}
                          onDeleted={handleDeleted}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
