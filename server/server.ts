import "dotenv/config";
import express from "express";
import databaseConnection from "./config/mongodb.ts";
import userRouter from "./routes/userRoutes.ts";
import cors from "cors";

databaseConnection();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on Port: ${PORT}`);
});
