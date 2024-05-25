import Camps from "../models/Camp.js";

// Add a new camp
export const addCamp = async (req, res) => {
  try {
    const { CampId, Province, District, Town, MOH, ContactPersons, Sponsor } = req.body;

    // Create a new camp instance
    const newCamp = new Camps({
      CampId,
      Province,
      District,
      Town,
      MOH,
      ContactPersons,
      Sponsor,
    });

    // Save the camp to the database
    const savedCamp = await newCamp.save();

    res.status(201).json(savedCamp); // Respond with the saved camp
  } catch (error) {
    console.error("Error adding new camp:", error);
    res.status(500).json({ error: "Failed to add new camp" });
  }
};

// Get all camps
export const getCamps = async (req, res) => {
  try {
    const camps = await Camps.find(); // Fetching all camps using the Camp model
    res.status(200).json(camps);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single camp by ID
export const getCamp = async (req, res) => {
  try {
    const { id } = req.params;
    const camp = await Camps.findById(id);
    if (!camp) {
      return res.status(404).json({ message: "Camp not found" });
    }
    res.status(200).json(camp);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a camp by ID
export const deleteCamp = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCamp = await Camps.findByIdAndDelete(id); // Deleting camp by ID using the Camp model
    if (!deletedCamp) {
      return res.status(404).json({ error: "Camp not found" });
    }
    res.json({ message: "Camp deleted successfully" });
  } catch (error) {
    console.error("Error deleting camp:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a camp by ID
export const updateCamp = async (req, res) => {
  try {
    const campId = req.params.id;
    const updatedCampData = req.body; // Updated camp data from the request body

    // Find the camp by ID in the database and update its information
    const updatedCamp = await Camps.findByIdAndUpdate(campId, updatedCampData, { new: true });

    if (!updatedCamp) {
      return res.status(404).json({ message: "Camp not found" });
    }

    res.json(updatedCamp); // Send back the updated camp object
  } catch (error) {
    console.error("Error updating camp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
