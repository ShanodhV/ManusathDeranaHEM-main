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
    // programID: {
    //   type: String,
    //   required: true,
    // },
    parentName: {
      type: String,
      required: true,
    },
    parentContactDetails: {
      type: String,
      required: true,
    },

    bankAccountDetails: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },

    deranaDaruwProgram: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeranaDaruwos",
      required: true,
    },
    
  },
  { timestamps: true }
);

StudentSchema.index({  deranaDaruwProgram: 1 }, { unique: true });

const Student = mongoose.model("Student", StudentSchema);
export default Student;
