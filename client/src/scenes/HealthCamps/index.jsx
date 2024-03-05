import React, { useState } from "react";
import { Box, useTheme, Avatar, Button, Tab, Tabs, TextField, Grid } from "@mui/material";
import Header from "components/Header";
import { useNavigate } from "react-router-dom"; 
import GoogleMap from "components/GoogleMap";
import Buttons from "components/Buttons";

const HealthCamps = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const[openModal, setOpenModal] = useState(false);
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
    const handelOpenModal = () => {
      setOpenModal(true);
    };
  
    const handelCloseModal = () => {
      setOpenModal(false);
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
        <Tab label="Patient Registration" />
        <Tab label="Lab Report" />
        <Tab label="Data Viewer" />
        <Tab label="Camp Predictor" />
        <Tab label="Patient Data Analyzer" />
      </Tabs>

      {activeTab === 0 && (
        <Box>
        </Box>
      )}


      {activeTab === 1 && (
        <Box>
        <h1>Patient Registration</h1>
        <form>
            <Box sx={{mt:6}}>
            <label 
          style={labelStyle}
          htmlFor="Camp ID">Camp ID</label>
            <TextField 
  
              variant="outlined"
              name="CampID"
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
          htmlFor="Full Name">Full Name</label>
            <TextField 
  
              variant="outlined"
              name="FullName"
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
          htmlFor="NIC">NIC</label>
            <TextField 
  
              variant="outlined"
              name="NIC"
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
          htmlFor="Address">Address</label>
            <TextField 
  
              variant="outlined"
              name="Address"
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

            <Box sx={{mt:4}}>
            <label 
          style={labelStyle}
          htmlFor="Contact Number">Contact Number</label>
            <TextField 
  
              variant="outlined"
              name="ContactNumber"
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
          htmlFor="Emergency Contact Number">Emergency Contact Number</label>
            <TextField 
  
              variant="outlined"
              name="EmergencyContactNumber"
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

            <Box sx={{mt:4,mb:4}}>
              <Buttons label={"Register Patient"}/>
            </Box>
          </form>
        
          </Box>
      )}
      {activeTab === 2 && (
        <Box>
        </Box>
      )}

    {activeTab === 3 && (
        <Box>
        </Box>
      )}

       {activeTab === 4 && (
        <Box>
        </Box>
      )}

       {activeTab === 5 && (
        <Box>
          <h1>Patient Data Analyzer</h1>
          <h2>Analyze Patients by Health Camp</h2>
          <Box sx={{mt: 2}}>
      <label 
        style={labelStyle}
        htmlFor="healthCampId">Health Camp ID</label>
      <TextField
        select
        variant="outlined"
        fullWidth
        label="Select Health Camp ID"
        sx={{ 
          '& fieldset': {
            borderWidth: '3px',
          },
        }}
      >
      </TextField>
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
                  label="Select by Province"
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
                  label="Select by District"
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
                  label="Select by Town"
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
            <Box sx={{mt:3}}>
              <Buttons onClick={handleClick} label="View" />
            </Box>
            
          <h2>Analyze Patients by NIC</h2>
      <Box sx={{mt: 2}}>
        <label 
        style={labelStyle}
        htmlFor="healthCampId">Health Camp ID</label>
        <TextField
        select
        variant="outlined"
        fullWidth
        label="Select Health Camp ID"
        sx={{ 
          '& fieldset': {
            borderWidth: '3px',
          },
        }}
        >
       </TextField>
    </Box>

      <Box sx={{mt: 2}}>
        <label 
        style={labelStyle}
        htmlFor="NIC">NIC</label>
        <TextField
        select
        variant="outlined"
        fullWidth
        label="Select by NIC"
        sx={{ 
          '& fieldset': {
            borderWidth: '3px',
          },
        }}
        >
        </TextField>
    </Box>
    
          <Box sx={{mt:3}}>
              <Buttons onClick={handleClick} label="View" />
            </Box>

          <h2>Analyze Patients by Symptoms</h2>
          <Box sx={{mt:3}}>
              <Buttons onClick={handleClick} label="View" />
            </Box>
        </Box>
      )}

    </Box>
  );
};

export default HealthCamps;

