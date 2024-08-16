import Camps from "../models/Camps.js";
import Patients from "../models/Patient.js";
import LabReport from "../models/LabReport.js";
import Volunteer from "../models/Volunteer.js";

// 1. Get Total Number of Camps
export const getTotalCamps = async (req, res) => {
  try {
    const totalCamps = await Camps.countDocuments()+1;
    res.status(200).json({ totalCamps });
  } catch (error) {
    res.status(500).json({ error: "Failed to get total camps" });
  }
};

// 2. Get Total Number of Patients
export const getTotalPatients = async (req, res) => {
  try {
    const totalPatients = await Patients.countDocuments();
    res.status(200).json({ totalPatients });
  } catch (error) {
    res.status(500).json({ error: "Failed to get total patients" });
  }
};

// 3. Get Patients Infection Status Breakdown
export const getPatientInfectionStatus = async (req, res) => {
  try {
    const totalPatients = await Patients.countDocuments();
    const infectedPatients = await LabReport.countDocuments({
      kidneySerum: { $gt: 1.3 },
    });

    const nonInfectedPatients = totalPatients - infectedPatients;

    res.status(200).json({
      totalPatients,
      infectedPatients,
      nonInfectedPatients,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get infection status" });
  }
};

// 4. Get Top Locations for Health Camps
export const getTopCampLocations = async (req, res) => {
  try {
    const topLocations = await Camps.aggregate([
      {
        $group: {
          _id: { district: "$District", town: "$Town" },
          totalCamps: { $sum: 1 },
        },
      },
      { $sort: { totalCamps: -1 } },
      { $limit: 5 }, // Get top 5 locations
    ]);

    res.status(200).json(topLocations);
  } catch (error) {
    res.status(500).json({ error: "Failed to get top locations" });
  }
};

// 1. Get Total Number of Voulenteers
export const getTotalVolunteers = async (req, res) => {
  try {
    const totalvol = await Volunteer.countDocuments();
    res.status(200).json({ totalvol });
  } catch (error) {
    res.status(500).json({ error: "Failed to get total camps" });
  }
};

export const getGenderDistribution = async (req, res) => {
  try {
    const genderDistribution = await LabReport.aggregate([
      {
        $group: {
          _id: "$gender",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(genderDistribution);
  } catch (error) {
    res.status(500).json({ error: "Failed to get gender distribution" });
  }
};
