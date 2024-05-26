import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import Buttons from "components/Buttons";
import SchoolPredictorTab from "./SchoolPredictorTab";
import SchoolRegistrationTab from "./SchoolRegistrationTab";
import ViewSchoolDetailsTab from "./ViewSchoolDetailsTab";
import DonerRegistrationTab from "./DonerRegistrationTab";
import SchoolRegistrationModel from "./SchoolRegistrationModal";
import DonerRegistrationModal from "./DonerRegistraionModal";




const SipsalPubuduwa = () => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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
        aria-label="Sipsal Pubuduwa tabs"
       >

        <Tab label="School Registration" />
        <Tab label="View School Details" />
        <Tab label="Doner Registeration" />
        <Tab label="Next School Predictor" />
      </Tabs>

      {/* Render tab content based on active tab */}
      {activeTab === 0 && <SchoolRegistrationTab handleOpenModal={handleOpenModal} />}
      {activeTab === 1 && <ViewSchoolDetailsTab />}
      {activeTab === 2 && <DonerRegistrationTab handleOpenModal={handleOpenModal}/>}
      {activeTab === 3 && <SchoolPredictorTab />}
      

      {/* Modal */}
      <SchoolRegistrationModel open={openModal} handleClose={handleCloseModal} />
      <DonerRegistrationModal open={openModal} handleClose={handleCloseModal}/>
    </Box>
  );
};

export default SipsalPubuduwa;
