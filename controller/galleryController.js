import Gallery from "../model/Gallery.js";

export const uploadImage = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

   const imageUrl = `http://localhost:5000/upload/${req.file.filename}`;
    const gallery = await Gallery.create({
      name,
      image: imageUrl
    });

    return res.status(201).json({
      message: "Image uploaded successfully",
      gallery
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllImages = async (req, res) => {
  try {
    const images = await Gallery.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      images
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await Gallery.findByIdAndDelete(id);

    if (!gallery) {
      return res.status(404).json({ message: "Image not found" });
    }

    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
