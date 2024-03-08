import React, { useState } from "react";
import { Box, TextField, useTheme, Grid, Modal, Select, MenuItem} from "@mui/material";
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

  const handelOpenModal = () => {
    setOpenModal(true);
  };

  const handelCloseModal = () => {
    setOpenModal(false);
  };

  const [ProgramDetails,setProgramDetails] = useState({});
  const handelCreateProgram = () => {
    console.log(ProgramDetails);
    handelCloseModal();
  }

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
        <><Box sx={{ marginRight: "20px", position: "absolute", top: "20", right: "70px", display: "inline-flex", alignItems: "center", justifyItems: "center" }}>
          <Buttons label={"Create Program"} onClick={handelOpenModal}/>
        </Box>
        <Box>
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


           <Box sx={{ mt: 6 }}>

                  <label
                    style={labelStyle}
                    htmlFor="Program ID">Program ID</label>
                  <TextField

                    variant="outlined"
                    name="ProgramID"
                    fullWidth
                    sx={{
                      mt: 1,
                      '& .MuiOutlinedInput-root': {
                        padding: '0px',
                        '& fieldset': {
                          borderWidth: '3px',
                        },
                      },
                    }} />
                </Box>

                <Box sx={{ mt: 1 }}>
                  <label
                    style={labelStyle}
                    htmlFor="Location">Location</label>
                  <Grid container spacing={2} sx={{ mt: 0 }}>
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
                <Box sx={{ mt: 6 }}>
                  <label
                    style={labelStyle}
                    htmlFor="Area Officer Details">Area Officer Details</label>
                </Box>

                <Box sx={{ mt: 4}}>
                  <label
                    style={labelStyle}
                    htmlFor="Name">Name</label>
                  <TextField

                    variant="outlined"
                    name="Name"
                    fullWidth
                    sx={{
                      mt: 1,
                      '& .MuiOutlinedInput-root': {
                        padding: '0px',
                        '& fieldset': {
                          borderWidth: '3px',
                        },
                      },
                    }} />
                </Box>

                <Box sx={{ mt: 1 }}>
                  <label
                    style={labelStyle}
                    htmlFor="MObile Number">Mobile Number</label>
                  <TextField

                    variant="outlined"
                    name="MobileNumber"
                    fullWidth
                    sx={{
                      mt: 1,
                      '& .MuiOutlinedInput-root': {
                        padding: '0px',
                        '& fieldset': {
                          borderWidth: '3px',
                        },
                      },
                    }} />
                </Box>
                <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
  <Buttons onClick={handleClick} label="Save" sx={{ mr: 5}} /> 
  <Buttons onClick={handleClick} label="Cancel" />
