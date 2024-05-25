import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema(
  {
    volunteerNIC: {
      type: String,
      required: true,
      unique: true,
    },
    volunteerName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      date: { type: Number, required: true },
      month: { type: Number, required: true },
      year: { type: Number, required: true },
    },
    contactNumber: {
      type: String,
      required: true,
    },
    volunteerAddress: {
      type: String,
      required: true,
    },
    location: {
      province: { type: String, required: true },
      district: { type: String, required: true },
      town: { type: String, required: true },
    },
    occupation: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Volunteer = mongoose.model("Volunteer", VolunteerSchema);
export default Volunteer;
