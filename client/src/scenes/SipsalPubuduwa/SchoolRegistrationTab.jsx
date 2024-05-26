import React, { useState } from "react";
import { Box } from "@mui/material";
import Buttons from "components/Buttons";
import SchoolRegistrationModal from "./SchoolRegistrationModal"; // Import the SchoolRegistrationModal component

const HealthCampsTab = () => {
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
        <Buttons label={"Create Health Camp"} onClick={handleOpenModal} />
      </Box>
      {/* Render the SchoolRegistrationModal component and pass necessary props */}
      <SchoolRegistrationModal openModal={openModal} handleCloseModal={handleCloseModal} />
    </Box>
  );
};

export default HealthCampsTab;
