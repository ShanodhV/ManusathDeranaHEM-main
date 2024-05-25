
import mongoose from "mongoose";

const DonorVolunteerSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      required: true,
    },
    donorAddress: {
      type: String,
      required: true,
    },
    donorContactNumber: {
      type: String,
      required: true,
    },
    donorID: {
      type: String,
      required: true,
      unique: true,
    },
    assignedStudentID: {
      type: String,
      required: true,
    },
    programID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DonorVolunteer = mongoose.model("DonorVolunteer", DonorVolunteerSchema);
export default DonorVolunteer;
