import CategoryModel from "../model/CategoryModel.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// ================= CREATE CATEGORY =================
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // ✅ Upload image to Cloudinary using buffer
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "categories" },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    // ✅ Save category
    const category = await CategoryModel.create({
      name,
      image: result.secure_url,
    });

    res.status(201).json({
      success: true,
      data: category,
    });

  } catch (error) {
    console.log("CATEGORY ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET CATEGORY =================
export const getCategory = async (req, res) => {
  try {
    const data = await CategoryModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE CATEGORY =================
export const deleteCategory = async (req, res) => {
  try {
    await CategoryModel.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Category deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};