import { useEffect, useState } from "react";
import { Edit, X, Plus, Trash2 } from "lucide-react";
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

interface SpecificationTableProps {
  data: ProductInfo[];
  onAdd: () => void;
  onUpdate: (index: number, field: "label" | "value", value: string) => void;
  onRemove: (index: number) => void;
  loading: boolean;
}

const SpecificationTable = ({
  data,
  onAdd,
  onUpdate,
  onRemove,
  loading,
}: SpecificationTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-300">
      {/* Header */}
      <div className="hidden grid-cols-[1fr_1fr_44px] gap-3 bg-gray-100 px-3 py-3 text-xs font-bold uppercase tracking-wide text-gray-700 sm:grid">
        <span>Specification</span>
        <span>Value</span>
        <span></span>
      </div>

      {/* Rows */}
      <div>
        {data.map((info, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-2 border-t border-gray-300 p-3 sm:grid-cols-[1fr_1fr_44px] sm:items-center sm:gap-3"
          >
            {/* Label */}
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-gray-700 sm:hidden">
                Specification
              </label>

              <input
                type="text"
                placeholder="Enter specification..."
                value={info.label}
                disabled={loading}
                onChange={(e) => onUpdate(index, "label", e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 disabled:bg-gray-100"
              />
            </div>

            {/* Value */}
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-gray-700 sm:hidden">
                Value
              </label>

              <input
                type="text"
                placeholder="Enter value..."
                value={info.value}
                disabled={loading}
                onChange={(e) => onUpdate(index, "value", e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 disabled:bg-gray-100"
              />
            </div>

            {/* Delete */}
            <button
              type="button"
              disabled={loading}
              onClick={() => onRemove(index)}
              className="flex h-10 w-10 items-center justify-center rounded-md text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              title="Remove specification"
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}
      </div>

      {/* Add */}
      <div className="border-t border-gray-300 bg-gray-50 p-3">
        <button
          type="button"
          disabled={loading}
          onClick={onAdd}
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-400 bg-white">
            <Plus size={14} />
          </span>
          Add specification
        </button>
      </div>
    </div>
  );
};

export const UpdateProduct = ({ product, onUpdated }: UpdateProductProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Basic product information
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

  // Specifications
  const [productInfo, setProductInfo] = useState<ProductInfo[]>(
    product.productInfo || [],
  );

  const [productInfo2, setProductInfo2] = useState<ProductInfo[]>(
    product.productInfo2 || [],
  );

  const [loading, setLoading] = useState(false);

  // --------------------------------------------------
  // Keep form synchronized with product
  // --------------------------------------------------

  useEffect(() => {
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);

    setProductInfo(product.productInfo || []);
    setProductInfo2(product.productInfo2 || []);
  }, [product]);

  // --------------------------------------------------
  // Open modal
  // --------------------------------------------------

  const openModal = () => {
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);

    setProductInfo(product.productInfo || []);
    setProductInfo2(product.productInfo2 || []);

    setIsOpen(true);
  };

  // --------------------------------------------------
  // Close modal
  // --------------------------------------------------

  const closeModal = () => {
    if (loading) return;

    setIsOpen(false);
  };

  // --------------------------------------------------
  // Product Specification functions
  // --------------------------------------------------

  const addProductInfo = () => {
    setProductInfo((prev) => [
      ...prev,
      {
        label: "",
        value: "",
      },
    ]);
  };

  const updateProductInfo = (
    index: number,
    field: "label" | "value",
    value: string,
  ) => {
    setProductInfo((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });
  };

  const removeProductInfo = (index: number) => {
    setProductInfo((prev) => prev.filter((_, i) => i !== index));
  };

  // --------------------------------------------------
  // Additional Specification functions
  // --------------------------------------------------

  const addProductInfo2 = () => {
    setProductInfo2((prev) => [
      ...prev,
      {
        label: "",
        value: "",
      },
    ]);
  };

  const updateProductInfo2 = (
    index: number,
    field: "label" | "value",
    value: string,
  ) => {
    setProductInfo2((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });
  };

  const removeProductInfo2 = (index: number) => {
    setProductInfo2((prev) => prev.filter((_, i) => i !== index));
  };

  // --------------------------------------------------
  // Compare specifications
  // --------------------------------------------------

  const specificationsChanged = (
    current: ProductInfo[],
    original: ProductInfo[],
  ) => {
    const currentFiltered = current.filter(
      (item) => item.label.trim() || item.value.trim(),
    );

    const originalFiltered = (original || []).filter(
      (item) => item.label.trim() || item.value.trim(),
    );

    return JSON.stringify(currentFiltered) !== JSON.stringify(originalFiltered);
  };

  // --------------------------------------------------
  // Update Product
  // --------------------------------------------------

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
      productInfo?: ProductInfo[];
      productInfo2?: ProductInfo[];
    } = {};

    // Name
    if (name.trim() !== product.name) {
      updateData.name = name.trim();
    }

    // Description
    if (description.trim() !== product.description) {
      updateData.description = description.trim();
    }

    // Price
    if (price !== product.price) {
      updateData.price = price;
    }

    // Product Specifications
    if (specificationsChanged(productInfo, product.productInfo || [])) {
      updateData.productInfo = productInfo.filter(
        (item) => item.label.trim() || item.value.trim(),
      );
    }

    // Additional Specifications
    if (specificationsChanged(productInfo2, product.productInfo2 || [])) {
      updateData.productInfo2 = productInfo2.filter(
        (item) => item.label.trim() || item.value.trim(),
      );
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

      const response = await axios.put(updateUrl, updateData, {
        timeout: 10000,
      });

      console.log("Update response:", response.data);

      if (response.data.success) {
        toast.success(response.data.message || "Product updated successfully");

        onUpdated(response.data.product);

        setIsOpen(false);
      } else {
        toast.error(response.data.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Update product error:", error);

      if (axios.isAxiosError(error)) {
        console.error("Status:", error.response?.status);

        console.error("Response:", error.response?.data);

        console.error("URL:", error.config?.url);

        if (error.code === "ECONNABORTED") {
          toast.error("Request timed out. Check your backend server.");
        } else if (error.response) {
          toast.error(
            error.response.data?.message || "Failed to update product",
          );
        } else {
          toast.error("Cannot connect to the server");
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <>
      {/* Edit Button */}
      <button
        type="button"
        onClick={openModal}
        title="Edit product"
        className="rounded-md border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100 hover:text-black"
      >
        <Edit size={17} />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Update Product
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update product details and specifications
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={loading}
                className="rounded-md p-2 hover:bg-gray-100 disabled:opacity-50"
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
              className="space-y-6 overflow-y-auto p-6"
            >
              {/* -------------------------------- */}
              {/* Product Information */}
              {/* -------------------------------- */}

              <section>
                <h3 className="mb-4 text-base font-semibold text-gray-900">
                  Product Information
                </h3>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="product-name"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Product Name
                    </label>

                    <input
                      id="product-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={loading}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 disabled:bg-gray-100"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="product-description"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>

                    <textarea
                      id="product-description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      rows={4}
                      disabled={loading}
                      className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 disabled:bg-gray-100"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label
                      htmlFor="product-price"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>

                    <input
                      id="product-price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      min={0}
                      required
                      disabled={loading}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </section>

              {/* -------------------------------- */}
              {/* Product Specifications */}
              {/* -------------------------------- */}

              <section className="rounded-lg border border-gray-200">
                <div className="border-b border-gray-200 px-4 py-4">
                  <h3 className="text-base font-semibold text-gray-900">
                    Product Specifications
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Update the technical specifications of this product.
                  </p>
                </div>

                <div className="p-4">
                  <SpecificationTable
                    data={productInfo}
                    onAdd={addProductInfo}
                    onUpdate={updateProductInfo}
                    onRemove={removeProductInfo}
                    loading={loading}
                  />
                </div>
              </section>

              {/* -------------------------------- */}
              {/* Additional Specifications */}
              {/* -------------------------------- */}

              <section className="rounded-lg border border-gray-200">
                <div className="border-b border-gray-200 px-4 py-4">
                  <h3 className="text-base font-semibold text-gray-900">
                    Additional Specifications
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Update additional product details.
                  </p>
                </div>

                <div className="p-4">
                  <SpecificationTable
                    data={productInfo2}
                    onAdd={addProductInfo2}
                    onUpdate={updateProductInfo2}
                    onRemove={removeProductInfo2}
                    loading={loading}
                  />
                </div>
              </section>

              {/* -------------------------------- */}
              {/* Buttons */}
              {/* -------------------------------- */}

              <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loading}
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 rounded-md bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading && (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  )}

                  {loading ? "Updating..." : "Update Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
