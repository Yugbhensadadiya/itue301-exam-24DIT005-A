import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Doctor from "./models/Doctor.js";

// Load environment variables from .env file
dotenv.config();

// 5 Specified Sample Doctor Records
const sampleDoctors = [
  {
    name: "Dr. Raj Patel",
    email: "raj@hospital.com",
    specialisation: "Cardiologist",
    available: true
  },
  {
    name: "Dr. Priya Shah",
    email: "priya@hospital.com",
    specialisation: "Dermatologist",
    available: true
  },
  {
    name: "Dr. Amit Sharma",
    email: "amit@hospital.com",
    specialisation: "Pediatrician",
    available: true
  },
  {
    name: "Dr. Neha Mehta",
    email: "neha@hospital.com",
    specialisation: "Neurologist",
    available: true
  },
  {
    name: "Dr. Karan Desai",
    email: "karan@hospital.com",
    specialisation: "Orthopedic",
    available: false
  }
];

// Seeding Function
const seedDoctors = async () => {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Clear existing doctor records to prevent duplicate inserts on multiple runs
    await Doctor.deleteMany();
    console.log("Existing doctors collection cleared.");

    // 3. Insert 5 sample doctors into MongoDB
    const createdDoctors = await Doctor.insertMany(sampleDoctors);
    console.log(`✅ Successfully seeded ${createdDoctors.length} doctors into MongoDB 'Hospital' database!`);

    // 4. Disconnect cleanly from database
    await mongoose.disconnect();
    console.log("Database disconnected cleanly.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error.message);
    process.exit(1);
  }
};

// Execute seeding script
seedDoctors();
