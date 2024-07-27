import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: "NULL",
    },
    name: {
      type: String,
      min: 2,
      max: 100,
    },
    NIC: {
      type: String,
      required: true,
      max: 12,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    emergencyPhone: {
      type: Number,
    },
    healthCamp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Camps",
      required: true,
    },
  },
  { timestamps: true }
);

const Patients = mongoose.model("Patients", PatientSchema);
export default Patients;
