import mongoose from "mongoose";

/*
  DOCTOR SCHEMA & MODEL
  - name: Required String
  - email: String
  - specialisation: Required String
  - available: Boolean with default value true
*/
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Doctor name is required"]
    },
    email: {
      type: String
    },
    specialisation: {
      type: String,
      required: [true, "Specialisation is required"]
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
