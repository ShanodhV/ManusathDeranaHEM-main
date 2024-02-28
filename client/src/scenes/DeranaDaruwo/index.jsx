import React, { useState } from "react";
import { Box, useTheme,} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
//import MainContent from "./MainContent";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { Avatar, Button, Tab, Tabs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const DeranaDaruwo = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

 
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Derana Daruwo "
        subtitle="Manage Derana Daruwo Scholarship Program"
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

export default DeranaDaruwo;