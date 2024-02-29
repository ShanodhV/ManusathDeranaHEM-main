import React, { useState } from "react";
import { Box, useTheme, Avatar, Button, Tab, Tabs } from "@mui/material";
import Header from "components/Header";
import { useNavigate } from "react-router-dom"; 
import GoogleMap from "components/GoogleMap";

const HealthCamps = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

 
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Health Camps"
        subtitle="Manage Health Camps"
      />
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="standard"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="Sipsal Pubuduwa tabs"
      >
        <Tab label="Health Camps" />
        <Tab label="Pateint Registration" />
        <Tab label="Lab Report" />
      </Tabs>
      {activeTab === 0 && (
        <Box>
        </Box>
      )}
      {activeTab === 1 && (
        <Box>
        </Box>
      )}
      {activeTab === 2 && (
        <Box>
          
        </Box>
      )}
    </Box>
  );
};

export default HealthCamps;

