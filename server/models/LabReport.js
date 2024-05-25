import mongoose from "mongoose";

const LabReportSchema = new mongoose.Schema(
  {
    patientNIC: {
      type: String,
      required: true,
      ref: "Patient",  // Reference to the Patient model
    },
    kidneySerum: {
      type: Number,
      required: true,
    },
    sugarLevel: {
      type: Number,
      required: true,
    },
    cholesterolLevel: {
      type: Number,
      required: true,
    },
    bloodPressure: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LabReport = mongoose.model("LabReport", LabReportSchema);
export default LabReport;
