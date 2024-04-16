import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import Header from "components/Header";
import HealthCampsTab from "./HealthCampsTab";
import PatientRegistrationTab from "./PatientRegistrationTab";
import LabReportTab from "./LabReportTab";
import DataViewerTab from "./DataViewerTab";
import CampPredictorTab from "./CampPredictorTab";
import PatientDataAnalyzerTab from "./PatientDataAnalyzerTab";

const HealthCamps = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Health Camps" subtitle="Manage Health Camps" />
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
      {activeTab === 0 && <HealthCampsTab />}
      {activeTab === 1 && <PatientRegistrationTab />}
      {activeTab === 2 && <LabReportTab />}
      {activeTab === 3 && <DataViewerTab />}
      {activeTab === 4 && <CampPredictorTab />}
      {activeTab === 5 && <PatientDataAnalyzerTab />}
    </Box>
  );
};

export default HealthCamps;