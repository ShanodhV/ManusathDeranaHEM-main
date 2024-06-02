import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import Buttons from "components/Buttons";
import CustomTextField from "components/CustomTextField";
import { useAddLabReportMutation } from "state/api"; // Adjust the import according to your file structure

const LabReportModal = ({ open, onClose }) => {
  const [patientNIC, setPatientNIC] = useState("");
  const [kidneySerum, setKidneySerum] = useState("");
  const [sugarLevel, setSugarLevel] = useState("");
  const [cholesterolLevel, setCholesterolLevel] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");

  const [addLabReport] = useAddLabReportMutation();

  const handleAddReport = () => {
    addLabReport({ patientNIC, kidneySerum, sugarLevel, cholesterolLevel, bloodPressure })
      .then((response) => {
        console.log("Lab Report added successfully from frontend:", response);
        // Clear form fields
        setPatientNIC("");
        setKidneySerum("");
        setSugarLevel("");
        setCholesterolLevel("");
        setBloodPressure("");
      })
      .catch((error) => {
        console.error("Error adding Report:", error);
      });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "#fff",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
        }}
      >
        <h2 id="modal-modal-title">Add Lab Report</h2>

        <Box sx={{ mt: 3 }}>
          <CustomTextField
            label="Patient NIC"
            variant="outlined"
            value={patientNIC}
            onChange={(e) => setPatientNIC(e.target.value)}
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <CustomTextField
            label="Kidney Serum"
            variant="outlined"
            value={kidneySerum}
            onChange={(e) => setKidneySerum(e.target.value)}
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <CustomTextField
            label="Sugar Level"
            variant="outlined"
            value={sugarLevel}
            onChange={(e) => setSugarLevel(e.target.value)}
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <CustomTextField
            label="Cholesterol Level"
            variant="outlined"
            value={cholesterolLevel}
            onChange={(e) => setCholesterolLevel(e.target.value)}
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <CustomTextField
            label="Blood Pressure"
            variant="outlined"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
          <Buttons onClick={handleAddReport} label="Add Lab Report" />
        </Box>
      </Box>
    </Modal>
  );
};

export default LabReportModal;
