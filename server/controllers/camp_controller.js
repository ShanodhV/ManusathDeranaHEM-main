import HealthCamps from "../models/HealthCamp.js";

// Add Health Camp
export const addCamp = async (req, res) => {
  try {
    const { campId, province, district, town } = req.body;

    // Create a new health camp instance
    const newHealthCamp = new HealthCamps({
      campId,
      province,
      district,
      town,
    });

    // Save the health camp to the database
    const savedHealthCamp = await newHealthCamp.save();

    res.status(201).json(savedHealthCamp); // Respond with the saved health camp
  } catch (error) {
    console.error("Error adding new health camp:", error);
    res.status(500).json({ error: "Failed to add new health camp" });
  }
};

// Get All Health Camps
export const getCamps = async (req, res) => {
  try {
    const healthCamps = await HealthCamps.find(); // Fetching all health camps using the HealthCamp model
    res.status(200).json(healthCamps);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Health Camp by ID
export const getCamp = async (req, res) => {
  try {
    const { id } = req.params;
    const healthCamp = await HealthCamps.findById(id);
    res.status(200).json(healthCamp);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete Health Camp
export const deleteCamp = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedHealthCamp = await HealthCamps.findByIdAndDelete(id); // Deleting health camp by ID using the HealthCamp model
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
    const updatedHealthCampData = req.body; // Updated health camp data from the request body

    // Find the health camp by ID in the database and update its information
    const updatedHealthCamp = await HealthCamps.findByIdAndUpdate(
      healthCampId,
      updatedHealthCampData,
      { new: true }
    );

    res.json(updatedHealthCamp); // Send back the updated health camp object
  } catch (error) {
    console.error("Error updating health camp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
