import "dotenv/config";
import express from "express";
import databaseConnection from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cors from "cors";

databaseConnection();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(",");

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  }),
);

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully 🚀",
  });
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Something went wrong on the server",
    });
  },
);

app.listen(PORT, () => {
  console.log(`🚀 Server running on Port: ${PORT}`);
});
