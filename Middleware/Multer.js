import multer from "multer";

// ✅ Store file in memory for Cloudinary
const storage = multer.memoryStorage();

export const upload = multer({ storage });