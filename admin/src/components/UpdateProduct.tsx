import { useEffect, useState } from "react";
import { Edit, X } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

import { backendUrl } from "../App";

interface ProductInfo {
  label: string;
  value: string;
}

interface Product {
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

interface UpdateProductProps {
  product: Product;
  onUpdated: (product: Product) => void;
}

export const UpdateProduct = ({
  product,
  onUpdated,
}: UpdateProductProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(
    product.description
  );
  const [price, setPrice] = useState(product.price);

  const [loading, setLoading] = useState(false);

  // Keep form synchronized with product
  useEffect(() => {
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
  }, [product]);

  const openModal = () => {
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);

    setIsOpen(true);
  };

  const closeModal = () => {
    if (loading) return;

    setIsOpen(false);
  };

  const handleUpdate = async () => {
    // ----------------------------------
    // Validate
    // ----------------------------------

    if (!name.trim()) {
      toast.error("Product name is required");
      return;
    }

    if (!description.trim()) {
      toast.error("Product description is required");
      return;
    }

    if (price < 0) {
      toast.error("Price cannot be negative");
      return;
    }

    // ----------------------------------
    // Create only changed fields
    // ----------------------------------

    const updateData: {
      name?: string;
      description?: string;
      price?: number;
    } = {};

    if (name.trim() !== product.name) {
      updateData.name = name.trim();
    }

    if (description.trim() !== product.description) {
      updateData.description = description.trim();
    }

    if (price !== product.price) {
      updateData.price = price;
    }

    // ----------------------------------
    // No changes
    // ----------------------------------

    if (Object.keys(updateData).length === 0) {
      toast.info("No changes made");
      return;
    }

    try {
      setLoading(true);

      const updateUrl = `${backendUrl}/api/products/update/${product._id}`;

      console.log("Update URL:", updateUrl);
      console.log("Update data:", updateData);

      const response = await axios.put(
        updateUrl,
        updateData,
        {
          timeout: 10000,
        }
      );

      console.log("Update response:", response.data);

      if (response.data.success) {
        toast.success(
          response.data.message ||
            "Product updated successfully"
        );

        // Update product inside ListItems
        onUpdated(response.data.product);

        setIsOpen(false);
      } else {
        toast.error(
          response.data.message ||
            "Failed to update product"
        );
      }
    } catch (error) {
      console.error("Update product error:", error);

      if (axios.isAxiosError(error)) {
        console.error(
          "Status:",
          error.response?.status
        );

        console.error(
          "Response:",
          error.response?.data
        );

        console.error(
          "URL:",
          error.config?.url
        );

        if (error.code === "ECONNABORTED") {
          toast.error(
            "Request timed out. Check your backend server."
          );
        } else if (error.response) {
          toast.error(
            error.response.data?.message ||
              "Failed to update product"
          );
        } else {
          toast.error(
            "Cannot connect to the server"
          );
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Edit Button */}
      <button
        type="button"
        onClick={openModal}
        title="Edit product"
        className="
          p-2
          rounded-md
          border border-gray-200
          text-gray-600
          hover:text-black
          hover:bg-gray-100
          transition
        "
      >
        <Edit size={17} />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/40
            flex
            items-center
            justify-center
            p-4
          "
        >
          <div
            className="
              bg-white
              w-full
              max-w-lg
              rounded-lg
              shadow-xl
              max-h-[90vh]
              overflow-y-auto
            "
          >
            {/* Header */}
            <div
              className="
                flex
                items-center
                justify-between
                px-6
                py-4
                border-b
                border-gray-200
                sticky
                top-0
                bg-white
                z-10
              "
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Update Product
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Update product details
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={loading}
                className="
                  p-2
                  rounded-md
                  hover:bg-gray-100
                  disabled:opacity-50
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
              className="p-6 space-y-5"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="product-name"
                  className="
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    mb-2
                  "
                >
                  Product Name
                </label>

                <input
                  id="product-name"
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                  disabled={loading}
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-md
                    px-3
                    py-2
                    text-sm
                    outline-none
                    focus:border-gray-500
                    disabled:bg-gray-100
                  "
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="product-description"
                  className="
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    mb-2
                  "
                >
                  Description
                </label>

                <textarea
                  id="product-description"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  required
                  rows={4}
                  disabled={loading}
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-md
                    px-3
                    py-2
                    text-sm
                    outline-none
                    focus:border-gray-500
                    resize-none
                    disabled:bg-gray-100
                  "
                />
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="product-price"
                  className="
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    mb-2
                  "
                >
                  Price
                </label>

                <input
                  id="product-price"
                  type="number"
                  value={price}
                  onChange={(e) =>
                    setPrice(Number(e.target.value))
                  }
                  min={0}
                  required
                  disabled={loading}
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-md
                    px-3
                    py-2
                    text-sm
                    outline-none
                    focus:border-gray-500
                    disabled:bg-gray-100
                  "
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loading}
                  className="
                    px-4
                    py-2
                    border
                    border-gray-300
                    rounded-md
                    text-sm
                    font-medium
                    hover:bg-gray-50
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    px-4
                    py-2
                    bg-black
                    text-white
                    rounded-md
                    text-sm
                    font-medium
                    hover:bg-gray-800
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    flex
                    items-center
                    gap-2
                  "
                >
                  {loading && (
                    <div
                      className="
                        w-4
                        h-4
                        border-2
                        border-white/30
                        border-t-white
                        rounded-full
                        animate-spin
                      "
                    />
                  )}

                  {loading
                    ? "Updating..."
                    : "Update Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};