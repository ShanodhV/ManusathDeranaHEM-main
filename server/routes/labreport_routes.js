import express from "express";
import {
  getLabReports,
  getLabReport,
  addLabReport,
  deleteLabReport,
  updateLabReport,
} from "../controllers/labreport_controller.js";

const router = express.Router();

router.get("/gets", getLabReports);
router.get("/get/:id", getLabReport);
router.post("/add", addLabReport);
router.delete("/delete/:id", deleteLabReport);
router.put("/update/:id", updateLabReport);

export default router;
