import { Request, Response } from "express";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, productInfo, productInfo2 } =
      req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Parse product information
    let parsedProductInfo = [];
    let parsedProductInfo2 = [];

    try {
      parsedProductInfo =
        typeof productInfo === "string"
          ? JSON.parse(productInfo)
          : productInfo || [];

      parsedProductInfo2 =
        typeof productInfo2 === "string"
          ? JSON.parse(productInfo2)
          : productInfo2 || [];
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid product information format",
      });
    }

    // Find existing category
    let categoryData = await Category.findOne({
      name: category.trim(),
    });

    // Create category if it doesn't exist
    if (!categoryData) {
      categoryData = await Category.create({
        name: category.trim(),
      });
    }

    // Get uploaded files
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    // Upload images to Cloudinary
    const imageUrls: string[] = [];

    for (let i = 1; i <= 4; i++) {
      const file = files?.[`image${i}`]?.[0];

      if (file) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });

        imageUrls.push(result.secure_url);
      }
    }

    // Create product
    const product = await Product.create({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      category: categoryData._id,

      image1: imageUrls[0] || "",
      image2: imageUrls[1] || "",
      image3: imageUrls[2] || "",
      image4: imageUrls[3] || "",

      productInfo: parsedProductInfo,
      productInfo2: parsedProductInfo2,
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate("category", "name");

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // Validate productId
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Fetch product from database
    const product = await Product.findById(productId).populate(
      "category",
      "name",
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const listProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("List products error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const updateProduct = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    // =========================
    // Validate Product ID
    // =========================
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const { name, description, price, productInfo, productInfo2 } = req.body;

    // =========================
    // Find Product
    // =========================
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // =========================
    // Update Name
    // =========================
    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Invalid product name",
        });
      }

      product.name = name.trim();
    }

    // =========================
    // Update Description
    // =========================
    if (description !== undefined) {
      if (typeof description !== "string" || !description.trim()) {
        return res.status(400).json({
          success: false,
          message: "Invalid product description",
        });
      }

      product.description = description.trim();
    }

    // =========================
    // Update Price
    // =========================
    if (price !== undefined) {
      const numericPrice = Number(price);

      if (Number.isNaN(numericPrice) || numericPrice < 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid price",
        });
      }

      product.price = numericPrice;
    }

    // =========================
    // Update Product Specifications
    // =========================
    if (productInfo !== undefined) {
      let parsedProductInfo;

      try {
        parsedProductInfo =
          typeof productInfo === "string"
            ? JSON.parse(productInfo)
            : productInfo;
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid productInfo JSON",
        });
      }

      if (!Array.isArray(parsedProductInfo)) {
        return res.status(400).json({
          success: false,
          message: "Product specifications must be an array",
        });
      }

      const isValid = parsedProductInfo.every(
        (item) =>
          item &&
          typeof item.label === "string" &&
          typeof item.value === "string",
      );

      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: "Each product specification must contain a label and value",
        });
      }

      product.productInfo = parsedProductInfo
        .map((item) => ({
          label: item.label.trim(),
          value: item.value.trim(),
        }))
        .filter((item) => item.label && item.value);
    }

    // =========================
    // Update Additional Specifications
    // =========================
    if (productInfo2 !== undefined) {
      let parsedProductInfo2;

      try {
        parsedProductInfo2 =
          typeof productInfo2 === "string"
            ? JSON.parse(productInfo2)
            : productInfo2;
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid productInfo2 JSON",
        });
      }

      if (!Array.isArray(parsedProductInfo2)) {
        return res.status(400).json({
          success: false,
          message: "Additional specifications must be an array",
        });
      }

      const isValid = parsedProductInfo2.every(
        (item) =>
          item &&
          typeof item.label === "string" &&
          typeof item.value === "string",
      );

      if (!isValid) {
        return res.status(400).json({
          success: false,
          message:
            "Each additional specification must contain a label and value",
        });
      }

      product.productInfo2 = parsedProductInfo2
        .map((item) => ({
          label: item.label.trim(),
          value: item.value.trim(),
        }))
        .filter((item) => item.label && item.value);
    }

    // =========================
    // Save Product
    // =========================
    const updatedProduct = await product.save();

    // =========================
    // Populate Category
    // =========================
    await updatedProduct.populate("category", "name");

    // =========================
    // Response
    // =========================
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update product",
    });
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};
