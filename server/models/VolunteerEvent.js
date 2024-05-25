import mongoose from "mongoose";

const VolunteerEventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventCategory: {
      type: String,
      required: true,
    },
    eventDate: {
      date: { type: Number, required: true },
      month: { type: Number, required: true },
      year: { type: Number, required: true },
    },
    venue: {
      type: String,
      required: true,
    },
    location: {
      province: { type: String, required: true },
      district: { type: String, required: true },
      town: { type: String, required: true },
    },
    relatedOccupations: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const VolunteerEvent = mongoose.model("VolunteerEvent", VolunteerEventSchema);
export default VolunteerEvent;
