import React, { useState } from "react";
import { Box } from "@mui/material";
import Buttons from "components/Buttons";
import LabReportModal from "./LabReportModal";

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
      <LabReportModal open={openModal} onClose={handleCloseModal} />
    </Box>
  );
};

export default LabReportTab;
