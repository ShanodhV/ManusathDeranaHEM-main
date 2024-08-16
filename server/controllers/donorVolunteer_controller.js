import DonorVolunteers from "../models/DonorVolunteer.js";

// Add Donor Volunteer
export const addDonorVolunteer = async (req, res) => {
  try {
    const { 
      donorID,
      donorName,
      donorAddress,
      countryCode,
      contactNumber,
      emailAddress,} = req.body;

    // Create a new donor volunteer instance
    const newDonorVolunteer = new DonorVolunteers({
      donorID,
      donorName,
      donorAddress,
      countryCode,
      contactNumber,
      emailAddress,
    });

    console.log(newDonorVolunteer);

    const savedDonorVolunteer = await newDonorVolunteer.save();
    res.status(201).json(savedDonorVolunteer);
  } catch (error) {
    console.error("Error adding new donor volunteer:", error);
    res.status(500).json({ error: "Failed to add new donor volunteer",error });
  }
};

// Get All Donor Volunteers
export const getDonorVolunteers = async (req, res) => {
  try {
    const donorVolunteers = await DonorVolunteers.find();
    res.status(200).json(donorVolunteers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Donor Volunteer by ID
export const getDonorVolunteer = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);
    console.log("success");
    const donorVolunteer = await DonorVolunteers.findById(id);
    res.status(200).json(donorVolunteer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete Donor Volunteer
export const deleteDonorVolunteer = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDonorVolunteer = await DonorVolunteers.findByIdAndDelete(id);
    if (!deletedDonorVolunteer) {
      return res.status(404).json({ error: "Donor Volunteer not found" });
    }
    res.json({ message: "Donor Volunteer deleted successfully" });
  } catch (error) {
    console.error("Error deleting donor volunteer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Donor Volunteer
export const updateDonorVolunteer = async (req, res) => {
  try {
    const donorVolunteerId = req.params.id;
    const updatedDonorVolunteerData = req.body;

    const updatedDonorVolunteer = await DonorVolunteers.findByIdAndUpdate(
      donorVolunteerId,
      updatedDonorVolunteerData,
      { new: true }
    );

    res.json(updatedDonorVolunteer);
  } catch (error) {
    console.error("Error updating donor volunteer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Last ID
export const getLastDonorVolunteer = async (req, res) => {
  try {
    const lastDonor = await DonorVolunteers.findOne().sort({ createdAt: -1 });
    if (!lastDonor) {
      return res.status(404).json({ message: "No program found" });
    }
    res.status(200).json(lastDonor);
  } catch (error) {
    console.error("Error fetching last program:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};