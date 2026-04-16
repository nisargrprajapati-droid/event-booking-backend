import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ DB Connected Successfully");
  } catch (error) {
    console.log("❌ DB Connection Error:", error.message);
    process.exit(1);
  }
};