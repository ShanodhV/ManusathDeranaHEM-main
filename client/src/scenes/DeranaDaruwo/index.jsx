import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import CreateProgramTab from './CreateProgramTab';
import CreateProgramModal from './CreateProgramModal';
import StudentRegistrationTab from './StudentRegistrationTab';
import VolunteerDonorRegistrationTab from './VolunteerDonorRegistrationTab';
import VolunteerDonorRegistrationModal from './VolunteerDonorRegistrationModal';
import NextAreaPredictorTab from './NextAreaPredictorTab';

const DeranaDaruwo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const [openProgramModal, setOpenProgramModal] = useState(false);
  const [openVolunteerModal, setOpenVolunteerModal] = useState(false);

  const handleOpenProgramModal = () => {
    setOpenProgramModal(true);
  };

  const handleCloseProgramModal = () => {
    setOpenProgramModal(false);
  };

  const handleOpenVolunteerModal = () => {
    setOpenVolunteerModal(true);
  };

  const handleCloseVolunteerModal = () => {
    setOpenVolunteerModal(false);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="standard"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="Create Program Tab"
      >
        <Tab label="Create Programs" />
        <Tab label="Student Registration" />
        <Tab label="Donor Registration" />
        <Tab label="Next Area Predictor" />
      </Tabs>

      {activeTab === 0 && <CreateProgramTab handleOpenModal={handleOpenProgramModal} />}
      {activeTab === 1 && <StudentRegistrationTab />}
      {activeTab === 2 && <VolunteerDonorRegistrationTab handleOpenModal={handleOpenVolunteerModal} />}
      {activeTab === 3 && <NextAreaPredictorTab />}

      <CreateProgramModal open={openProgramModal} handleClose={handleCloseProgramModal} />
      <VolunteerDonorRegistrationModal open={openVolunteerModal} handleClose={handleCloseVolunteerModal} />
    </Box>
  );
};

export default DeranaDaruwo;
