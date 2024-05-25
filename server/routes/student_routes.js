import express from "express";
import {
  getStudents,
  getStudent,
  addStudent,
  deleteStudent,
  updateStudent,
} from "../controllers/student_controller.js";

const router = express.Router();

router.get("/gets", getStudents);
router.get("/get/:id", getStudent);
router.post("/add", addStudent);
router.delete("/delete/:id", deleteStudent);
router.put("/update/:id", updateStudent);

export default router;
