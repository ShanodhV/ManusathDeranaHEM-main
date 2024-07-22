import express from "express";
import {
  getCamps,
  getCamp,
  addCamp,
  deleteCamp,
  updateCamp,
  getLastCamp
} from "../controllers/camp_controller.js";

const router = express.Router();

router.get("/gets", getCamps);
router.get("/get/:id", getCamp);
router.post("/add", addCamp);
router.delete("/delete/:id", deleteCamp);
router.put("/update/:id", updateCamp);
router.get("/last", getLastCamp);

export default router;
