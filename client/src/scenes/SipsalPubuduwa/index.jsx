import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import Buttons from "components/Buttons";
//import SchoolPredictorTab from "./SchoolPredictorTab";
import ViewSchoolDetailsTab from "./ViewSchoolDetailsTab";
import DonorRegistrationTab from "./DonorRegistrationTab";
import SchoolRegistrationModal from "./SchoolRegistrationModal";
import DonorRegistrationModal from "./DonorRegistrationModal";
import UpdateSchoolRegistrationModal from "./UpdateSchoolRegistrationModal";
import UpdateDonorRegistrationModal from "./UpdateDonorRegistrationModal";
import SchoolManagementTab from "./SchoolRegistrationTab";


const SipsalPubuduwa = () => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [currentSchool, setCurrentSchool] = useState(null);
  const [currentDonor, setCurrentDonor] = useState(null);
  

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenUpdateModal = (school, donor) => {
    setCurrentSchool(school, donor);
    setOpenModal(true);
    setOpenUpdateModal(true);
  };
  
  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setCurrentSchool(null);
    setCurrentDonor(null);
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
        aria-label="Sipsal Pubuduwa tabs"
       >

        <Tab label="School Registration" />
        <Tab label="View School Details" />
        <Tab label="Donor Registeration" />
        {/* <Tab label="Next School Predictor" /> */}
      </Tabs>

      {/* Render tab content based on active tab */}
      {activeTab === 0 && <SchoolManagementTab handleOpenModal={handleOpenModal}  handleOpenUpdateModal={handleOpenUpdateModal}/>}
      {activeTab === 1 && <ViewSchoolDetailsTab />}
      {activeTab === 2 && <DonorRegistrationTab handleOpenModal={handleOpenModal} handleOpenUpdateModal={handleOpenUpdateModal}/>}
      {/* {activeTab === 3 && <SchoolPredictorTab />} */}
      

      {/* Modal */}
      <SchoolRegistrationModal open={openModal} handleClose={handleCloseModal} />
      <DonorRegistrationModal open={openModal} handleClose={handleCloseModal}/>

      <UpdateSchoolRegistrationModal open={openUpdateModal} handleClose={handleCloseUpdateModal} currentSchool={currentSchool} />
      <UpdateDonorRegistrationModal open={openUpdateModal} handleClose={handleCloseUpdateModal} currentDonor={currentDonor} />

    </Box>
  );
};

export default SipsalPubuduwa;
