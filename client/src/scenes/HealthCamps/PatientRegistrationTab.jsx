import React, { useState } from "react";
import { Box } from "@mui/material";
import Buttons from "components/Buttons";
import PatientRegistrationModal from "./PatientRegistrationModal";

const PatientRegistrationTab = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Buttons label={"Register Patient"} onClick={handleOpenModal} />
      </Box>
      <PatientRegistrationModal open={openModal} onClose={handleCloseModal} />
    </Box>
  );
};

export default PatientRegistrationTab;