import mongoose from "mongoose";

const CampSchema = new mongoose.Schema(
  {
    campId: {
      type: String,
      unique: true,
    },
    province: {
      type: String,
    },
    district: {
      type: String,

    },
    town: {
      type: String,

    },
    mohFields: {
      type: [String],

    },
    contactPersons: [
      {
        name: {
          type: String,

        },
        mobileNumber: {
          type: Number,

        },
      },
    ],
    sponsors: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Camps = mongoose.model("Camps", CampSchema);
export default Camps;
