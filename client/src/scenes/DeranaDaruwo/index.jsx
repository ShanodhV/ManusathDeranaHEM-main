import React, { useState } from "react";
import { Box, TextField, useTheme, Grid} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
//import MainContent from "./MainContent";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { Avatar, Button, Tab, Tabs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Buttons from "components/Buttons";

const DeranaDaruwo = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

 const handleChange = (e) => {
  const {name, value} = e.target;
 };

 const handleClick = () => {
  console.log("Button clicked!");
};

 const handleSubmit = (e) => {
    e.preventDefault();
  };

  const labelStyle = {
    fontWeight: " bold",
    color: "black", 
    fontSize: "16px",
    margintop: "80px"
    
  }

  return (
    <Box m="1.5rem 2.5rem" sx={{mt:3}}>
      <Header
        title="Derana Daruwo "
        subtitle="Manage Derana Daruwo Scholarship Program"
      />
      <Tabs sx={{mt:2}}
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
         
        <form onSubmit={handleSubmit}>
          <Box sx={{mt:6}}>
          <label 
          style={labelStyle}
          htmlFor="Program ID">Program ID</label>
            <TextField 
  
              variant="outlined"
              name="ProgramID"
              fullWidth
              sx={{
                mt: 2,
                '& .MuiOutlinedInput-root': {
                  padding: '0px',
                  '& fieldset': {
                    borderWidth: '3px',
                  },
                },
              }}
            />
            </Box>

          <Box sx={{mt:2}}>
          <label 
          style={labelStyle}
          htmlFor="Location">Location</label>
          <Grid container spacing={2} sx={{mt:0}}> 
              <Grid item xs={4}> 
                <TextField
                  select
                  variant="outlined"
                  fullWidth
                  label="Province"
                  sx={{ 
            
                    '& fieldset': {
                      borderWidth: '3px',
                    },
                  }}
                 
                >
                  
                </TextField>
              </Grid>
              <Grid item xs={4}> 
                <TextField
                  select
                  variant="outlined"
                  fullWidth
                  label="District"
                  sx={{ 
            
                    '& fieldset': {
                      borderWidth: '3px',
                    },
                  }}
                 
                
                >
            
                </TextField>
              </Grid>
              <Grid item xs={4}> 
                <TextField
                  select
                  variant="outlined"
                  fullWidth
                  label="Town"
                  sx={{ 
            
                    '& fieldset': {
                      borderWidth: '3px',
                    },
                  }}
                 
                >
                </TextField>
              </Grid>
            </Grid>
            </Box> 
            <Box sx={{mt:10}}>
              <label
              style={labelStyle}
               htmlFor="Area Officer Details">Area Officer Details</label>
            </Box>

            <Box sx={{mt:5}}>
          <label 
          style={labelStyle}
          htmlFor="Name">Name</label>
            <TextField 
  
              variant="outlined"
              name="Name"
              fullWidth
              sx={{
                mt: 2,
                '& .MuiOutlinedInput-root': {
                  padding: '0px',
                  '& fieldset': {
                    borderWidth: '3px',
                  },
                },
              }}
            />
            </Box>

            <Box sx={{mt:2}}>
          <label 
          style={labelStyle}
          htmlFor="MObile Number">Mobile Number</label>
            <TextField 
  
              variant="outlined"
              name="Mobile Number"
              fullWidth
              sx={{
                mt: 2,
                '& .MuiOutlinedInput-root': {
                  padding: '0px',
                  '& fieldset': {
                    borderWidth: '3px',
                  },
                },
              }}
            />
            </Box>
            <Box sx={{mt:3}}>
              <Buttons onClick={handleClick} label="Create Programm" />
            </Box>
           
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