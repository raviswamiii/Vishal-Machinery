import mongoose, { Document, Schema } from "mongoose";

export interface IProductInfo {
  label: string;
  value: string;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: mongoose.Types.ObjectId;

  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;

  productInfo: IProductInfo[];
  productInfo2: IProductInfo[];

  createdAt: Date;
  updatedAt: Date;
}

const productInfoSchema = new Schema<IProductInfo>(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },

    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    image1: {
      type: String,
    },

    image2: {
      type: String,
    },

    image3: {
      type: String,
    },

    image4: {
      type: String,
    },

    productInfo: {
      type: [productInfoSchema],
      default: [],
    },

    productInfo2: {
      type: [productInfoSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;