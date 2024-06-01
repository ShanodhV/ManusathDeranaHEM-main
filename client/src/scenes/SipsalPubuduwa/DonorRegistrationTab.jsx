import React, { useState } from "react";
import { Box } from "@mui/material";
import Buttons from "components/Buttons";
import DonorRegistrationModal from "./DonorRegistrationModal"; // Import the DonerRegistrationModal component

const DonorRegistrationTab = () => {
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
        <Buttons label={"Register Doner"} onClick={handleOpenModal} />
      </Box>
      {/* Render the DonerRegistrationModal component and pass necessary props */}
      <DonorRegistrationModal openModal={openModal} handleCloseModal={handleCloseModal} />
    </Box>
  );
};

export default DonorRegistrationTab;
