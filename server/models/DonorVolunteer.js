import mongoose from "mongoose";

const DonorVolunteerSchema = new mongoose.Schema(
  {
    donorNIC: {
      type: String,
      //required: true,
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
    dateOfBirth: {
      month: { type: String },
      day: { type: String},
      year: { type: String,},
    },
    mobileNumber: {
      type: String,
      //required: true,
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
