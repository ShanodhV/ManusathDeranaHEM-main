import LabReport from "../models/LabReport.js";
import Patients from "../models/Patient.js";
import Camps from "../models/Camps.js";

// Add a new lab report
export const addLabReport = async (req, res) => {
  try {
    const {
      patient,
      gender,
      kidneySerum,
      sugarLevel,
      cholesterolLevel,
      bloodPressure,
      camp,
    } = req.body;

    // Check if the patient exists
    const existingPatient = await Patients.findById(patient);
    if (!existingPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Check for existing lab report for the same patient in the same camp
    const existingReport = await LabReport.findOne({ patient, camp });
    if (existingReport) {
      return res.status(400).json({ error: "Lab report for this patient already exists in this camp" });
    }

    // Create a new lab report instance
    const newLabReport = new LabReport({
      patient,
      gender,
      kidneySerum,
      sugarLevel,
      cholesterolLevel,
      bloodPressure,
      camp,
    });

    // Save the lab report to the database
    const savedLabReport = await newLabReport.save();

    res.status(201).json(savedLabReport); // Respond with the saved lab report
  } catch (error) {
    console.error("Error adding new lab report:", error);
    res.status(500).json({ error: "Failed to add new lab report", details: error });
  }
};

// Get all lab reports
export const getLabReports = async (req, res) => {
  try {
    const labReports = await LabReport.find().populate("patient", "name NIC"); // Fetching all lab reports
    res.status(200).json(labReports);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single lab report by ID
export const getLabReport = async (req, res) => {
  try {
    const { id } = req.params;
    const labReport = await LabReport.findById(id).populate("patient", "name NIC");
    if (!labReport) {
      return res.status(404).json({ message: "Lab report not found" });
    }
    res.status(200).json(labReport);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a lab report by ID
export const deleteLabReport = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLabReport = await LabReport.findByIdAndDelete(id); // Deleting lab report by ID
    if (!deletedLabReport) {
      return res.status(404).json({ error: "Lab report not found" });
    }
    res.json({ message: "Lab report deleted successfully" });
  } catch (error) {
    console.error("Error deleting lab report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a lab report by ID
export const updateLabReport = async (req, res) => {
  try {
    const labReportId = req.params.id;
    const updatedLabReportData = req.body; // Updated lab report data from the request body

    // Find the lab report by ID and update its information
    const updatedLabReport = await LabReport.findByIdAndUpdate(
      labReportId,
      updatedLabReportData,
      { new: true }
    );

    if (!updatedLabReport) {
      return res.status(404).json({ message: "Lab report not found" });
    }

    res.json(updatedLabReport); // Send back the updated lab report object
  } catch (error) {
    console.error("Error updating lab report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all lab reports by camp ID
export const getLabReportsByCamp = async (req, res) => {
  const { campId } = req.params;
  try {
    // Fetch all lab reports for the specified camp
    const labReports = await LabReport.find({ camp: campId });

    if (!labReports) {
      return res.status(404).json({ message: "Lab reports not found" });
    }

    // Get a list of patient IDs from the lab reports
    const patientIds = labReports.map(report => report.patient);

    // Fetch the patients related to those lab reports
    const patients = await Patients.find({ _id: { $in: patientIds } });

    // Create a map of patient IDs to patient details
    const patientMap = patients.reduce((map, patient) => {
      map[patient._id] = patient;
      return map;
    }, {});

    // Merge patient details into lab reports
    const labReportsWithPatientDetails = labReports.map(report => {
      const patientDetails = patientMap[report.patient];
      return {
        ...report._doc,
        patientName: patientDetails ? patientDetails.name : null,
        NIC: patientDetails ? patientDetails.NIC : null,
      };
    });

    res.status(200).json(labReportsWithPatientDetails);
  } catch (error) {
    console.error("Error fetching lab reports by camp:", error);
    res.status(500).json({ error: "Failed to fetch lab reports", details: error });
  }
};

// ***************************
// Fetch counts of patients with high kidney serum by district
export const getHighKidneySerumByDistrict = async (req, res) => {
  try {
    const results = await LabReport.aggregate([
      { $match: { kidneySerum: { $gt: 1.3 } } }, // Adjust the value based on gender if needed
      {
        $lookup: {
          from: "patients",
          localField: "patient",
          foreignField: "_id",
          as: "patientDetails"
        }
      },
      { $unwind: "$patientDetails" },
      {
        $lookup: {
          from: "camps",
          localField: "patientDetails.healthCamp",
          foreignField: "_id",
          as: "campDetails"
        }
      },
      { $unwind: "$campDetails" },
      {
        $group: {
          _id: "$campDetails.District",
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } } // Sort by district name
    ]);

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching high kidney serum by district:", error);
    res.status(500).json({ error: "Failed to fetch data", details: error });
  }
};

// Fetch counts of patients with high kidney serum by town
export const getHighKidneySerumByTown = async (req, res) => {
  try {
    const results = await LabReport.aggregate([
      { $match: { kidneySerum: { $gt: 1.3 } } }, // Adjust the value based on gender if needed
      {
        $lookup: {
          from: "patients",
          localField: "patient",
          foreignField: "_id",
          as: "patientDetails"
        }
      },
      { $unwind: "$patientDetails" },
      {
        $lookup: {
          from: "camps",
          localField: "patientDetails.healthCamp",
          foreignField: "_id",
          as: "campDetails"
        }
      },
      { $unwind: "$campDetails" },
      {
        $group: {
          _id: "$campDetails.Town",
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } } // Sort by town name
    ]);

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching high kidney serum by town:", error);
    res.status(500).json({ error: "Failed to fetch data", details: error });
  }
};

// ********Prediction**********
// Get districts and towns with the most patients identified
export const getNextCampLocationsByPatients = async (req, res) => {
  try {
    const results = await LabReport.aggregate([
      {
        $lookup: {
          from: "patients",
          localField: "patient",
          foreignField: "_id",
          as: "patientDetails"
        }
      },
      { $unwind: "$patientDetails" },
      {
        $lookup: {
          from: "camps",
          localField: "patientDetails.healthCamp",
          foreignField: "_id",
          as: "campDetails"
        }
      },
      { $unwind: "$campDetails" },
      {
        $group: {
          _id: { district: "$campDetails.District", town: "$campDetails.Town" },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 } // Get top 5 districts and towns
    ]);

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching next camp locations by patients:", error);
    res.status(500).json({ error: "Failed to fetch data", details: error });
  }
};

// Get districts and towns with the least number of health camps
export const getNextCampLocationsByCamps = async (req, res) => {
  try {
    const results = await Camps.aggregate([
      {
        $group: {
          _id: { district: "$District", town: "$Town" },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: 1 } },
      { $limit: 5 } // Get top 5 districts and towns with least health camps
    ]);

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching next camp locations by camps:", error);
    res.status(500).json({ error: "Failed to fetch data", details: error });
  }
};
