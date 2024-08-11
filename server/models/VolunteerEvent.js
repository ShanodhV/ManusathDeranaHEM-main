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
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    location: {
      province: { type: String, },
      district: { type: String, },
      town: { type: String, },
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
