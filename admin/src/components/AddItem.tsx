import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import upload_area from "../Assets/upload_area.png";
import { Plus, Trash2, ImagePlus } from "lucide-react";

interface ProductInfo {
  label: string;
  value: string;
}

const SpecificationTable = ({
  data,
  onAdd,
  onUpdate,
  onRemove,
}: {
  data: ProductInfo[];
  onAdd: () => void;
  onUpdate: (index: number, field: "label" | "value", value: string) => void;
  onRemove: (index: number) => void;
}) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-300">
      {/* Table Header */}
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
                onChange={(e) => onUpdate(index, "label", e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
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
                onChange={(e) => onUpdate(index, "value", e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
              />
            </div>

            {/* Delete */}
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="flex h-10 w-10 items-center justify-center rounded-md text-gray-500 transition hover:bg-red-50 hover:text-red-500"
              title="Remove specification"
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}
      </div>

      {/* Add specification */}
      <div className="border-t border-gray-300 bg-gray-50 p-3">
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-black"
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

export const AddItem = () => {
  // Images
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [image4, setImage4] = useState<File | null>(null);

  // Product information
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // Specifications
  const [productInfo, setProductInfo] = useState<ProductInfo[]>([
    {
      label: "",
      value: "",
    },
  ]);

  const [productInfo2, setProductInfo2] = useState<ProductInfo[]>([
    {
      label: "",
      value: "",
    },
  ]);

  const addProductInfo = () => {
    setProductInfo([
      ...productInfo,
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
    const updated = [...productInfo];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setProductInfo(updated);
  };

  const removeProductInfo = (index: number) => {
    setProductInfo(productInfo.filter((_, i) => i !== index));
  };

  const addProductInfo2 = () => {
    setProductInfo2([
      ...productInfo2,
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
    const updated = [...productInfo2];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setProductInfo2(updated);
  };

  const removeProductInfo2 = (index: number) => {
    setProductInfo2(productInfo2.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");

    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);

    setProductInfo([
      {
        label: "",
        value: "",
      },
    ]);

    setProductInfo2([
      {
        label: "",
        value: "",
      },
    ]);
  };

  const onSubmitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (isLoading) return;

    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);

      formData.append(
        "productInfo",
        JSON.stringify(
          productInfo.filter((item) => item.label.trim() || item.value.trim()),
        ),
      );

      formData.append(
        "productInfo2",
        JSON.stringify(
          productInfo2.filter((item) => item.label.trim() || item.value.trim()),
        ),
      );

      if (image1) {
        formData.append("image1", image1);
      }

      if (image2) {
        formData.append("image2", image2);
      }

      if (image3) {
        formData.append("image3", image3);
      }

      if (image4) {
        formData.append("image4", image4);
      }

      const response = await axios.post(
        backendUrl + "/api/products/add",
        formData,
      );

      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      }
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const ImageUpload = ({
    id,
    image,
    setImage,
    label,
  }: {
    id: string;
    image: File | null;
    setImage: React.Dispatch<React.SetStateAction<File | null>>;
    label: string;
  }) => {
    return (
      <label
        htmlFor={id}
        className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-gray-400 bg-gray-50 transition hover:border-yellow-400 hover:bg-yellow-50"
      >
        <img
          src={image ? URL.createObjectURL(image) : upload_area}
          alt=""
          className={`h-full w-full ${
            image ? "object-cover" : "object-contain p-8 opacity-60"
          }`}
        />

        {!image && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <ImagePlus size={22} className="text-gray-500" />

            <span className="text-xs font-semibold text-gray-600">{label}</span>
          </div>
        )}

        {image && (
          <div className="absolute inset-x-0 bottom-0 bg-black/70 py-2 text-center text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
            Change image
          </div>
        )}

        <input
          id={id}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </label>
    );
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="mx-auto w-full max-w-5xl space-y-6 p-4 pb-20 sm:p-6 md:p-8"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-950 md:text-3xl">
          Add New Product
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Add a new machine to your product catalog.
        </p>
      </div>

      <section className="rounded-xl border border-gray-300 bg-white shadow-sm">
        <div className="border-b border-gray-300 px-5 py-4 md:px-6">
          <h2 className="text-base font-bold text-gray-900">
            Product Information
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Enter the basic information about the product.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 md:p-6">
          {/* Product Name */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Product name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name..."
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Category
            </label>

            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category..."
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
            />
          </div>

          {/* Price */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Price
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600">
                ₹
              </span>

              <input
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price..."
                required
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-8 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
              />
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Product description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description of the product..."
              rows={4}
              required
              className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
            />

            <p className="mt-1.5 text-xs text-gray-500">
              Keep the description clear and focused on the product's main
              benefits.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-gray-300 bg-white shadow-sm">
        <div className="border-b border-gray-300 px-5 py-4 md:px-6">
          <h2 className="text-base font-bold text-gray-900">Product Images</h2>

          <p className="mt-1 text-sm text-gray-600">
            Upload clear and up to 4 images.
          </p>
        </div>

        <div className="p-5 md:p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
            <ImageUpload
              id="image1"
              image={image1}
              setImage={setImage1}
              label="Main image"
            />

            <ImageUpload
              id="image2"
              image={image2}
              setImage={setImage2}
              label="Image 2"
            />

            <ImageUpload
              id="image3"
              image={image3}
              setImage={setImage3}
              label="Image 3"
            />

            <ImageUpload
              id="image4"
              image={image4}
              setImage={setImage4}
              label="Image 4"
            />
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Recommended: high-quality JPG, PNG or WebP images.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-gray-300 bg-white shadow-sm">
        <div className="border-b border-gray-300 px-5 py-4 md:px-6">
          <h2 className="text-base font-bold text-gray-900">
            Product Specifications
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Add technical specifications customers can see on the product page.
          </p>
        </div>

        <div className="p-5 md:p-6">
          <SpecificationTable
            data={productInfo}
            onAdd={addProductInfo}
            onUpdate={updateProductInfo}
            onRemove={removeProductInfo}
          />
        </div>
      </section>

      <section className="rounded-xl border border-gray-300 bg-white shadow-sm">
        <div className="border-b border-gray-300 px-5 py-4 md:px-6">
          <h2 className="text-base font-bold text-gray-900">
            Additional Specifications
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Add any additional product details that don't fit above.
          </p>
        </div>

        <div className="p-5 md:p-6">
          <SpecificationTable
            data={productInfo2}
            onAdd={addProductInfo2}
            onUpdate={updateProductInfo2}
            onRemove={removeProductInfo2}
          />
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 border-t border-gray-300 pt-5 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          disabled={isLoading}
          onClick={resetForm}
          className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className={`flex min-w-37.5 items-center justify-center gap-2 rounded-lg px-7 py-2.5 text-sm font-bold text-gray-950 shadow-sm transition ${
            isLoading
              ? "cursor-not-allowed bg-yellow-300"
              : "bg-yellow-400 hover:bg-yellow-500"
          }`}
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-900 border-t-transparent" />
              Adding...
            </>
          ) : (
            "Add Product"
          )}
        </button>
      </div>
    </form>
  );
};
