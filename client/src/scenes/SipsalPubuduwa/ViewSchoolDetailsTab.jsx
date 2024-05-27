import React, { useState } from "react";
import { Box } from "@mui/material";
import Buttons from "components/Buttons";
import ViewSchoolDetailsModal from "./ViewSchoolDetailsModal"; // Import the ViewScoolDetailsModal component

const ViewSchoolDetailsTab = () => {
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
        <Buttons label={"View School Details"} onClick={handleOpenModal} />
      </Box>
      {/* Render the ViewScoolDetailsModal component and pass necessary props */}
      <ViewSchoolDetailsModal openModal={openModal} handleCloseModal={handleCloseModal} />
    </Box>
  );
};

export default ViewSchoolDetailsTab;
