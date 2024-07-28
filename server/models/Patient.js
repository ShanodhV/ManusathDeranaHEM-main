import mongoose from "mongoose";

// Define the patient schema
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
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    NIC: {
      type: String,
      required: true,
      maxLength: 12,
      validate: {
        validator: function (v) {
          // Sri Lankan NIC format validation (old and new format)
          return /^\d{9}[vVxX]$|^\d{12}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid NIC format!`,
      },
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Ensure it's a 10-digit number
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    address: {
      type: String,
      required: true,
    },
    emergencyPhone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Ensure it's a 10-digit number
        },
        message: (props) => `${props.value} is not a valid emergency phone number!`,
      },
    },
    healthCamp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Camps",
      required: true,
    },
  },
  { timestamps: true }
);

// Create a composite unique index on NIC and healthCamp
PatientSchema.index({ NIC: 1, healthCamp: 1 }, { unique: true });

const Patients = mongoose.model("Patients", PatientSchema);
export default Patients;
