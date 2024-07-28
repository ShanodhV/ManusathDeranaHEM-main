import Patients from "../models/Patient.js";
import Camps from "../models/Camps.js";

export const addPatient = async (req, res) => {
  try {
    const { patientId, name, NIC, phone, address, emergencyPhone, healthCamp } = req.body;

    // Check if the health camp exists
    const campExists = await Camps.findById(healthCamp);
    if (!campExists) {
      return res.status(404).json({ error: "Health Camp not found" });
    }

    // Create a new patient entry
    const newPatient = new Patients({
      patientId,
      name,
      NIC,
      phone,
      address,
      emergencyPhone,
      healthCamp,
    });

    // Save the new patient to the database
    const savedPatient = await newPatient.save();

    // Respond with the newly saved patient
    res.status(201).json(savedPatient);
  } catch (error) {
    console.error("Error adding new patient:", error);

    if (error.code === 11000) {
      // Handle the case where NIC is duplicated for the same health camp
      return res.status(400).json({ error: "NIC already exists for this health camp" });
    }

    // General server error
    res.status(500).json({ error: "Failed to add new patient" });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const updatedPatientData = req.body;

    // Validate health camp
    if (updatedPatientData.healthCamp) {
      const campExists = await Camps.findById(updatedPatientData.healthCamp);
      if (!campExists) {
        return res.status(404).json({ error: "Health Camp not found" });
      }
    }

    // Update the patient entry
    const updatedPatient = await Patients.findByIdAndUpdate(
      patientId,
      updatedPatientData,
      {
        new: true,
        runValidators: true,
      }
    ).populate("healthCamp");

    if (!updatedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Respond with the updated patient
    res.json(updatedPatient);
  } catch (error) {
    console.error("Error updating patient:", error);

    if (error.code === 11000) {
      // Handle the case where NIC is duplicated for the same health camp
      return res.status(400).json({ error: "NIC already exists for this health camp" });
    }

    // General server error
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getPatients = async (req, res) => {
  try {
    const patients = await Patients.find().populate("healthCamp");
    res.status(200).json(patients);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patients.findById(id).populate("healthCamp");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPatient = await Patients.findByIdAndDelete(id);
    if (!deletedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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

export const getPatientsByCamp = async (req, res) => {
  try {
    const { campId } = req.params;
    const patients = await Patients.find({ healthCamp: campId }).populate("healthCamp");
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients by camp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
