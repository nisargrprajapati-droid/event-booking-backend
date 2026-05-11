import express from "express";
import { addImage, getAllImages, deleteImage } from "../controller/galleryController.js";
import { upload } from "../Middleware/Multer.js";

const router = express.Router();

router.post("/add", upload.single("image"), addImage);
router.get("/all", getAllImages);
router.delete("/:id", deleteImage);

export default router;