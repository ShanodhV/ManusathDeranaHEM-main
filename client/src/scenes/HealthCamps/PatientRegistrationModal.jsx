import React from "react";
import { Modal, Box } from "@mui/material";
import Buttons from "components/Buttons"; // Assuming this is a custom Buttons component
import CustomTextField from "components/CustomTextField"; // Path to your CustomTextField component

const PatientRegistrationModal = ({ open, onClose }) => {
  const labelStyle = {
    fontWeight: "bold",
    color: "black",
    fontSize: "16px",
    marginTop: "16px",
  };

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
            label="Camp ID"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Full Name"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="NIC"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Address"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Contact Number"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Emergency Contact Number"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 4, mb: 4 }}>
          <Buttons label="Register Patient" />
        </Box>
      </Box>
    </Modal>
  );
};

export default PatientRegistrationModal;
