import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import CreateProgramTab from './CreateProgramTab';
import StudentRegistrationTab from './StudentRegistrationTab';
import VolunteerDonorRegistrationTab from './VolunteerDonorRegistrationTab';
import NextAreaPredictorTab from './NextAreaPredictorTab';
import ProgramModal from './ProgramModal';
import DonorManageTab from './DonorManageTab';
import DonorRegistrationModal from './DonorRegistrationModal';
import ManageStudent from './ManageStudent';


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
        {/* <Tab label="Next Area Predictor" /> */}
      </Tabs>

      {activeTab === 0 && <CreateProgramTab handleOpenModal={handleOpenProgramModal} />}
      {/* {activeTab === 1 && <StudentRegistrationTab />} */}
      {activeTab === 1 && <ManageStudent />}
      {activeTab==2 && <DonorManageTab/>}
      {/* {activeTab === 2 && <VolunteerDonorRegistrationTab handleOpenModal={handleOpenVolunteerModal} />} */}
      {activeTab === 3 && <NextAreaPredictorTab />}

      <ProgramModal open={openProgramModal} handleClose={handleCloseProgramModal} />
      <DonorRegistrationModal open={openVolunteerModal} handleClose={handleCloseVolunteerModal} />
    </Box>
  );
};

export default DeranaDaruwo;
