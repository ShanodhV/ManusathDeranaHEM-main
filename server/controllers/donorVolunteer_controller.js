import DonorVolunteer from "../models/DonorVolunteer.js";

// Add a new donor volunteer
export const addDonorVolunteer = async (req, res) => {
  try {
    const { donorName, donorAddress, contactNumber, donorID, studentID, programID } = req.body;

    // Create a new donor volunteer instance
    const newDonorVolunteer = new DonorVolunteer({
      donorID,
      donorName,
      donorAddress,
      contactNumber,
      studentID,
      programID,
    });

    // Save the donor volunteer to the database
    const savedDonorVolunteer = await newDonorVolunteer.save();

    res.status(201).json(savedDonorVolunteer); // Respond with the saved donor volunteer
  } catch (error) {
    console.error("Error adding new donor volunteer:", error);
    res.status(500).json({ error: "Failed to add new donor volunteer" });
  }
};

// Get all donor volunteers
export const getDonorVolunteers = async (req, res) => {
  try {
    const donorVolunteers = await DonorVolunteer.find(); // Fetching all donor volunteers
    res.status(200).json(donorVolunteers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single donor volunteer by ID
export const getDonorVolunteer = async (req, res) => {
  try {
    const { id } = req.params;
    const donorVolunteer = await DonorVolunteer.findById(id);
    if (!donorVolunteer) {
      return res.status(404).json({ message: "Donor volunteer not found" });
    }
    res.status(200).json(donorVolunteer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a donor volunteer by ID
export const deleteDonorVolunteer = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDonorVolunteer = await DonorVolunteer.findByIdAndDelete(id); // Deleting donor volunteer by ID
    if (!deletedDonorVolunteer) {
      return res.status(404).json({ error: "Donor volunteer not found" });
    }
    res.json({ message: "Donor volunteer deleted successfully" });
  } catch (error) {
    console.error("Error deleting donor volunteer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a donor volunteer by ID
export const updateDonorVolunteer = async (req, res) => {
  try {
    const donorVolunteerId = req.params.id;
    const updatedDonorVolunteerData = req.body; // Updated donor volunteer data from the request body

    // Find the donor volunteer by ID in the database and update its information
    const updatedDonorVolunteer = await DonorVolunteer.findByIdAndUpdate(donorVolunteerId, updatedDonorVolunteerData, { new: true });

    if (!updatedDonorVolunteer) {
      return res.status(404).json({ message: "Donor volunteer not found" });
    }

    res.json(updatedDonorVolunteer); // Send back the updated donor volunteer object
  } catch (error) {
    console.error("Error updating donor volunteer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
