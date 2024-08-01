import School from "../models/School.js";

// Add a new school registration
export const addSchool = async (req, res) => {
  try {
    const { schoolId, schoolName, schoolAddress, location, schoolMobileNumber, principalContact } = req.body;

    const newSchool = new School({
      schoolId,
      schoolName,
      schoolAddress,
      location,  // Should match the schema with fields province, district, and town
      schoolMobileNumber,
      principalContact,  // Should match the schema with fields name and mobileNumber
    });

    const savedSchool = await newSchool.save();
    res.status(201).json(savedSchool);
  } catch (error) {
    console.error("Error adding new school:", error);
    res.status(500).json({ error: "Failed to add new school" });
  }
};

// Get all school registrations
export const getSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json(schools);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single school registration by ID
export const getSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const school = await School.findById(id);
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }
    res.status(200).json(school);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a school registration by ID
export const deleteSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSchool = await School.findOneAndDelete({ schoolId: id });
    if (!deletedSchool) {
      return res.status(404).json({ error: "School not found" });
    }
    res.json({ message: "School deleted successfully" });
  } catch (error) {
    console.log("Error deleting school:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a school registration by ID
export const updateSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSchoolData = req.body;

    const updatedSchool = await School.findByIdAndUpdate(id, updatedSchoolData, { new: true });
    if (!updatedSchool) {
      return res.status(404).json({ message: "School not found" });
    }
    res.json(updatedSchool);
  } catch (error) {
    console.error("Error updating school:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get the last school registration
export const getLastSchool = async (req, res) => {
  try {
    const lastSchool = await School.findOne().sort({ createdAt: -1 });
    if (!lastSchool) {
      return res.status(404).json({ message: "No school found" });
    }
    res.status(200).json(lastSchool);
  } catch (error) {
    console.error("Error fetching last school:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
