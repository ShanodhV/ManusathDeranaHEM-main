import express from "express";
import {
  getSchools,
  getSchool,
  addSchool,
  deleteSchool,
  updateSchool,
  getLastSchool,
  getFilteredSchools

} from "../controllers/school_controller.js";

const router = express.Router();

router.get("/", getSchools); // Adjusted route to match root for schools
router.get("/last", getLastSchool); // Adjusted route for last school
router.get("/:id", getSchool);
router.post("/", addSchool);
router.delete("/:id", deleteSchool);
router.put("/:id", updateSchool);

router.get("/filtered", getFilteredSchools);

export default router;
