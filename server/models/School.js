// import mongoose from "mongoose";

// const SchoolSchema = new mongoose.Schema(
//   {
//     schoolID: {
//       type: String,
//       required: true,
//       unique: true,
//       minlength: 2,
//       maxlength: 100,
//     },
//     schoolName: {
//       type: String,
//       required: true,
//     },
//     schoolAddress: {
//       type: String,
//       required: true,
//     },
//     location: {
//       province: {
//         type: String,
//         required: true,
//       },
//       district: {
//         type: String,
//         required: true,
//       },
//       town: {
//         type: String,
//         required: true,
//       },
//     },
//     schoolMobileNumber: {
//       type: String, // Assuming mobile number is stored as string
//       required: true,
//     },
//     principalContact: {
//       name: {
//         type: String,
//         required: true,
//       },
//       mobileNumber: {
//         type: String, // Assuming mobile number is stored as string
//         required: true,
//       },
//     },
//   },
//   { timestamps: true }
// );

// const School = mongoose.model("School", SchoolSchema);
// export default School;

import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
  {
  schoolId: { 
    type: String, 
    required: true ,
    unique: true,
    min:2,
    max:100,
  },
  schoolName: { 
    type: String, 
    required: true 
  },
  schoolAddress: { type: String, required: true },
  location: {
    town: { type: String, required: true },
    district: { type: String, required: true },
    province: { type: String, required: true }
  },
  schoolMobileNumber: { type: String, required: true },
  principalContact: { type: Object, required: true },
});

const School = mongoose.model("School", schoolSchema);

export default School;
