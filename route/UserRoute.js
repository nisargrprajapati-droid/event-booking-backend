import express from "express";
import {
  getall,
  getcurrentUser,
  image,
  loginUser,
  registerUser,
  updateuser,
  toggleBlockUser,
  deleteUser
} from "../controller/UserController.js";

import { upload } from "../Middleware/Multer.js";
import { userAuth } from "../Middleware/userAuth.js";


const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get current user
router.get("/getcurrentUser/:id", userAuth, getcurrentUser);

// Get all users
router.get("/all", getall);

// Update user + change password
router.put("/update/:id", userAuth, updateuser);

// Upload image
router.post("/image", upload.single("image"), image);


// BLOCK / UNBLOCK USER
router.patch("/block/:id", toggleBlockUser);

// DELETE USER
router.delete("/delete/:id", deleteUser);


export default router;