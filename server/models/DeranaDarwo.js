import mongoose from "mongoose";

const DeranaDaruwosSchema = new mongoose.Schema(
  {
    programId: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 100,
    },
    programName:{
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 100,
    },

    Date: {
      type: Date,
      required: true,
    },
  
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
  
    name: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String, // Assuming mobile number is stored as string
      required: true,
    },
    
  },
  { timestamps: true }
);

const DeranaDaruwos = mongoose.model("DeranaDaruwos", DeranaDaruwosSchema);
export default DeranaDaruwos;
