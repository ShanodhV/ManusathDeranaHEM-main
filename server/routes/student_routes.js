import express from "express";
import {
  getStudents,
  getStudent,
  addStudent,
  deleteStudent,
  updateStudents,
  GetStudentsByDeranaDaruwoProgram,
  getLastStudent,
} from "../controllers/student_controller.js";

const router = express.Router();

router.get("/gets", getStudents);
router.get("/get/:id", getStudent);
router.post("/add", addStudent);
router.delete("/delete/:id", deleteStudent);
router.put("/update/:id", updateStudents);
router.get("/program/:programId", GetStudentsByDeranaDaruwoProgram);
router.get("/last", getLastStudent);



export default router;
