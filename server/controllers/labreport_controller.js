import LabReport from "../models/LabReport.js";
import Patient from "../models/Patient.js";

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
    } = req.body;

    // Check if the patient exists
    const existingPatient = await Patient.findById(patient);
    if (!existingPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Create a new lab report instance
    const newLabReport = new LabReport({
      patient,
      gender,
      kidneySerum,
      sugarLevel,
      cholesterolLevel,
      bloodPressure,
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
