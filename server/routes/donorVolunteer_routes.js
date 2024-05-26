import express from "express";
import {
  getDonorVolunteers,
  getDonorVolunteer,
  addDonorVolunteer,
  deleteDonorVolunteer,
  updateDonorVolunteer,
} from "../controllers/donorVolunteer_controller.js";

const router = express.Router();

router.get("/gets", getDonorVolunteers);
router.get("/get/:id", getDonorVolunteer);
router.post("/add", addDonorVolunteer);
router.delete("/delete/:id", deleteDonorVolunteer);
router.put("/update/:id", updateDonorVolunteer);

export default router;
