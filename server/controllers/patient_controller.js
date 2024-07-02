import Patients from "../models/Patient.js";

// Add Patient
export const addPatient = async (req, res) => {
  try {
    const { name, NIC, phone, address, city, emergencyPhone } = req.body;

    // Create a new patient instance
    const newPatient = new Patients({
      name,
      NIC,
      phone,
      address,
      city,
      emergencyPhone,
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
    const patients = await Patients.find(); // Fetching all patients using the Patient model
    res.status(200).json(patients);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Patient by ID
export const getPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patients.findById(id);
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

    // Find the patient by ID in the database and update its information
    const updatedPatient = await Patients.findByIdAndUpdate(
      patientId,
      updatedPatientData,
      { new: true }
    );

    res.json(updatedPatient); // Send back the updated patient object
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
