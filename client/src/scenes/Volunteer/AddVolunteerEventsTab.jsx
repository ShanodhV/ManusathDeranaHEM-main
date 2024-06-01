import React, { useState } from "react";
import { Box } from "@mui/material";
import Buttons from "components/Buttons";
import AddVolunteerEventsModal from "./AddVolunteerEventsModal"; // Import the SchoolRegistrationModal component

const AddVolunteerEventsTab = () => {
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
      {/* Render the AddVolunteerEventsModal component and pass necessary props */}
      <AddVolunteerEventsModal openModal={openModal} handleCloseModal={handleCloseModal} />
    </Box>
  );
};

export default AddVolunteerEventsTab;
