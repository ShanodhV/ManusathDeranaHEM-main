import VolunteerEvent from "../models/VolunteerEvent.js";

// Add a new volunteer event
export const addVolunteerEvent = async (req, res) => {
  try {
    const {
      eventName,
      eventCategory,
      eventDate,
      venue,
      location,
      relatedOccupations,
      description,
    } = req.body;

    // Create a new volunteer event instance
    const newVolunteerEvent = new VolunteerEvent({
      eventName,
      eventCategory,
      eventDate,
      venue,
      location,
      relatedOccupations,
      description,
    });

    // Save the volunteer event to the database
    const savedVolunteerEvent = await newVolunteerEvent.save();

    res.status(201).json(savedVolunteerEvent); // Respond with the saved volunteer event
  } catch (error) {
    console.error("Error adding new volunteer event:", error);
    res.status(500).json({ error: "Failed to add new volunteer event", error });
  }
};

// Get all volunteer events
export const getVolunteerEvents = async (req, res) => {
  try {
    const volunteerEvents = await VolunteerEvent.find(); // Fetching all volunteer events
    res.status(200).json(volunteerEvents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single volunteer event by ID
export const getVolunteerEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const volunteerEvent = await VolunteerEvent.findById(id);
    if (!volunteerEvent) {
      return res.status(404).json({ message: "Volunteer event not found" });
    }
    res.status(200).json(volunteerEvent);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a volunteer event by ID
export const deleteVolunteerEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVolunteerEvent = await VolunteerEvent.findByIdAndDelete(id); // Deleting volunteer event by ID
    if (!deletedVolunteerEvent) {
      return res.status(404).json({ error: "Volunteer event not found" });
    }
    res.json({ message: "Volunteer event deleted successfully" });
  } catch (error) {
    console.error("Error deleting volunteer event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a volunteer event by ID
export const updateVolunteerEvent = async (req, res) => {
  try {
    const volunteerEventId = req.params.id;
    const updatedVolunteerEventData = req.body; // Updated volunteer event data from the request body

    // Find the volunteer event by ID in the database and update its information
    const updatedVolunteerEvent = await VolunteerEvent.findByIdAndUpdate(
      volunteerEventId,
      updatedVolunteerEventData,
      { new: true }
    );

    if (!updatedVolunteerEvent) {
      return res.status(404).json({ message: "Volunteer event not found" });
    }

    res.json(updatedVolunteerEvent); // Send back the updated volunteer event object
  } catch (error) {
    console.error("Error updating volunteer event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
