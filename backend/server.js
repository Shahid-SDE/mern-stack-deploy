import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // change to your deployed frontend URL later
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

// ✅ Connect DB once (not inside app.listen)
connectDB();

// ❌ Remove app.listen
// ✅ Export the app for Vercel
export default app;

