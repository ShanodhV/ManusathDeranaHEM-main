import React,{useState} from 'react'
import { Box, Tabs, Tab } from "@mui/material";

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
  }

  const[openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box m="1.5rem 2.5rem">
      {/* Header and Tabs */}

      <Tabs

        value={activeTab}
        onChange={handleTabChange}
        variant="standard"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="Create Program Tab"
       >

        <Tab label="Create Programs" />
        <Tab label="Student Registation" />
        <Tab label="Donor Registeration" />
        <Tab label="Next Area Predictor" />
      </Tabs>

      {/* Render tab content based on active tab */}
      {activeTab === 0 && <CreateProgramTab handleOpenModal={handleOpenModal} />}
      {activeTab==1 && <StudentRegistrationTab handleOpenModal={handleOpenModal}/>}
      {/* { {activeTab === 1 && <ViewSchoolDetailsTab />} */}
      {activeTab === 2 && <VolunteerDonorRegistrationTab handleOpenModal={handleOpenModal}/>} 
      {activeTab === 3 && <NextAreaPredictorTab/>}
      

      {/* Modal */}
      <CreateProgramModal open={openModal} handleClose={handleCloseModal} />
      <VolunteerDonorRegistrationModal open={openModal} handleClose={handleCloseModal}/>
    </Box>
  )
}

export default DeranaDaruwo;
