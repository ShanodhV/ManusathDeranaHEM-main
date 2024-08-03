import mongoose from "mongoose";

const LabReportSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Patients",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
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
