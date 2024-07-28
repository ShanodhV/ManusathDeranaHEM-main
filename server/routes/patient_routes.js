import express from "express";
import {
  getPatients,
  getPatient,
  addPatient,
  deletePatient,
  updatePatient,
  getLastPatient,
  getPatientsByCamp,
} from "../controllers/patient_controller.js";

const router = express.Router();

router.get("/gets", getPatients);
router.get("/get/:id", getPatient);
router.post("/add", addPatient);
router.delete("/delete/:id", deletePatient);
router.put("/update/:id", updatePatient);
router.get("/last", getLastPatient);
router.get("/camp/:campId", getPatientsByCamp);

export default router;
