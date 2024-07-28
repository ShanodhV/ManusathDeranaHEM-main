import School from "../models/School.js";

// Add a new school registration
export const addSchool = async (req, res) => {
  try {
    const { schoolID, schoolName, schoolAddress,  Province,
      District,
      Town, schoolMobileNumber, principalContact } = req.body;

    // Create a new school instance
    const newSchool = new School({
      schoolID,
      schoolName,
      schoolAddress,
       Province,
      District,
      Town,
      schoolMobileNumber,
      principalContact,
    });

    // Save the school to the database
    const savedSchool = await newSchool.save();

    res.status(201).json(savedSchool); // Respond with the saved school
  } catch (error) {
    console.error("Error adding new school:", error);
    res.status(500).json({ error: "Failed to add new school" });
  }
};

// Get all school registrations
export const getSchools = async (req, res) => {
  try {
    const schools = await School.find(); // Fetching all schools
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
    // if (!school) {
    //   return res.status(404).json({ message: "School not found" });
    // }
    res.status(200).json(school);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a school registration by ID
export const deleteSchool = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedSchool = await School.deleteOne({schoolID: id}); // Deleting school by ID
    if (!deletedSchool) {
      return res.status(404).json({ error: "School not found" });
    }
    res.json({ message: "School deleted successfully" });
  } catch (error) {
    console.log("Error deleting school:" ,error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a school registration by ID
export const updateSchool = async (req, res) => {
  try {
    const schoolId = req.params.id;
    const updatedSchoolData = req.body; // Updated school data from the request body

    // Find the school by ID in the database and update its information
    const updatedSchool = await School.findByIdAndUpdate(schoolId, updatedSchoolData, { new: true });

    res.json(updatedSchool); // Send back the updated school object
  } catch (error) {
    console.error("Error updating school:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Last Health Camp
export const getLastSchool = async (req, res) => {
  try {
    const lastSchool = await Camps.findOne().sort({ createdAt: -1 });
    if (!lastSchool) {
      return res.status(404).json({ message: "No School found" });
    }
    res.status(200).json(lastSchool);
  } catch (error) {
    console.error("Error fetching last school:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
