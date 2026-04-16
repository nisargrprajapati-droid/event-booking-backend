import express from "express";
import { uploadImage, getAllImages, deleteImage } from "../controller/galleryController.js";
import { upload } from "../Middleware/Multer.js";

const router = express.Router();

router.post("/upload", upload.single('image'), uploadImage);
router.get("/all", getAllImages);
router.delete("/:id", deleteImage);

export default router;
