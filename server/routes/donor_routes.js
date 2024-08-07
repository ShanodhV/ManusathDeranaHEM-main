import express from 'express';
import {
  getDonors,
  getDonor,
  addDonor,
  deleteDonor,
  updateDonor,
} from '../controllers/donor_controller.js';

const router = express.Router();

// Define routes with consistent paths
router.get("/", getDonors);
router.get("/:id", getDonor);
router.post("/", addDonor); // Correct route for adding donor
router.delete("/:id", deleteDonor);
router.put("/:id", updateDonor);

export default router;
