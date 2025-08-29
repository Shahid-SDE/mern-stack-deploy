import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();

// ✅ Enable CORS
app.use(cors({
  origin: "http://localhost:5173", // allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

// Connect DB and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
