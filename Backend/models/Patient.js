import mongoose from "mongoose";

/*
  PATIENT SCHEMA & MODEL
  - name: Required String
  - email: Required String with Unique Constraint
  - phone: Contact Phone String
  - bloodGroup: String restricted to valid Blood Group Enum values
  - age: Patient Age Number
*/
const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Patient name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true
    },
    phone: {
      type: String
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "Invalid blood group"
      }
    },
    age: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
