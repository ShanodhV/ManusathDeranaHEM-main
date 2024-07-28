import express from "express";
import {
  getDeranaDaruwoPrograms,
  getDeranaDaruwoProgram,
  addDeranaDaruwo,
  deleteDeranaDaruwoProgram,
  updateDeranaDaruwoProgram,
  getLastProgram
} from "../controllers/daruwo_controller.js";

const router = express.Router();

router.get("/gets", getDeranaDaruwoPrograms);
router.get("/get/:id", getDeranaDaruwoProgram);
router.post("/add", addDeranaDaruwo);
router.delete("/delete/:id", deleteDeranaDaruwoProgram);
router.put("/update/:id", updateDeranaDaruwoProgram);
router.get("/last", getLastProgram);

export default router;
