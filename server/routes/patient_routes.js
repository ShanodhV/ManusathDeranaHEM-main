import express from "express";
import {
  getPatients,
  getPatient,
  addPatient,
  deletePatient,
  updatePatient,
  getLastPatient,
} from "../controllers/patient_controller.js";

const router = express.Router();

router.get("/gets", getPatients);
router.get("/get/:id", getPatient);
router.post("/add", addPatient);
router.delete("/delete/:id", deletePatient);
router.put("/update/:id", updatePatient);
router.get("/last", getLastPatient);

export default router;
