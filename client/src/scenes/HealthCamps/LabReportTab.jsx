import React, { useState } from "react";
import { Box } from "@mui/material";
import Buttons from "components/Buttons";
import PatientRegistrationModal from "./PatientRegistrationModal";

const LabReportTab = () => {
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
        <Buttons label={"Add Report data"} onClick={handleOpenModal} />
      </Box>
      <PatientRegistrationModal open={openModal} onClose={handleCloseModal} />
    </Box>
  );
};

export default LabReportTab;
