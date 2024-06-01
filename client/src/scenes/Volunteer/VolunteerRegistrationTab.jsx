import React, { useState } from "react";
import { Box } from "@mui/material";
import Buttons from "components/Buttons";
import VolunteerRegistrationModal from "./VolunteerRegistrationModal"; // Import the VolunteerRegistrationModal component

const VolunteerRegistrationTab = () => {
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
        <Buttons label={"Register School"} onClick={handleOpenModal} />
      </Box>
      {/* Render the VolunteerRegistrationModal component and pass necessary props */}
      <VolunteerRegistrationModal openModal={openModal} handleCloseModal={handleCloseModal} />
    </Box>
  );
};

export default VolunteerRegistrationTab;
