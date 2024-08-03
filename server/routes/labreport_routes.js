import express from "express";
import {
  getLabReports,
  getLabReport,
  addLabReport,
  deleteLabReport,
  updateLabReport,
  getLabReportsByCamp,
  
  getHighKidneySerumByDistrict,
  getHighKidneySerumByTown,

  getNextCampLocationsByPatients,
  getNextCampLocationsByCamps,
} from "../controllers/labreport_controller.js";

const router = express.Router();

router.get("/gets", getLabReports);
router.get("/get/:id", getLabReport);
router.get("/gets/:campId", getLabReportsByCamp);
router.post("/add", addLabReport);
router.delete("/delete/:id", deleteLabReport);
router.put("/update/:id", updateLabReport);

router.get("/high-kidney-serum-by-district", getHighKidneySerumByDistrict);
router.get("/high-kidney-serum-by-town", getHighKidneySerumByTown);

router.get("/next-camp-locations-by-patients", getNextCampLocationsByPatients);
router.get("/next-camp-locations-by-camps", getNextCampLocationsByCamps);

export default router;
