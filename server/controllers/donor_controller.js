import Donors from '../models/Donor.js';

// Function to generate the next Donor ID
const generateNextId = async () => {
  const lastDonor = await Donors.findOne().sort({ donorId: -1 });
  const lastId = lastDonor ? lastDonor.donorId : "MD-HC-000000";
  const idNumber = parseInt(lastId.split('-')[2], 10) + 1;
  return `MD-HC-${idNumber.toString().padStart(6, '0')}`;
};

// Add a new donor
export const addDonor = async (req, res) => {
  try {
    // Generate the next Donor ID
    const donorId = await generateNextId();

    const { donorNIC, donorName, donorAddress, dateOfBirth, mobileNumber, occupation } = req.body;

    // Check if donor with the same NIC already exists
    if (await Donors.findOne({ donorNIC })) {
      return res.status(400).json({ error: "Donor with this NIC already exists" });
    }

    const newDonor = new Donors({
      donorId,
      donorNIC,
      donorName,
      donorAddress,
      dateOfBirth,
      mobileNumber,
      occupation,
    });

    const savedDonor = await newDonor.save();
    res.status(201).json(savedDonor);
  } catch (error) {
    console.error("Error adding new donor:", error);
    res.status(500).json({ error: "Failed to add new donor" });
  }
};

// Get all donors
export const getDonors = async (req, res) => {
  try {
    const donors = await Donors.find();
    res.status(200).json(donors);
  } catch (error) {
    console.error("Error fetching donors:", error);
    res.status(500).json({ message: "Failed to fetch donors" });
  }
};

// Get a single donor by ID
export const getDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const donor = await Donors.findOne({ donorId: id });
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.status(200).json(donor);
  } catch (error) {
    console.error("Error fetching donor:", error);
    res.status(500).json({ message: "Failed to fetch donor" });
  }
};

// Delete a donor by ID
export const deleteDonor = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDonor = await Donors.findOneAndDelete({ donorId: id });
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
    const updatedDonorData = req.body;

    const updatedDonor = await Donors.findOneAndUpdate({ donorId: donorId }, updatedDonorData, { new: true });

    if (!updatedDonor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.json(updatedDonor);
  } catch (error) {
    console.error("Error updating donor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
