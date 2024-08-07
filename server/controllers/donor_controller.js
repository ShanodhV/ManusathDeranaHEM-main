import Donor from '../models/Donor.js';

// Add a new donor
export const addDonor = async (req, res) => {
  try {
    const { donorNIC, donorName, donorAddress, dateOfBirth, mobileNumber, occupation } = req.body;

    // Create a new donor instance
    const newDonor = new Donor({
      donorNIC,
      donorName,
      donorAddress,
      dateOfBirth,
      mobileNumber,
      occupation,
    });

    // Save the donor to the database
    const savedDonor = await newDonor.save();

    res.status(201).json(savedDonor); // Respond with the saved donor
  } catch (error) {
    console.error("Error adding new donor:", error);
    res.status(500).json({ error: "Failed to add new donor" });
  }
};

// Get all donors
export const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find(); // Fetching all donors
    res.status(200).json(donors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single donor by ID
export const getDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const donor = await Donor.findById(id);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.status(200).json(donor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a donor by ID
export const deleteDonor = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDonor = await Donor.findByIdAndDelete(id); // Deleting donor by ID
    if (!deletedDonor) {
      return res.status(404).json({ error: "Donor not found" });
    }
    res.json({ message: "Donor deleted successfully" });
  } catch (error) {
    console.error("Error deleting donor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a donor by ID
export const updateDonor = async (req, res) => {
  try {
    const donorId = req.params.id;
    const updatedDonorData = req.body; // Updated donor data from the request body

    // Find the donor by ID in the database and update its information
    const updatedDonor = await Donor.findByIdAndUpdate(donorId, updatedDonorData, { new: true });

    if (!updatedDonor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.json(updatedDonor); // Send back the updated donor object
  } catch (error) {
    console.error("Error updating donor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
