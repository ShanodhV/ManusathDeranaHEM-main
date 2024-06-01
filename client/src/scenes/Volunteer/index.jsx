import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import Buttons from "components/Buttons";
import AddVoluteerEventsTab from "./AddVolunteerEventsTab";
import VolunteerRegistrationTab from "./VolunteerRegistrationTab";
import AddVoluteerEventsModal from "./AddVolunteerEventsModal";
import VolunteerRegistrationModal from "./VolunteerRegistrationModal";

const Volunteer = () => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const [openModal, setOpenModal] = useState(false);

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
        aria-label="Volunteer tabs"
      >
        <Tab label="Add Volunteer Events" />
        <Tab label="Volunteer Registration" />
      </Tabs>

      {/* Render tab content based on active tab */}
      {activeTab === 0 && <AddVoluteerEventsTab handleOpenModal={handleOpenModal} />}
      {activeTab === 1 && <VolunteerRegistrationTab />}
    

      {/* Modal */}
      <AddVoluteerEventsModal open={openModal} handleClose={handleCloseModal} />
      <VolunteerRegistrationModal open={openModal} handleClose={handleCloseModal} />
    </Box>
  );
};

export default Volunteer;
