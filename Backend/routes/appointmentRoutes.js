import express from 'express';
import Appointment from '../models/Appointment.js';

const router = express.Router();

// GET /api/v1/appointments - Fetch all appointments with populated Patient and Doctor details
router.get('/', async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId')
      .populate('doctorId');

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/appointments - Create new appointment in MongoDB
router.post('/', async (req, res, next) => {
  try {
    const { patientId, doctorId, date, timeSlot, status, reason } = req.body;

    const newAppointment = await Appointment.create({
      patientId,
      doctorId,
      date,
      timeSlot,
      status, // Mongoose schema validates ["pending", "confirmed", "cancelled"] with default "pending"
      reason  // Mongoose schema validates max 300 characters
    });

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: newAppointment
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
