import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

// Middleware
app.use(cors()); // temporarily allow all origins
app.use(express.json());
app.use("/api/tasks", taskRoutes);

// Connect to MongoDB
await connectDB(); // ensures DB is ready before handling requests

// Export app for Vercel serverless
export default app;
