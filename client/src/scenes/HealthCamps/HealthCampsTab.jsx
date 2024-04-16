import React, { useState } from "react";
import { Box } from "@mui/material";
import Buttons from "components/Buttons";
import HealthCampModal from "./HealthCampModal"; // Import the HealthCampModal component

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
      {/* Render the HealthCampModal component and pass necessary props */}
      <HealthCampModal openModal={openModal} handleCloseModal={handleCloseModal} />
    </Box>
  );
};

export default HealthCampsTab;
