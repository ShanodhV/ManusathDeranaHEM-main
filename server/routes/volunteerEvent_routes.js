import express from "express";
import {
  getVolunteerEvents,
  getVolunteerEvent,
  addVolunteerEvent,
  deleteVolunteerEvent,
  updateVolunteerEvent,
} from "../controllers/volunteerEvent_controller.js";

const router = express.Router();

router.get("/gets", getVolunteerEvents);
router.get("/get/:id", getVolunteerEvent);
router.post("/add", addVolunteerEvent);
router.delete("/delete/:id", deleteVolunteerEvent);
router.put("/update/:id", updateVolunteerEvent);

export default router;
