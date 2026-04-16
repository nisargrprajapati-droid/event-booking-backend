import express from "express";
import { createCategory, getCategory, deleteCategory } from "../controller/categoryController.js";
import { upload } from "../Middleware/Multer.js";

const router = express.Router();

router.post("/", upload.single("image"), createCategory);
router.get("/", getCategory);
router.delete("/:id", deleteCategory);

export default router;
