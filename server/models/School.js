import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema(
  {
    schoolId: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 100,
    },
    schoolName: {
      type: String,
      required: true,
    },
    schoolAddress: {
      type: String,
      required: true,
    },
    location: {
      province: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      town: {
        type: String,
        required: true,
      },
    },
    schoolMobileNumber: {
      type: String,
      required: true,
    },
    principalContact: [
      {
        pname: {
          type: String,
          required: true,
        },
        pnumber: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const School = mongoose.model("School", SchoolSchema);
export default School;
