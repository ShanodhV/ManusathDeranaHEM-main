import express from "express";
import {
  getUser,
  getDashboardStats,
  getDonors,
  getDonor,
  addDonor,
  deleteDonors,
} from "../controllers/general.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/donors", getDonors);
router.get("/donors", getDonor);
router.post("/donors", addDonor);
router.delete("/donors/:id", deleteDonors);
router.get("/dashboard", getDashboardStats);

export default router;
