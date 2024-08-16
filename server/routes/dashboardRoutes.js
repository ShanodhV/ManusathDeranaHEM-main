import express from "express";
import {
  getTotalCamps,
  getTotalPatients,
  getPatientInfectionStatus,
  getTopCampLocations,
  getTotalVolunteers,
  getGenderDistribution,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/totalCamp", getTotalCamps);
router.get("/total", getTotalPatients);
router.get("/vol", getTotalVolunteers);
router.get("/infection-status", getPatientInfectionStatus);
router.get("/top-locations", getTopCampLocations);
router.get("/gender", getGenderDistribution);


export default router;