</Box>
                
          </Box>
          </Modal>
          </>
      )}
      {activeTab === 1 && (
        <>
        <Box sx={{ marginRight: "20px", position: "absolute", top: "20", right: "70px", display: "inline-flex", alignItems: "center", justifyItems: "center" }}>
          <Buttons label={"Register Student"} onClick={handelOpenModal}/>
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

          <h2 id="modal-modal-titel">Register Students</h2>
          
            <Box sx={{mt: 4}}>
            <label 
          style={labelStyle}
          htmlFor="Student Name">Student Name</label>
            <TextField 
  
              variant="outlined"
              name="StudentName"
              fullWidth
              sx={{
                mt: 1,
                '& .MuiOutlinedInput-root': {
                  padding: '0px',
                  '& fieldset': {
                    borderWidth: '3px',
                  },
                },
              }}
            />
            </Box>

            <Box sx={{mt:1}}>
            <label 
          style={labelStyle}
          htmlFor="Student Address">Student Address</label>
            <TextField 
  
              variant="outlined"
              name="StudentAddress"
              fullWidth
              sx={{
                mt: 1,
                '& .MuiOutlinedInput-root': {
                  padding: '0px',
                  '& fieldset': {
                    borderWidth: '3px',
                  },
                },
              }}
            />
            </Box>

            <Box sx={{mt:1}}>
            <label 
          style={labelStyle}
          htmlFor="Student ID">Student ID</label>
            <TextField 
  
              variant="outlined"
              name="StudentID"
              fullWidth
              sx={{
                mt: 1,
                '& .MuiOutlinedInput-root': {
                  padding: '0px',
                  '& fieldset': {
                    borderWidth: '3px',
                  },
                },
              }}
            />
            </Box>

            <Grid item xs={6}>
            <label 
          style={labelStyle}
          htmlFor="Program ID">Program ID</label>
            <Select
  
              variant="outlined"
              fullWidth
              label = "Select Program ID"
              sx={{
                "& fieldset": {
                  borderWidth: "3px",
                },
              }}
            >
              {/* Add dropdown options here */}
    <MenuItem value="program1">Program 1</MenuItem>
    <MenuItem value="program2">Program 2</MenuItem>
    <MenuItem value="program3">Program 3</MenuItem>
    {/* Add more MenuItem components for additional options */}
  </Select>
            </Grid>

            <Box sx={{mt:5}}>
            <label 
          style={labelStyle}
          htmlFor="Parent's Details">Parent's Details</label>
            
            </Box>

            <Box sx={{mt:4}}>
            <label 
          style={labelStyle}
          htmlFor="Parent Name">Parent Name</label>
            <TextField 
  
              variant="outlined"
              name="ParentName"
              fullWidth
              sx={{
                mt: 1,
                '& .MuiOutlinedInput-root': {
                  padding: '0px',
                  '& fieldset': {
                    borderWidth: '3px',
                  },
                },
              }}
            />
            </Box> 

            <Box sx={{mt:1}}>
            <label 
          style={labelStyle}
          htmlFor="Parent Contact number">Parent Contact number</label>
            <TextField 
  
              variant="outlined"
              name="ParentContactNumber"
              fullWidth
              sx={{
                mt: 1,
                '& .MuiOutlinedInput-root': {
                  padding: '0px',
                  '& fieldset': {
                    borderWidth: '3px',
                  },
                },
              }}
            />
            </Box>

            <Box sx={{mt:6}}>
            <label 
          style={labelStyle}
          htmlFor="Bank Account Details">Bank Account Details</label>
            
            </Box> 
            <Box>
            <Grid container spacing={2} sx={{ mt: 2 }}>
  <Grid item xs={6}>
    <label style={labelStyle} htmlFor="Bank Name">
      Bank Name
    </label>
    <TextField
      variant="outlined"
      name="BankName"
      fullWidth
      sx={{
        mt: 1,
        "& .MuiOutlinedInput-root": {
          padding: "0px",
          "& fieldset": {
            borderWidth: "3px",
          },
        },
      }}
    />
  </Grid>
  <Grid item xs={6}>
    <label style={labelStyle} htmlFor="Account Number">
      Account Number
    </label>
    <TextField
      variant="outlined"
      name="AccountNumber"
      fullWidth
      sx={{
        mt: 1,
        "& .MuiOutlinedInput-root": {
          padding: "0px",
          "& fieldset": {
            borderWidth: "3px",
          },
        },
      }}
    />
  </Grid>
</Grid>
            </Box>

            <Box sx={{mt:4,mb:4}}>
              <Buttons label={"Register Student"}/>
            </Box>
          
        </Box>
        </Modal>
        </>
      )}

      {activeTab === 2 && (
        <>
        <Box sx={{ marginRight: "20px", position: "absolute", top: "20", right: "70px", display: "inline-flex", alignItems: "center", justifyItems: "center" }}>
          <Buttons label={"Register Dornor"} onClick={handelOpenModal}/>
        </Box>
        <Modal
        open = {openModal}
        onClose={handelCloseModal}
        arial-labelledby = "modal-modal-titel"
        aria-describedby = "model-model-description"
        >
        <Box sx={{
          
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
          {/* <h1>Volunteer Donor Registration</h1> */}
          <h2 id="modal-modal-titel">Register Volunteer Dornors</h2>
          
          <Box sx={{mt:4}}>
            <label 
          style={labelStyle}
          htmlFor="Donor Name">Donor Name</label>
            <TextField 
  
              variant="outlined"
              name="DonorName"
              fullWidth
              sx={{
                mt: 1,
                '& .MuiOutlinedInput-root': {
                  padding: '0px',
                  '& fieldset': {
                    borderWidth: '3px',
                  },
                },
              }}
            />
            </Box>

            <Box sx={{mt:1}}>
            <label 
          style={labelStyle}
          htmlFor="Donor Address">Donor Address</label>
            <TextField 
  
              variant="outlined"
              name="DonorAddress"
              fullWidth
              sx={{
                mt: 1,
                '& .MuiOutlinedInput-root': {
                  padding: '0px',
                  '& fieldset': {
                    borderWidth: '3px',
                  },
                },
              }}
            />
            </Box>

            <Box sx={{mt:1}}>
            <label 
          style={labelStyle}
          htmlFor="Donor Contact Number">Donor Contact Number</label>
            <TextField 
  
              variant="outlined"
              name="DonorContactNumber"
              fullWidth
              sx={{
                mt: 1,
                '& .MuiOutlinedInput-root': {
                  padding: '0px',
                  '& fieldset': {
                    borderWidth: '3px',
                  },
                },
              }}
            />
            </Box>

            <Box sx={{mt:1}}>
            <label 
          style={labelStyle}
          htmlFor="Donor ID">Donor ID</label>
            <TextField 
  
              variant="outlined"
              name="DonorID"
              fullWidth
              sx={{
                mt: 1,
                '& .MuiOutlinedInput-root': {
                  padding: '0px',
                  '& fieldset': {
                    borderWidth: '3px',
                  },
                },
              }}
            />
            </Box>

            <Box sx={{ mt: 2 }}>
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <label style={labelStyle} htmlFor="Assign Student ID">
      Assign Student ID
      </label>
      <TextField
        select
        variant="outlined"
        fullWidth
        label="Assign Student ID"
        sx={{
          "& fieldset": {
            borderWidth: "3px",
          },
        }}
      >
        {/* Add dropdown options here */}
      </TextField>
    </Grid>
    <Grid item xs={6}>
      <label style={labelStyle} htmlFor="Program ID">
        Program ID
      </label>
      <TextField
        select
        variant="outlined"
        fullWidth
        label="Select Program ID"
        sx={{
          "& fieldset": {
            borderWidth: "3px",
          },
        }}
      >
        {/* Add dropdown options here */}
      </TextField>
    </Grid>
  </Grid>
</Box>

        <Box sx={{mt:4,mb:4}}>
          <Buttons label={"Register Dornor"}/>
        </Box>
          
        </Box>
        </Modal>
        </>
      )}
      {activeTab === 3 && (
        <Box>
          <h1>Next Area Predictor</h1>
          <form>
            <Box>

            </Box>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default DeranaDaruwo;