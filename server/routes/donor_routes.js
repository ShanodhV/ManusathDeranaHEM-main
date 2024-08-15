import express from 'express';
import {
  getDonors,
  getDonor,
  addDonor,
  deleteDonor,
  updateDonor,
  getLastDonor,  // Ensure this import is correct
} from '../controllers/donor_controller.js';

const router = express.Router();

router.get("/gets", getDonors);
router.get("/get/:id", getDonor);
router.post("/add", addDonor);
router.delete("/delete/:id", deleteDonor);
router.put("/update/:id", updateDonor);
router.get("/last", getLastDonor); // Add this line carefully

export default router;
