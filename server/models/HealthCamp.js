import mongoose from "mongoose";

const CampSchema = new mongoose.Schema(
  {
    CampId: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 100,
    },
    Province: {
      type: String,
      required: true,
    },
    District: {
      type: String,
      required: true,
    },
    Town: {
      type: String,
      required: true,
    },
    MOH: {
      type: [String],
      required: true,
    },
    ContactPersons: [
      {
        cname: {
          type: String,
          required: true,
        },
        cnumber: {
          type: Number,
          required: true,
        },
      },
    ],
    Sponsor: {
      type: String,
    },
  },
  { timestamps: true }
);

const Camps = mongoose.model("Camps", CampSchema);
export default Camps;
