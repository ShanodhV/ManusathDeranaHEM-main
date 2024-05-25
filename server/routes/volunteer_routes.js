import express from "express";
import {
  getVolunteers,
  getVolunteer,
  addVolunteer,
  deleteVolunteer,
  updateVolunteer,
} from "../controllers/volunteer_controller.js";

const router = express.Router();

router.get("/gets", getVolunteers);
router.get("/get/:id", getVolunteer);
router.post("/add", addVolunteer);
router.delete("/delete/:id", deleteVolunteer);
router.put("/update/:id", updateVolunteer);

export default router;
