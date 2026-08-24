import { Request, Response } from "express";
import Product from "../models/productModel";
import Category from "../models/categoryModel";
import cloudinary from "../config/cloudinary";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
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
      message:
        error instanceof Error ? error.message : "Internal server error",
    });
  }
};