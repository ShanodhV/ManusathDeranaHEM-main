import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import Buttons from "components/Buttons"; // Assuming this is a custom Buttons component
import CustomTextField from "components/CustomTextField"; // Path to your CustomTextField component
import { useAddPatientMutation } from "state/api";//1

const PatientRegistrationModal = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [NIC, setNIC] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const [addPatient] = useAddPatientMutation();//2
  const labelStyle = {
    fontWeight: "bold",
    color: "black",
    fontSize: "16px",
    marginTop: "16px",
  };

  const _handleAddPatient = () => {
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
  };//3

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-titel"
      aria-describedby="model-model-description"
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
        <h2 id="modal-modal-titel">Create New Program</h2>

        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Name"
            variant="outlined"
            value={name}
            Function={(e) => setName(e.target.value)}
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Phone"
            variant="outlined"
            fullWidth
            value={phone}
            Function={(e) => setPhone(e.target.value)}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="NIC"
            variant="outlined"
            fullWidth
            value={NIC}
            Function={(e) => setNIC(e.target.value)}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Address"
            variant="outlined"
            fullWidth
            value={address}
            Function={(e) => setAddress(e.target.value)}
          />
        </Box>

        <Box sx={{ mt: 2 }}> 
          <CustomTextField
            label="City"
            variant="outlined"
            fullWidth
            value={city}
            Function={(e) => setCity(e.target.value)}
          />
        </Box>

        {/* <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Emergency Contact Number"
            variant="outlined"
            fullWidth
          />
        </Box> */}

        <Box sx={{ mt: 4, mb: 4 }}>
          <Buttons label="Register Patient" onClick={_handleAddPatient} />
        </Box>
      </Box>
    </Modal>
  );
};

export default PatientRegistrationModal;
