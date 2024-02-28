import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Tab, Tabs, useTheme } from "@mui/material";
import { useGetDonorsQuery, useDeleteDonorMutation } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { DataGrid } from "@mui/x-data-grid";


const SipsalPubuduwa = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

 
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Sipsal Pubuduwa"
        subtitle="Manage School donation Programs"
      />
      <Tabs
        value={activeTab}
        onChange={handleTabChange}   
        variant="standard"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="Sipsal Pubuduwa tabs"
      >
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        <Tab label="Tab 3" />
        <Tab label="Tab 4" />

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

export default SipsalPubuduwa;
