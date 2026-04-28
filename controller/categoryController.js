import Category from "../model/CategoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Name and image required"
      });
    }

    const image = `${process.env.BASE_URL}/upload/${req.file.filename}`;

    const category = await Category.create({
      name,
      image
    });

    res.status(201).json({
      success: true,
      data: category
    });

  } catch (error) {
    console.log("CATEGORY ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      data: categories
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Category deleted"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};