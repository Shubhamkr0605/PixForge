// services/aiService.js
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import crypto from "crypto";

export const generateImageWithAI = async (prompt) => {
  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    throw new Error("Prompt missing or invalid");
  }

  try {
    const form = new FormData();
    form.append("prompt", prompt.trim());

    const response = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      form,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
          ...form.getHeaders(),
        },
        responseType: "arraybuffer",
        timeout: 30000,
      }
    );

    /* ==========================
       SAVE IMAGE TO DISK
    ========================== */
    const uploadsDir = "uploads";
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    const fileName = `${crypto.randomUUID()}.png`;
    const filePath = path.join(uploadsDir, fileName);

    fs.writeFileSync(filePath, response.data);

    /* ==========================
       RETURN IMAGE URL (NOT BASE64)
    ========================== */
    return `/uploads/${fileName}`;

  } catch (error) {
    if (error.response?.data) {
      console.error(
        "❌ ClipDrop API Error:",
        Buffer.from(error.response.data).toString()
      );
    } else {
      console.error("❌ ClipDrop Error:", error.message);
    }

    throw new Error("Image generation failed");
  }
};
