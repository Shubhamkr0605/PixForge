// server/utils/uploadImage.js
import cloudinary, { initCloudinary } from "../config/cloudinary.js";

/**
 * Uploads a base64 image to Cloudinary
 * @param {string} base64Image - base64 data URI (data:image/png;base64,...)
 * @returns {string} secure Cloudinary URL
 */
export const uploadBase64Image = async (base64Image) => {
  try {
    if (!base64Image) {
      throw new Error("No image data provided");
    }

    // 🔥 Ensure Cloudinary config is applied BEFORE upload
    initCloudinary();

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "ai-images",
      resource_type: "image",
    });

    return result.secure_url;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error.message);
    throw new Error("Failed to upload image to Cloudinary");
  }
};