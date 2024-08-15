import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema(
  {
    volunteerNIC: {
      type: String,
      //required: true,
      unique: true, 
    },
    volunteerName: {
      type: String,
      //required: true,
    },
    dateOfBirth: {
      type: String,
    },
    contactNumber: {
      type: String,
      //required: true,
    },
    volunteerAddress: {
      type: String,
     // required: true,
    },
    location: {
      province: { type: String, },
      district: { type: String, },
      town: { type: String, },
    },
    occupation: {
      type: String,
      //required: true,
    },
    status: {
      type: String,
      //required: true,
    },
  },
  { timestamps: true }
);

const Volunteer = mongoose.model("Volunteer", VolunteerSchema);
export default Volunteer;
