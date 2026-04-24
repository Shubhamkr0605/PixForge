// server/models/image.js
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    // 🔹 User / AI prompt
    prompt: {
      type: String,
      required: true,
      trim: true,
      index: true, // ✅ enables fast search with regex
    },

    // 🔹 Public image URL (Cloudinary / S3 / local)
    imageUrl: {
      type: String,
      required: true,
    },

    // 🔹 Image provider (future-proof)
    provider: {
      type: String,
      enum: ["clipdrop", "openai", "stability", "midjourney"],
      default: "clipdrop",
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

// 🚀 Optional: compound index for faster history queries
imageSchema.index({ createdAt: -1 });

export default mongoose.model("Image", imageSchema);
