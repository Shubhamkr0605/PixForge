import { v2 as cloudinary } from "cloudinary";

/**
 * Initialize Cloudinary configuration
 * This ensures env variables are always applied before usage
 */
export const initCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

// Export instance
export default cloudinary;