// controllers/imageController.js
import Image from "../models/image.js";
import { uploadBase64Image } from "../utils/uploadImage.js";
import axios from "axios";
import FormData from "form-data";

/* ======================================================
   🔥 GENERATE IMAGE (ClipDrop → Cloudinary → MongoDB)
====================================================== */
export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    // 1️⃣ Validate input
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    // 2️⃣ Call ClipDrop API (CORRECT WAY using FormData)
    const form = new FormData();
    form.append("prompt", prompt);

    const clipdropResponse = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      form,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
          ...form.getHeaders(),
        },
        responseType: "arraybuffer",
        timeout: 60000,
      }
    );

    // 3️⃣ Convert response buffer → base64
    const base64Image = Buffer.from(clipdropResponse.data).toString("base64");
    const base64DataUri = `data:image/png;base64,${base64Image}`;

    // 4️⃣ Upload to Cloudinary
    const imageUrl = await uploadBase64Image(base64DataUri);

    // 5️⃣ Save URL in MongoDB
    const image = await Image.create({
      prompt,
      imageUrl,
      provider: "clipdrop",
    });

    res.status(201).json({
      success: true,
      image,
    });
  } catch (error) {
    console.error(
      "❌ Generate Image Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "Image generation failed",
    });
  }
};

/* ======================================================
   📜 IMAGE HISTORY (Pagination + Search)
====================================================== */
export const getImageHistory = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const filter = req.query.prompt
      ? { prompt: { $regex: req.query.prompt, $options: "i" } }
      : {};

    const images = await Image.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("_id prompt imageUrl provider createdAt");

    const total = await Image.countDocuments(filter);

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      images,
    });
  } catch (error) {
    console.error("❌ History Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch history",
    });
  }
};
