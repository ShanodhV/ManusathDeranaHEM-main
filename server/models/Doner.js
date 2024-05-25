import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema(
  {
    donorNIC: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 12,
    },
    donorName: {
      type: String,
      required: true,
    },
    donorAddress: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      month: {
        type: String,
        required: true,
      },
      day: {
        type: Number,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
    },
    mobileNumber: {
      type: String, // Assuming mobile number is stored as string
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Donor = mongoose.model("Donor", DonorSchema);
export default Donor;
