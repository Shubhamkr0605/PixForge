import express from "express";
import {
  generateImage,
  getImageHistory,
} from "../controllers/imageController.js";

const router = express.Router();

// ✅ NO AUTH
router.post("/generate", generateImage);
router.get("/history", getImageHistory);

export default router;