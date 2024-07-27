import Patients from "../models/Patient.js";
import Camps from "../models/Camps.js";

// Generate the next patient ID
const generateNextPatientId = async () => {
  const lastPatient = await Patients.findOne().sort({ createdAt: -1 });
  if (!lastPatient) return "MD-PT-000001";
  
  const idNumber = parseInt(lastPatient.patientId.split('-')[2], 10);
  const nextIdNumber = (idNumber + 1).toString().padStart(6, '0');
  return `MD-PT-${nextIdNumber}`;
};

// Add Patient
export const addPatient = async (req, res) => {
  try {
    const { name, NIC, phone, address, emergencyPhone, healthCamp } = req.body;

    // Validate the health camp
    const campExists = await Camps.findById(healthCamp);
    if (!campExists) {
      return res.status(404).json({ error: "Health Camp not found" });
    }

    const patientId = await generateNextPatientId();

    // Create a new patient instance
    const newPatient = new Patients({
      patientId,
      name,
      NIC,
      phone,
      address,
      emergencyPhone,
      healthCamp,
    });

    // Save the patient to the database
    const savedPatient = await newPatient.save();

    res.status(201).json(savedPatient); // Respond with the saved patient
  } catch (error) {
    console.error("Error adding new patient:", error);
    res.status(500).json({ error: "Failed to add new patient" });
  }
};

// Get All Patients
export const getPatients = async (req, res) => {
  try {
    const patients = await Patients.find().populate("healthCamp"); // Fetching all patients with health camp details
    res.status(200).json(patients);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Patient by ID
export const getPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patients.findById(id).populate("healthCamp");
    res.status(200).json(patient);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete Patient
export const deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPatient = await Patients.findByIdAndDelete(id); // Deleting patient by ID using the Patient model
    if (!deletedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Patient
export const updatePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const updatedPatientData = req.body; // Updated patient data from the request body

    // Validate the health camp if updated
    if (updatedPatientData.healthCamp) {
      const campExists = await Camps.findById(updatedPatientData.healthCamp);
      if (!campExists) {
        return res.status(404).json({ error: "Health Camp not found" });
      }
    }

    // Find the patient by ID in the database and update its information
    const updatedPatient = await Patients.findByIdAndUpdate(
      patientId,
      updatedPatientData,
      { new: true }
    ).populate("healthCamp");

    res.json(updatedPatient); // Send back the updated patient object
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Last Patient
export const getLastPatient = async (req, res) => {
  try {
    const lastPatient = await Patients.findOne().sort({ createdAt: -1 });
    if (!lastPatient) {
      return res.status(404).json({ message: "No patients found" });
    }
    res.status(200).json(lastPatient);
  } catch (error) {
    console.error("Error fetching last patient:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get Patients by camp
export const getPatientsByCamp = async (req, res) => {
  try {
    const { campId } = req.params;
    const patients = await Patients.find({ healthCamp: campId }).populate("healthCamp");
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients by camp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}