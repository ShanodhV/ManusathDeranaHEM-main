import express from "express";
import {
  getUser,
  getDashboardStats,
  getPatients,
  getPatient,
  addPatient,
  deletePatient,
} from "../controllers/general.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/donors", getPatients);
router.get("/donors", getPatient);
router.post("/donors", addPatient);
router.delete("/donors/:id", deletePatient);
router.get("/dashboard", getDashboardStats);

export default router;
