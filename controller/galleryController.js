import Gallery from "../model/Gallery.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/* ================= ADD IMAGE ================= */

export const addImage = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required"
      });
    }

    // CLOUDINARY BUFFER UPLOAD
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          { folder: "gallery" },
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

    // SAVE IMAGE
    const image = await Gallery.create({
      image: result.secure_url
    });

    res.status(201).json({
      success: true,
      data: image
    });

  } catch (error) {

    console.log("Gallery Error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ================= GET ALL IMAGES ================= */

export const getAllImages = async (req, res) => {
  try {

    const images = await Gallery.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: images
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ================= DELETE IMAGE ================= */

export const deleteImage = async (req, res) => {
  try {

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Image deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};