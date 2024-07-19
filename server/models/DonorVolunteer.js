import mongoose from "mongoose";

const DonorVolunteersSchema = new mongoose.Schema(
  {
    donorID: {
      type: String,
      required: true,
      unique: true,
    },
    donorName: {
      type: String,
      //required: true,
    },
    donorAddress: {
      type: String,
      //required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    
    studentID: {
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

const DonorVolunteers = mongoose.model("DonorVolunteers", DonorVolunteersSchema);
export default DonorVolunteers;
