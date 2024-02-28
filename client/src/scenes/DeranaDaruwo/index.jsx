import React, { useState } from "react";
import { Box, TextField, useTheme,} from "@mui/material";
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

 const handleChange = (e) => {
  const {name, value} = e.target;
 };

 const handleSubmit = (e) => {
    e.preventDefault();
  };

  const labelStyle = {
    fontWeight: " bold",
    color: "black", 
    fontSize: "16px"
  }

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
        <Tab label="Create a Program" />
        <Tab label="Student Registration" />
        <Tab label="Volunteer Donor Registration" />
        <Tab label="Next Area Predictor" />
      </Tabs>
      {activeTab === 0 && (
        <Box>
          <h2>Create Program</h2>
        <form onSubmit={handleSubmit}>
          <label 
          style={labelStyle}
          htmlFor="Program ID">Program ID</label>
            <TextField 
  
              variant="outlined"
              name="ProgramID"
              fullWidth
              sx={{
                mt: 1.5,
                '& .MuiOutlinedInput-root': {
                  padding: '0px',
                  '& fieldset': {
                    borderWidth: '2px',
                  },
                },
              }}
            />
        </form>
        </Box>
      )}
      {activeTab === 1 && (
        <Box>
          <h1>Student Registration</h1>
        </Box>
      )}
      {activeTab === 2 && (
        <Box>
          <h1>Volunteer Donor Registration</h1>
        </Box>
      )}
      {activeTab === 3 && (
        <Box>
          <h1>Next Area Predictor</h1>
        </Box>
      )}
    </Box>
  );
};

export default DeranaDaruwo;