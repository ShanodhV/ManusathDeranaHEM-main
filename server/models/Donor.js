import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: "NULL",
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Donors = mongoose.model("Donors", DonorSchema);
export default Donors;
