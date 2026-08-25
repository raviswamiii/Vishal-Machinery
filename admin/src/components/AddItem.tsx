import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import upload_area from "../assets/upload_area.png";

interface ProductInfo {
  label: string;
  value: string;
}

export const AddItem = () => {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [image4, setImage4] = useState<File | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [productInfo, setProductInfo] = useState<ProductInfo[]>([
    { label: "", value: "" },
  ]);

  const [productInfo2, setProductInfo2] = useState<ProductInfo[]>([
    { label: "", value: "" },
  ]);

  // Add row
  const addProductInfo = () => {
    setProductInfo([
      ...productInfo,
      { label: "", value: "" },
    ]);
  };

  const addProductInfo2 = () => {
    setProductInfo2([
      ...productInfo2,
      { label: "", value: "" },
    ]);
  };

  // Update row
  const updateProductInfo = (
    index: number,
    field: "label" | "value",
    value: string
  ) => {
    const updated = [...productInfo];
    updated[index][field] = value;
    setProductInfo(updated);
  };

  const updateProductInfo2 = (
    index: number,
    field: "label" | "value",
    value: string
  ) => {
    const updated = [...productInfo2];
    updated[index][field] = value;
    setProductInfo2(updated);
  };

  // Remove row
  const removeProductInfo = (index: number) => {
    setProductInfo(productInfo.filter((_, i) => i !== index));
  };

  const removeProductInfo2 = (index: number) => {
    setProductInfo2(productInfo2.filter((_, i) => i !== index));
  };

  const onSubmitHandler = async (e: {
    preventDefault: () => void;
  }) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);

      // Product information
      formData.append(
        "productInfo",
        JSON.stringify(productInfo)
      );

      formData.append(
        "productInfo2",
        JSON.stringify(productInfo2)
      );

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/products/add",
        formData
      );

      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);

        setName("");
        setDescription("");
        setCategory("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setPrice("");

        setProductInfo([
          { label: "", value: "" },
        ]);

        setProductInfo2([
          { label: "", value: "" },
        ]);
      }
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong"
        );
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:w-full items-start gap-3 p-4 sm:px-16 sm:py-8"
    >
      {/* Images */}
      <div>
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="sm:w-20 w-16 cursor-pointer"
              src={
                !image1
                  ? upload_area
                  : URL.createObjectURL(image1)
              }
              alt=""
            />

            <input
              onChange={(e) =>
                setImage1(e.target.files?.[0] || null)
              }
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label htmlFor="image2">
            <img
              className="sm:w-20 w-16 cursor-pointer"
              src={
                !image2
                  ? upload_area
                  : URL.createObjectURL(image2)
              }
              alt=""
            />

            <input
              onChange={(e) =>
                setImage2(e.target.files?.[0] || null)
              }
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label htmlFor="image3">
            <img
              className="sm:w-20 w-16 cursor-pointer"
              src={
                !image3
                  ? upload_area
                  : URL.createObjectURL(image3)
              }
              alt=""
            />

            <input
              onChange={(e) =>
                setImage3(e.target.files?.[0] || null)
              }
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label htmlFor="image4">
            <img
              className="sm:w-20 w-16 cursor-pointer"
              src={
                !image4
                  ? upload_area
                  : URL.createObjectURL(image4)
              }
              alt=""
            />

            <input
              onChange={(e) =>
                setImage4(e.target.files?.[0] || null)
              }
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2">Product name</p>

        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-125 px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2">Product description</p>

        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-125 px-3 py-2"
          placeholder="Write content here"
          required
        />
      </div>

      {/* Price */}
      <div className="w-full">
        <p className="mb-2">Price</p>

        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="w-full max-w-125 px-3 py-2 border"
          type="number"
          min="0"
          placeholder="Enter price"
          required
        />
      </div>

      {/* Category */}
      <div className="w-full">
        <p className="mb-2">Category</p>

        <input
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="w-full max-w-125 px-3 py-2 border"
          type="text"
          placeholder="Enter category"
          required
        />
      </div>

      {/* Product Info */}
      <div className="w-full max-w-125 mt-4">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold">
            Product Information
          </p>

          <button
            type="button"
            onClick={addProductInfo}
            className="bg-black text-white px-3 py-1 text-sm"
          >
            + Add
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {productInfo.map((info, index) => (
            <div
              key={index}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Label"
                value={info.label}
                onChange={(e) =>
                  updateProductInfo(
                    index,
                    "label",
                    e.target.value
                  )
                }
                className="w-[40%] px-3 py-2 border"
              />

              <input
                type="text"
                placeholder="Value"
                value={info.value}
                onChange={(e) =>
                  updateProductInfo(
                    index,
                    "value",
                    e.target.value
                  )
                }
                className="w-[50%] px-3 py-2 border"
              />

              <button
                type="button"
                onClick={() =>
                  removeProductInfo(index)
                }
                className="px-2 border text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Product Info 2 */}
      <div className="w-full max-w-125 mt-4">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold">
            Additional Product Information
          </p>

          <button
            type="button"
            onClick={addProductInfo2}
            className="bg-black text-white px-3 py-1 text-sm"
          >
            + Add
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {productInfo2.map((info, index) => (
            <div
              key={index}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Label"
                value={info.label}
                onChange={(e) =>
                  updateProductInfo2(
                    index,
                    "label",
                    e.target.value
                  )
                }
                className="w-[40%] px-3 py-2 border"
              />

              <input
                type="text"
                placeholder="Value"
                value={info.value}
                onChange={(e) =>
                  updateProductInfo2(
                    index,
                    "value",
                    e.target.value
                  )
                }
                className="w-[50%] px-3 py-2 border"
              />

              <button
                type="button"
                onClick={() =>
                  removeProductInfo2(index)
                }
                className="px-2 border text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-28 sm:py-3 py-2 sm:mt-4 mt-2 bg-black text-white"
      >
        ADD
      </button>
    </form>
  );
};