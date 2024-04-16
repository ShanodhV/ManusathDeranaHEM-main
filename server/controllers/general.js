import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";
import Patients from "../models/Patient.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addPatient = async (req, res) => {
  try {
    const { name, NIC, phone, address, city, emergencyPhone } = req.body;

    // Create a new patient instance
    const newPatient = new Patients({
      name,
      NIC,
      phone,
      address,
      city,
      emergencyPhone,
    });

    // Save the patient to the database
    const savedPatient = await newPatient.save();

    res.status(201).json(savedPatient); // Respond with the saved patient
  } catch (error) {
    console.error("Error adding new patient:", error);
    res.status(500).json({ error: "Failed to add new patient" });
  }
};
export const getPatients = async (req, res) => {
  try {
    const patients = await Patients.find(); // Fetching all patients using the Patient model
    res.status(200).json(patients);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patients = await Patients.findById(id);
    res.status(200).json(patients);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPatient = await Patients.findByIdAndDelete(id); // Deleting patient by ID using the Patient model
    if (!deletedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent Transactions */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
