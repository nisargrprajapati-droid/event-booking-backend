import Admin from "../model/AdminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";
import Gallery from "../model/Gallery.js";


export const getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const galleryCount = await Gallery.countDocuments();

    res.json({
      success: true,
      stats: {
        users: userCount,
        gallery: galleryCount
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check admin
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // create token
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(200).json({
      success: true,
      token,
      admin,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

