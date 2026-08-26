import express from "express";
import {
  addProduct,
  getAllProducts,
  getProduct,
  listProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import upload from "../middleware/multer";

const productRouter = express.Router();

productRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct,
);
productRouter.get("/getAllProducts", getAllProducts);
productRouter.get("/getProduct/:productId", getProduct);
productRouter.get("/list", listProducts);
productRouter.put("/update/:id", updateProduct);
productRouter.delete("/delete/:id", deleteProduct);

export default productRouter;
