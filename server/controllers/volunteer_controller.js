import Volunteer from "../models/Volunteer.js";

// Add a new volunteer
export const addVolunteer = async (req, res) => {
  try {
    const { volunteerNIC, volunteerName, dateOfBirth, contactNumber, volunteerAddress, location, occupation, status } = req.body;

    // Create a new volunteer instance
    const newVolunteer = new Volunteer({
      volunteerNIC,
      volunteerName,
      dateOfBirth,
      contactNumber,
      volunteerAddress,
      location,
      occupation,
      status,
    });

    // Save the volunteer to the database
    const savedVolunteer = await newVolunteer.save();

    res.status(201).json(savedVolunteer); // Respond with the saved volunteer
  } catch (error) {
    console.error("Error adding new volunteer:", error);
    res.status(500).json({ error: "Failed to add new volunteer" });
  }
};

// Get all volunteers
export const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find(); // Fetching all volunteers
    res.status(200).json(volunteers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single volunteer by ID
export const getVolunteer = async (req, res) => {
  try {
    const { id } = req.params;
    const volunteer = await Volunteer.findById(id);
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    res.status(200).json(volunteer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a volunteer by ID
export const deleteVolunteer = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVolunteer = await Volunteer.findByIdAndDelete(id); // Deleting volunteer by ID
    if (!deletedVolunteer) {
      return res.status(404).json({ error: "Volunteer not found" });
    }
    res.json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a volunteer by ID
export const updateVolunteer = async (req, res) => {
  try {
    const volunteerId = req.params.id;
    const updatedVolunteerData = req.body; // Updated volunteer data from the request body

    // Find the volunteer by ID in the database and update its information
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(volunteerId, updatedVolunteerData, { new: true });

    if (!updatedVolunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.json(updatedVolunteer); // Send back the updated volunteer object
  } catch (error) {
    console.error("Error updating volunteer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
