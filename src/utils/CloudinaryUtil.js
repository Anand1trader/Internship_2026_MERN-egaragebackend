const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// 🔥 config ek baar hi karo (best practice)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (path) => {
  try {
    const res = await cloudinary.uploader.upload(path, {
      folder: "egarage",
    });
    return res;
  } catch (error) {
    throw error;
  }
};

// ✅ direct function export
module.exports = uploadToCloudinary;