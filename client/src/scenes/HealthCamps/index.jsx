import React, { useState } from "react";
import { Box, useTheme, Avatar, Button, Tab, Tabs, TextField, Grid,Modal} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useNavigate } from "react-router-dom"; 
import GoogleMap from "components/GoogleMap";
import Buttons from "components/Buttons";
import { Line } from "react-chartjs-2";

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

    const HeadingAlignment = () => {
    };
    const rows = [];
    const columns = [];

    const columns1 = [
      { field: 'Program ID', headerName: 'Program ID', width: 235 },
      { field: 'Location', headerName: 'Location', width: 250 },
      { field: 'Area Officer Name', headerName: 'Area Officer Name', type: 'text', width: 250 },
      { field: 'Area Officer PhoneNo.', headerName: 'Area Officer PhoneNo.', width: 220 },
      { field: 'Actions', headerName: 'Action', width: 250 },
    ];
    const columns2 = [
      { field: 'Program ID', headerName: 'Program ID', width: 235 },
      { field: 'Location', headerName: 'Location', width: 250 },
      { field: 'Area Officer Name', headerName: 'Area Officer Name', type: 'text', width: 250 },
      { field: 'Area Officer PhoneNo.', headerName: 'Area Officer PhoneNo.', width: 220 },
      { field: 'Actions', headerName: 'Action', width: 250 },
    ];
    
    const chartData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Patients Analyzed",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
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
        aria-label="Helath Camps tabs"
      >
        <Tab label="Health Camps" />
        <Tab label="Patient Registration" />
        <Tab label="Lab Report" />
        <Tab label="Data Viewer" />
        <Tab label="Camp Predictor" />
        <Tab label="Patient Data Analyzer" />
      </Tabs>

      {activeTab === 0 && (
         <Box><Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
         <Buttons label={"Create Program"} onClick={handelOpenModal}/>
       </Box>
       <Box mt={4}>
  <DataGrid
    rows={rows}
    columns={columns1}
    pageSize={10}
    rowsPerPageOptions={[10, 20, 50]}
    autoHeight
    disableSelectionOnClick
    onRowClick={(params) => handelOpenModal(params.row)}
    sx={{ marginTop: "4" }}
  />
    </Box>
      <Modal 
          open = {openModal}
          onClose={handelCloseModal}
          arial-labelledby = "modal-modal-titel"
          aria-describedby = "model-model-description"
          >
          <Box 
          sx={{
            position:"absolute",
            top: "50%",
            left: "50%",
            transform:"translate(-50%, -50%)",
            width: 800,
            height:700,
            bgcolor:"rgba(255, 255, 255, 0.9)",
            border:"2px solid #000",
            boxShadow:24,
            p: 4,
            overflowY: 'auto', 
            }}>

            <h2 id="modal-modal-titel">Create Health Camp</h2>

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
          htmlFor="Add Location name">Add Location Name</label>
          <Grid container spacing={2} sx={{mt:0}}> 
              <Grid item xs={2.5}> 
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
              <Grid item xs={2.5}> 
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
              <Grid item xs={2.5}> 
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
              <Grid item xs={2.5}> 
                <TextField
                  select
                  variant="outlined"
                  fullWidth
                  label="MOH"
                  sx={{ 
                    '& fieldset': {
                      borderWidth: '3px',
                    },
                  }}
                >
                </TextField>
              </Grid>
              <Box sx={{mt:2}}>
              <Buttons onClick={handleClick} label="Add another MOH" />
              </Box>
            </Grid>
            </Box> 
            <Box sx={{mt:3}}>
            <h2>Camp Contact Person</h2>
            </Box>
            <Box sx={{mt:3}}>
            <label 
          style={labelStyle}
          htmlFor="Name">Name</label>
            <TextField 
  
              variant="outlined"
              name="Name"
              label="John"
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
            <label 
          style={labelStyle}
          htmlFor="Mobile Number">Mobile Number</label>
            <TextField 
  
              variant="outlined"
              label="077xxxxxxx"
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
            <Box sx={{mt:2}}>
              <Buttons onClick={handleClick} label="Add another Mobile Number" />
              </Box>
            </Box>
            <Box sx={{mt:3}}>
            <h2>Add Camp Activities</h2>
            </Box>
            <Box sx={{mt:3}}>
            <label 
          style={labelStyle}
          htmlFor="Addcampactivities">Add Camp Activities</label>
            <TextField 
  
              variant="outlined"
              name="Addcampactivities"
              label="Camp Activities"
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
            <label 
          style={labelStyle}
          htmlFor="Addsponser">Add Sponser/Collaboratives</label>
            <TextField 
              variant="outlined"
              label="Sponser/Collaboratives"
              name="Addsponser"
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
              <Buttons onClick={handleClick} label="Add New Sponser" />
              </Box>

              <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                  <Buttons onClick={handleClick} label="Create Health Camp" />
              </Box>
        </Box>
        </Modal>
        </Box>
      )}


      {activeTab === 1 && (
        <Box><Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Buttons label={"Create Program"} onClick={handelOpenModal}/>
      </Box>
         
      {/* <Box mt={8} height="calc(100vh - 250px)" sx={{ '& .MuiDataGrid-root': { border: 'none' }, '& .MuiDataGrid-columnHeader': { backgroundColor: theme.palette.primary.main }, '& .MuiDataGrid-row': { borderBottom: 1px solid ${theme.palette.primary.light} } }}>

  </Box> */}

<Box mt={4}>
  <DataGrid
    rows={rows}
    columns={columns2}
    pageSize={10}
    rowsPerPageOptions={[10, 20, 50]}
    autoHeight
    disableSelectionOnClick
    onRowClick={(params) => handelOpenModal(params.row)}
    sx={{ marginTop: "4" }}
  />
    </Box>
      <Modal 
          open = {openModal}
          onClose={handelCloseModal}
          arial-labelledby = "modal-modal-titel"
          aria-describedby = "model-model-description"
          >
          <Box 
          sx={{
            position:"absolute",
            top: "50%",
            left: "50%",
            transform:"translate(-50%, -50%)",
            width: 800,
            height:700,
            bgcolor:"rgba(255, 255, 255, 0.9)",
            border:"2px solid #000",
            boxShadow:24,
            p: 4,
            overflowY: 'auto', 
            }}>

            <h2 id="modal-modal-titel">Create New Program</h2>

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
        
        
          </Box>
          </Modal>
          </Box>
          
      )}

  
      {activeTab === 2 && (
        <Box>
          <h1>Lab Report</h1>
        </Box>
      )}

    {activeTab === 3 && (
      
        <Box>
            <h1>View Data</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2 style={{ textAlign: 'left' }}>View Patient Data</h2>
                <Box sx={{mt: 2}}>
                  <label 
                    style={labelStyle}
                    htmlFor="Search">Search</label>
                  <TextField
                    select
                    variant="outlined"
                    fullWidth
                    label="Search"
                    sx={{ 
                      '& fieldset': {
                        borderWidth: '3px',
                      },
                    }}
                  >
                  </TextField>
                </Box>
                <h2 style={{textAlign: 'right'}}> View Health Camp Data </h2>
            </div>
            

        </Box>
      )}

       {activeTab === 4 && (
        <Box>
          <h1>Health Camp Predictor</h1>
        </Box>
      )}

       {activeTab === 5 && (

          <Box>
            <h1>Patient Data Analyzer</h1>
            <div>
              <h2>Patients Analyzed Over Time</h2>
              <Line data={chartData} />
            </div>
            <h2>Analyze Patients by Health Camp</h2>
           
            <Box sx={{mt: 2}}>
        <label 
          style={labelStyle}
          htmlFor="healthCampId">Health Camp ID</label>
        <TextField
          selec
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
              <Buttons onClick={handleClick} label="Analyze" />
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
              <Buttons onClick={handleClick} label="Analyze" />
            </Box>

          <h2>Analyze Patients by Symptoms and Location</h2>
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
            <Box sx={{mt: 3}}>
              <label 
                style={labelStyle}
                htmlFor="Symptom">Sympotom</label>
                <TextField
                select
                variant="outlined"
                fullWidth
                label="Select Symptom"
                sx={{ 
                  '& fieldset': {
                    borderWidth: '3px',
                  },
                }}
              >
              </TextField>
            </Box>

          <Box sx={{mt:3}}>
              <Buttons onClick={handleClick} label="Analyze" />
            </Box>
        </Box>
      )}

    </Box>
  );
};

export default HealthCamps;

