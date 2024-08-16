// models/Donor.js
import mongoose from 'mongoose';

const DonorSchema = new mongoose.Schema(
  {
    donorId: {
      type: String,
      required: true,
      unique: true,
    },
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
      type: Date,
      //required: true,
    },
    mobileNumber: {
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

const Donors = mongoose.model('Donors', DonorSchema);
export default Donors;
