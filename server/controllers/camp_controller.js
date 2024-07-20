import Camps from "../models/Camps.js";

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
