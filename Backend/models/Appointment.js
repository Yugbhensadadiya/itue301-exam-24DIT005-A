import mongoose from "mongoose";

/*
  APPOINTMENT SCHEMA & MODEL
  - patientId: Mongoose ObjectId reference to "Patient" model
  - doctorId: Mongoose ObjectId reference to "Doctor" model
  - date: Required Appointment Date
  - timeSlot: Required Scheduled Time Slot
  - status: Enum restriction ["pending", "confirmed", "cancelled"], default "pending"
  - reason: String with max length constraint of 300 characters
*/
const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient"
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor"
    },
    date: {
      type: String,
      required: [true, "Date is required"]
    },
    timeSlot: {
      type: String,
      required: [true, "Time slot is required"]
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "confirmed", "cancelled"],
        message: "Invalid appointment status"
      },
      default: "pending"
    },
    reason: {
      type: String,
      maxlength: [300, "Reason cannot exceed 300 characters"]
    }
  },
  {
    timestamps: true
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
