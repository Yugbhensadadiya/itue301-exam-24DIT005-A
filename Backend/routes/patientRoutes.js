import express from 'express';
import Patient from '../models/Patient.js';

const router = express.Router();

// GET /api/v1/patients - Fetch all patients exclusively from MongoDB
router.get('/', async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/patients - Create new patient in MongoDB with schema validation
router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, bloodGroup, age } = req.body;

    const newPatient = await Patient.create({
      name,
      email,
      phone,
      bloodGroup,
      age
    });

    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: newPatient
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const firstErrorMessage = Object.values(error.errors)[0]?.message || "Validation Error";
      return res.status(400).json({
        success: false,
        message: firstErrorMessage
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    next(error);
  }
});

export default router;
