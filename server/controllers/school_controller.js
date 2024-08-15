import School from "../models/School.js";

// Add School
export const addSchool = async (req, res) => {
  try {
    const { schoolId, schoolName, schoolAddress, location, schoolMobileNumber, principalContact } = req.body;

    const newSchool = new School({
      schoolId,
      schoolName,
      schoolAddress,
      location,
      schoolMobileNumber,
      principalContact,
    });

    const savedSchool = await newSchool.save();
    res.status(201).json(savedSchool);
  } catch (error) {
    console.error("Error adding new school:", error);
    res.status(500).json({ error: "Failed to add new school" });
  }
};

// Get All Schools
export const getSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json(schools);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get School by ID
export const getSchool = async (req, res) => {
  try {
    const { province, district, town } = req.query;

     // Build the filter object
     const filter = {};
     if (province) filter['location.province'] = province;
     if (district) filter['location.district'] = district;
     if (town) filter['location.town'] = town;


    // Fetch the filtered schools
    const schools = await School.find(filter);
    res.status(200).json(schools);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching schools' });
  }
};

// Delete School
export const deleteSchool = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSchool = await School.findByIdAndDelete(id);
    if (!deletedSchool) {
      return res.status(404).json({ error: "School not found" });
    }
    res.json({ message: "School deleted successfully" });
  } catch (error) {
    console.error("Error deleting school:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update School
export const updateSchool = async (req, res) => {
  try {
    const schoolId = req.params.id;
    const updatedSchoolData = req.body;

    const updatedSchool = await School.findByIdAndUpdate(
      schoolId,
      updatedSchoolData,
      { new: true }
    );

    res.json(updatedSchool);
  } catch (error) {
    console.error("Error updating school:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Last School
export const getLastSchool = async (req, res) => {
  try {
    const lastSchool = await School.findOne().sort({ createdAt: -1 });
    if (!lastSchool) {
      return res.status(404).json({ message: "No schools found" });
    }
    res.status(200).json(lastSchool);
  } catch (error) {
    console.error("Error fetching last school:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Filtered Schools
export const getFilteredSchools = async (req, res) => {
  try {
    const { province, district, town } = req.query;

    const filterCriteria = {};
    if (province) filterCriteria["location.province"] = province;
    if (district) filterCriteria["location.district"] = district;
    if (town) filterCriteria["location.town"] = town;

    const filteredSchools = await School.find(filterCriteria);
    res.status(200).json(filteredSchools);
  } catch (error) {
    console.error("Error fetching filtered schools:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};