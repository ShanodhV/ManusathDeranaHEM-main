import mongoose from 'mongoose';

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
    Date: {
      type: Date,
      required: true,
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

const Donor = mongoose.model('Donor', DonorSchema);
export default Donor;
