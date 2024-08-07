import Camps from "../models/Camps.js";
import Patients from "../models/Patient.js";
import LabReport from "../models/LabReport.js";

// Add Health Camp
export const addCamp = async (req, res) => {
  try {
    const { CampId, Province, District, Town, Date, MOH, ContactPersons, Sponsors } = req.body;

    const newHealthCamp = new Camps({
      CampId,
      Province,
      District,
      Town,
      Date,
      MOH,
      ContactPersons,
      Sponsors,
    });

    const savedHealthCamp = await newHealthCamp.save();
    res.status(201).json(savedHealthCamp);
  } catch (error) {
    console.error("Error adding new health camp:", error);
    res.status(500).json({ error: "Failed to add new health camp" });
  }
};

// Get All Health Camps
export const getCamps = async (req, res) => {
  try {
    const healthCamps = await Camps.find();
    res.status(200).json(healthCamps);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Health Camp by ID
export const getCamp = async (req, res) => {
  try {
    const { id } = req.params;
    const healthCamp = await Camps.findById(id);
    res.status(200).json(healthCamp);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete Health Camp
export const deleteCamp = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedHealthCamp = await Camps.findByIdAndDelete(id);
    if (!deletedHealthCamp) {
      return res.status(404).json({ error: "Health Camp not found" });
    }
    res.json({ message: "Health Camp deleted successfully" });
  } catch (error) {
    console.error("Error deleting health camp:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Health Camp
export const updateCamp = async (req, res) => {
  try {
    const healthCampId = req.params.id;
    const updatedHealthCampData = req.body;

    const updatedHealthCamp = await Camps.findByIdAndUpdate(
      healthCampId,
      updatedHealthCampData,
      { new: true }
    );

    res.json(updatedHealthCamp);
  } catch (error) {
    console.error("Error updating health camp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Last Health Camp
export const getLastCamp = async (req, res) => {
  try {
    const lastCamp = await Camps.findOne().sort({ createdAt: -1 });
    if (!lastCamp) {
      return res.status(404).json({ message: "No health camps found" });
    }
    res.status(200).json(lastCamp);
  } catch (error) {
    console.error("Error fetching last health camp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Filter


// Get camps with filter options
export const getFilteredCamps = async (req, res) => {
  try {
    const { province, district, town } = req.query;

    let filter = {};
    if (province) filter.Province = province;
    if (district) filter.District = district;
    if (town) filter.Town = town;

    const camps = await Camps.find(filter);
    res.status(200).json(camps);
  } catch (error) {
    console.error("Error fetching filtered camps:", error);
    res.status(500).json({ message: "Failed to fetch filtered camps" });
  }
};

//***************************************************
import mongoose from "mongoose";

export const getPatientsByCampdv = async (req, res) => {
  try {
    const { campIds, infected } = req.query;
    console.log("Received query parameters:", req.query);

    // Check if campIds parameter is present
    if (!campIds) {
      console.error("Missing campIds parameter.");
      return res.status(400).json({ message: "campIds parameter is required" });
    }

    // Ensure campIds are valid MongoDB ObjectIds
    const campObjectIds = campIds.split(",").map((id) => {
      if (mongoose.Types.ObjectId.isValid(id)) {
        return mongoose.Types.ObjectId(id);
      } else {
        console.error(`Invalid campId: ${id}`);
        return null;
      }
    }).filter(id => id !== null);

    if (campObjectIds.length === 0) {
      console.error("No valid campIds provided.");
      return res.status(400).json({ message: "No valid campIds provided." });
    }

    // Fetch patients based on campIds
    const patients = await Patients.find({
      healthCamp: { $in: campObjectIds },
    }).lean();

    if (!patients.length) {
      console.warn("No patients found for the specified camps.");
      return res
        .status(404)
        .json({ message: "No patients found for the specified camps." });
    }

    // Fetch lab reports for the patients
    const patientIds = patients.map((patient) =>
      mongoose.Types.ObjectId(patient._id)
    );
    const labReports = await LabReport.find({
      patient: { $in: patientIds },
    }).lean();

    // Determine infection status based on lab reports
    const patientsWithInfectionStatus = patients.map((patient) => {
      const labReport = labReports.find((report) =>
        report.patient.equals(patient._id)
      );
      return {
        ...patient,
        infected: labReport ? labReport.kidneySerum > 1.3 : false,
      };
    });

    // Filter patients by infection status if provided
    const filteredPatients =
      infected !== undefined && infected.trim() !== ""
        ? patientsWithInfectionStatus.filter(
            (patient) => patient.infected === (infected === "true")
          )
        : patientsWithInfectionStatus;

    res.status(200).json(filteredPatients);
  } catch (error) {
    console.error("Error fetching patients by camp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
