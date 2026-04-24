// 🔥 Load env FIRST
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// ✅ Routes
import authRoutes from "./routes/authRoutes.js";
import imageRoutes from "./routes/imageRoutes.js"; // 🔥 ADD THIS

const app = express();
const PORT = process.env.PORT || 4000;

/* =======================
   Middleware
======================= */
app.use(cors());
app.use(express.json());

/* =======================
   MongoDB Connection
======================= */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => {
    console.error("❌ DB Error:", err.message);
    process.exit(1);
  });

/* =======================
   Routes
======================= */

// 🔐 Auth
app.use("/api/auth", authRoutes);

// 🎨 Image (THIS WAS MISSING ❗)
app.use("/api/image", imageRoutes);

/* =======================
   Health Check
======================= */
app.get("/", (req, res) => {
  res.send("🚀 Server running");
});

/* =======================
   Start Server
======================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});