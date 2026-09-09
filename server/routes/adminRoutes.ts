import express from "express";
import {
  getAllUsers,
  deleteUser,
} from "../controllers/adminController.js";

const userRouter = express.Router();

// Get all users
userRouter.get("/all", getAllUsers);

// Delete user
userRouter.delete("/:id", deleteUser);

export default userRouter;
