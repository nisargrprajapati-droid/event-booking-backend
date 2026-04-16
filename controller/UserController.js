
import bcrypt from "bcryptjs";
import User from "../model/UserModel.js";
import Notification from "../model/NotificationModel.js";


export const registerUser = async (req, res) => {
  console.log("REGISTER API HIT");
  console.log(req.body);
  try {
    const { name, email, gender, phone, password } = req.body;

    // 1. Validation
    if (!name || !email || !password || !gender || !phone) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }


    // 2. Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user
    const user = await User.create({
      name,
      email,
      gender,
      phone,
      password: hashedPassword,
    });
    await Notification.create({
      title: "New User Registered",
      type: "user"
    });
    // 5. Response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // 2️⃣ Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // 🚫 BLOCKED USER CHECK
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account is blocked by admin"
      });
    }
    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // 4️⃣ Generate JWT token
    const token = user.jsonwebtoken();

    if (!token) {
      return res.status(500).json({
        message: "Token generation failed"
      });
    }

    // 5️⃣ Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        phone: user.phone
      }
    });

  } catch (error) {

    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};
export const getcurrentUser = async (req, res) => {
  try {

    const { id } = req.params;

    const user = await User.findById(id)
    return res.json({
      success: true,
      message: "userdata fetch successfully",
      user
    });
  } catch (error) {
    return res.json({
      success: 0,
      message: error.message,
    });
  }
};
export const getall = async (req, res) => {
  try {

    // get all users from database
    const users = await User.find({}).sort({ createdAt: -1 });


    // check if users exist
    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      totalUsers: users.length,
      users
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
export const updateuser = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      name,
      email,
      gender,
      mobile_number,
      currentPassword,
      newPassword
    } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found"
      });
    }

    // Update profile
    user.name = name || user.name;
    user.email = email || user.email;
    user.gender = gender || user.gender;
    user.mobile_number = mobile_number || user.mobile_number;

    // Change password
    if (
      currentPassword &&
      newPassword &&
      currentPassword.trim() !== "" &&
      newPassword.trim() !== ""
    ) {

      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Current password incorrect"
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user
    });

  } catch (error) {

    console.log("BACKEND ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
};


export const image = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = `http://localhost:5000/upload/${req.file.filename}`;
    const user = await User.create({
      name,
      image: imageUrl
    });

    return res.status(201).json({
      message: "Image uploaded successfully",
      user
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const toggleBlockUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    user.isBlocked = !user.isBlocked;

    await user.save();

    res.json({
      success: true,
      message: "User status updated"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error updating user"
    });

  }

};

export const deleteUser = async (req, res) => {

  try {

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "User deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error deleting user"
    });

  }

};