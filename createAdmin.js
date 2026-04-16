import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./model/AdminModel.js";
import { dbConnection } from "./dbConnection.js";

dotenv.config({ path: "./config/config.env" });

const createAdmin = async () => {
  try {

    await dbConnection();

    const hashedPassword = await bcrypt.hash("123456", 10);

    await Admin.create({
      name: "Nisarg",
      email: "admin@gmail.com",
      password: hashedPassword
    });

    console.log("✅ Admin Created Successfully");

    process.exit();

  } catch (error) {
    console.log("❌ Error:", error);
  }
};

createAdmin();