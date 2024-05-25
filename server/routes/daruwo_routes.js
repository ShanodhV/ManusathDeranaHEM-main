import express from "express";
import {
  getDeranaDaruwoPrograms,
  getDeranaDaruwoProgram,
  addDeranaDaruwo,
  deleteDeranaDaruwoProgram,
  updateDeranaDaruwoProgram,
} from "../controllers/derana_daruwo_controller.js";

const router = express.Router();

router.get("/gets", getDeranaDaruwoPrograms);
router.get("/get/:id", getDeranaDaruwoProgram);
router.post("/add", addDeranaDaruwo);
router.delete("/delete/:id", deleteDeranaDaruwoProgram);
router.put("/update/:id", updateDeranaDaruwoProgram);

export default router;
