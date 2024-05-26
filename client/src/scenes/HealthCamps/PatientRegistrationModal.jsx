import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import Buttons from "components/Buttons"; // Assuming this is a custom Buttons component
import CustomTextField from "components/CustomTextField"; // Path to your CustomTextField component
import { useAddPatientMutation } from "state/api";

const PatientRegistrationModal = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [NIC, setNIC] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const [addPatient] = useAddPatientMutation();

  const handleAddPatient = () => {
    addPatient({ name, NIC, phone, address, city })
      .then((response) => {
        console.log("Patient added successfully from frontend:", response);
        // Clear form fields
        setName("");
        setNIC("");
        setPhone("");
        setAddress("");
        setCity("");
      })
      .catch((error) => {
        console.error("Error adding patient:", error);
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
          width: 700,
          height: 600,
          bgcolor: "#fff",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
        }}
      >
        <h2 id="modal-modal-title">Create New Program</h2>

        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)} // Updated here
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Phone"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)} // Updated here
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="NIC"
            variant="outlined"
            fullWidth
            value={NIC}
            onChange={(e) => setNIC(e.target.value)} // Updated here
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)} // Updated here
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="City"
            variant="outlined"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)} // Updated here
          />
        </Box>

        <Box sx={{ mt: 4, mb: 4 }}>
          <Buttons label="Register Patient" onClick={handleAddPatient} />
        </Box>
      </Box>
    </Modal>
  );
};

export default PatientRegistrationModal;
