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
router.get("/gets", getDonors);
router.get("/get/:id", getDonor);
router.post("/add", addDonor); // Correct route for adding donor
router.delete("/delete/:id", deleteDonor);
router.put("/update/:id", updateDonor);

export default router;
