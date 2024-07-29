import express from "express";
import {
  getSchools,
  getSchool,
  addSchool,
  deleteSchool,
  updateSchool,
  getLastSchool
} from "../controllers/school_controller.js";

const router = express.Router();

router.get("/gets", getSchools);
router.get("/get/:id", getSchool);
router.get("/getLast", getLastSchool); // Added route to get the last school
router.post("/add", addSchool);
router.delete("/delete/:id", deleteSchool);
router.put("/update/:id", updateSchool);

export default router;
