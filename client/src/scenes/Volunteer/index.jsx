import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import AddVolunteerEventsModal from "./AddVolunteerEventsModal";
import AddVolunteerEventsTab from "./AddVolunteerEventsTab";
import VolunteerRegistrationModal from "./VolunteerRegistrationModal";
import VolunteerRegistrationTab from "./VolunteerRegistrationTab";

const Volunteer = () => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

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
    setOpenUpdateModal(false);
    setCurrentEvent(null);
  };

  // Opens the update modal for events
  const handleOpenUpdateEventModal = (event) => {
    setCurrentEvent(event);
    setOpenModal(true);
    setOpenUpdateModal(true);
  };

  // Opens the update modal for volunteers
  const handleOpenUpdateVolunteerModal = (volunteer) => {
    setCurrentEvent(volunteer); // Here you can use a more appropriate state for volunteers
    setOpenModal(true);
    setOpenUpdateModal(true);
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
      {activeTab === 0 && (
        <AddVolunteerEventsTab handleOpenModal={handleOpenModal} handleOpenUpdateModal={handleOpenUpdateEventModal}/>
      )}
      {activeTab === 1 && (
        <VolunteerRegistrationTab handleOpenModal={handleOpenModal} handleOpenUpdateModal={handleOpenUpdateVolunteerModal}/>
      )}

      {/* Modals */}
      {activeTab === 0 && (
        <AddVolunteerEventsModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          currentEvent={currentEvent}
          isUpdateModal={openUpdateModal}
        />
      )}
      {activeTab === 1 && (
        <VolunteerRegistrationModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          currentEvent={currentEvent}
          isUpdateModal={openUpdateModal}
        />
      )}
    </Box>
  );
};

export default Volunteer;
