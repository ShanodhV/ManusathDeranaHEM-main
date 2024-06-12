import DeranaDaruwo from "../models/DeranaDarwo.js";

// Add a new Derana Daruwo program
export const addDeranaDaruwo = async (req, res) => {
  try {
    const { programID, location, areaOfficerDetails } = req.body;

    // Create a new Derana Daruwo instance
    const newDeranaDaruwo = new DeranaDaruwo({
      programID,
      location,
      areaOfficerDetails,
    });

    // Save the Derana Daruwo program to the database
    const savedDeranaDaruwo = await newDeranaDaruwo.save();

    res.status(201).json(savedDeranaDaruwo); // Respond with the saved Derana Daruwo program
  } catch (error) {
    console.error("Error adding new Derana Daruwo program:", error);
    res.status(500).json({ error: "Failed to add new Derana Daruwo program" });
  }
};

// Get all Derana Daruwo programs
export const getDeranaDaruwoPrograms = async (req, res) => {
  try {
    const deranaDaruwoPrograms = await DeranaDaruwo.find(); // Fetching all Derana Daruwo programs
    res.status(200).json(deranaDaruwoPrograms);
  } catch (error) {
    res.status(404).json({ message: error.message, error });
  }
};

// Get a single Derana Daruwo program by ID
export const getDeranaDaruwoProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const deranaDaruwoProgram = await DeranaDaruwo.findById(id);
    if (!deranaDaruwoProgram) {
      return res.status(404).json({ message: "Derana Daruwo program not found" });
    }
    res.status(200).json(deranaDaruwoProgram);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a Derana Daruwo program by ID
export const deleteDeranaDaruwoProgram = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDeranaDaruwoProgram = await DeranaDaruwo.findByIdAndDelete(id); // Deleting program by ID
    if (!deletedDeranaDaruwoProgram) {
      return res.status(404).json({ error: "Derana Daruwo program not found" });
    }
    res.json({ message: "Derana Daruwo program deleted successfully" });
  } catch (error) {
    console.error("Error deleting Derana Daruwo program:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a Derana Daruwo program by ID
export const updateDeranaDaruwoProgram = async (req, res) => {
  try {
    const programId = req.params.id;
    const updatedProgramData = req.body; // Updated program data from the request body

    // Find the program by ID in the database and update its information
    const updatedDeranaDaruwoProgram = await DeranaDaruwo.findByIdAndUpdate(programId, updatedProgramData, { new: true });

    if (!updatedDeranaDaruwoProgram) {
      return res.status(404).json({ message: "Derana Daruwo program not found" });
    }

    res.json(updatedDeranaDaruwoProgram); // Send back the updated program object
  } catch (error) {
    console.error("Error updating Derana Daruwo program:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
