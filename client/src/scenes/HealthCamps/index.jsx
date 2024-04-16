import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import Buttons from "components/Buttons";
import HealthCampsTab from "./HealthCampsTab";
import PatientRegistrationTab from "./PatientRegistrationTab";
import DataViewerTab from "./DataViewerTab";
import LabReportTab from "./LabReportTab";
import PatientDataAnalyzerTab from "./PatientDataAnalyzerTab";
import CampPredictorTab from "./CampPredictorTab";
import HealthCampModal from "./HealthCampModal";

const HealthCamps = () => {
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
        aria-label="Health Camps tabs"
      >
        <Tab label="Health Camps" />
        <Tab label="Patient Registration" />
        <Tab label="Lab Report" />
        <Tab label="Data Viewer" />
        <Tab label="Camp Predictor" />
        <Tab label="Patient Data Analyzer" />
      </Tabs>

      {/* Render tab content based on active tab */}
      {activeTab === 0 && <HealthCampsTab handleOpenModal={handleOpenModal} />}
      {activeTab === 1 && <PatientRegistrationTab />}
      {activeTab === 2 && <LabReportTab />}
      {activeTab === 3 && <DataViewerTab />}
      {activeTab === 4 && <CampPredictorTab />}
      {activeTab === 5 && <PatientDataAnalyzerTab />}

      {/* Modal */}
      <HealthCampModal open={openModal} handleClose={handleCloseModal} />
    </Box>
  );
};

export default HealthCamps;
