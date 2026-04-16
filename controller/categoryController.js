import Category from "../model/CategoryModel.js";

// CREATE CATEGORY
export const createCategory = async (req, res) => {
  try {
    const image = req.file ? `http://localhost:5000/upload/${req.file.filename}` : "";

    const category = new Category({
      name: req.body.name,
      image
    });

    await category.save();

    res.status(201).json({ success: true, message: "Category created", data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//getCategory
export const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      data: categories   // ✅ IMPORTANT
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
};