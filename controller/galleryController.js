import Gallery from "../model/Gallery.js";

/* ================= UPLOAD IMAGE ================= */

export const uploadImage = async (req, res) => {
  try {

    const { name } = req.body;

    // ✅ CHECK FILE
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required"
      });
    }

    // ✅ SAFE BASE URL (fallback if env missing)
    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;

    // ✅ FINAL IMAGE URL
    const imageUrl = `${baseUrl}/upload/${req.file.filename}`;

    const gallery = await Gallery.create({
      name,
      image: imageUrl
    });

    res.status(201).json({
      success: true,
      gallery
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
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

    res.status(200).json({
      success: true,
      images
    });

  } catch (error) {
    console.error("GET IMAGES ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* ================= DELETE IMAGE ================= */

export const deleteImage = async (req, res) => {
  try {

    const { id } = req.params;

    const image = await Gallery.findByIdAndDelete(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully"
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};