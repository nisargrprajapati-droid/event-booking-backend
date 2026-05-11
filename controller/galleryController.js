import GalleryModel from "../model/Gallery.js";
import cloudinary from "../config/cloudinary.js";

// ================= ADD IMAGE =================
export const addImage = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      return res.json({
        success: false,
        message: "Image required"
      });
    }

    // 🔥 Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const image = new GalleryModel({
      name,
      image: result.secure_url, // ✅ important
    });

    await image.save();

    res.json({
      success: true,
      image
    });

  } catch (error) {
    console.log("Gallery Error:", error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

export const getAllImages = async (req, res) => {
  try {

    const images = await GalleryModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      images
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};

export const deleteImage = async (req, res) => {
  try {

    await GalleryModel.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Image deleted"
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};