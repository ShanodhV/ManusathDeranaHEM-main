import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import AddVolunteerEventsModal from "./AddVolunteerEventsModal";
import AddVolunteerEventsTab from "./AddVolunteerEventsTab";
import VolunteerRegistrationModal from "./VolunteerRegistrationModal";
import VolunteerRegistrationTab from "./VolunteerRegistrationTab";

const Volunteer = () => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const [openModal, setOpenModal] = useState(false); // State to manage modal visibility

  // Handles tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Opens the modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Closes the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box m="1.5rem 2.5rem">
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
      {activeTab === 0 && (
        <AddVolunteerEventsTab handleOpenModal={handleOpenModal} />
      )}
      {activeTab === 1 && (
        <VolunteerRegistrationTab handleOpenModal={handleOpenModal} />
      )}

      {/* Modals */}
      {activeTab === 0 && (
        <AddVolunteerEventsModal openModal={openModal} handleCloseModal={handleCloseModal} />
      )}
      {activeTab === 1 && (
        <VolunteerRegistrationModal openModal={openModal} handleCloseModal={handleCloseModal} />
      )}
    </Box>
  );
};

export default Volunteer;
