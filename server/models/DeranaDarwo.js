import mongoose from "mongoose";

const DeranaDaruwoSchema = new mongoose.Schema(
  {
    programID: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 100,
    },
    location: {
      province: {
        type: String,
        //required: true,
      },
      district: {
        type: String,
        //required: true,
      },
      town: {
        type: String,
        //required: true,
      },
    },
    areaOfficerDetails: {
      name: {
        type: String,
        required: true,
      },
      mobileNumber: {
        type: String, // Assuming mobile number is stored as string
        required: true,
      },
    },
  },
  { timestamps: true }
);

const DeranaDaruwo = mongoose.model("DeranaDaruwo", DeranaDaruwoSchema);
export default DeranaDaruwo;
