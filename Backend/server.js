import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// Import DB Connection
import connectDB from "./config/db.js";

// Import Middleware
import requestLogger from "./middleware/requestLogger.js";
import errorHandler from "./middleware/errorHandler.js";

// Import Routes
import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

// Load Environment Variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// API Routes
app.use("/api/v1/doctors", doctorRoutes);
app.use("/api/v1/patients", patientRoutes);
app.use("/api/v1/appointments", appointmentRoutes);

// Sample route for testing global error handler
app.get("/api/v1/test-error", (req, res, next) => {
  const testError = new Error("This is an intentional test error to demonstrate global error handling!");
  next(testError);
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to Hospital Management REST API!");
});

// Global Error Handler (Must be mounted last)
app.use(errorHandler);

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
