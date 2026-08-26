import { useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

interface DeleteProductProps {
  productId: string;
  onDeleted: (productId: string) => void;
}

export const DeleteProduct = ({
  productId,
  onDeleted,
}: DeleteProductProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const response = await axios.delete(
        `${backendUrl}/api/products/delete/${productId}`
      );

      if (response.data.success) {
        toast.success("Product deleted successfully");

        onDeleted(productId);
      } else {
        toast.error(
          response.data.message || "Failed to delete product"
        );
      }
    } catch (error) {
      console.error("Delete product error:", error);

      toast.error("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      title="Delete product"
      className="p-2 rounded-md border border-red-200
        text-red-500 hover:text-red-600
        hover:bg-red-50 transition
        disabled:opacity-50
        disabled:cursor-not-allowed"
    >
      {loading ? (
        <div className="w-4.25 h-4.25 border-2 border-red-200 border-t-red-500 rounded-full animate-spin" />
      ) : (
        <Trash2 size={17} />
      )}
    </button>
  );
};
