import mongoose from "mongoose";

const DonorVolunteerSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      //required: true,
    },
    donorAddress: {
      type: String,
      //required: true,
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
    occupation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DonorVolunteers = mongoose.model("DonorVolunteers", DonorVolunteerSchema);
export default DonorVolunteers;
