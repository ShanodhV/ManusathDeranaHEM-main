import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: "NULL",
    },
    name: {
      type: String,
      required: true,
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
      required: true,
    },
    city: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    province: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    emergencyPhone: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Patients = mongoose.model("Patients", PatientSchema);
export default Patients;
