import express from 'express';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// GET /api/v1/doctors - Fetch all doctors exclusively from MongoDB
router.get('/', async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/doctors - Create new doctor in MongoDB with schema validation
router.post('/', async (req, res, next) => {
  try {
    const { name, email, specialisation, available } = req.body;

    const newDoctor = await Doctor.create({
      name,
      email,
      specialisation,
      available: available !== undefined ? available : true
    });

    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      data: newDoctor
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const firstErrorMessage = Object.values(error.errors)[0]?.message || "Validation Error";
      return res.status(400).json({
        success: false,
        message: firstErrorMessage
      });
    }
    next(error);
  }
});

export default router;
