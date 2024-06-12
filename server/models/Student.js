import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    studentAddress: {
      type: String,
      required: true,
    },
    studentID: {
      type: String,
      required: true,
      unique: true,
    },
    programID: {
      type: String,
      required: true,
    },
      parentName: {
        type: String,
        required: true,
      },
      parentContactNumber: {
        type: String,
        required: true,
      },

      bankName: {
        type: String,
        required: true,
      },
      accountNumber: {
        type: String,
        required: true,
      },
    
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);
export default Student;
