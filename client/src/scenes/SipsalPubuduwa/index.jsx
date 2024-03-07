import React, { useState, useEffect } from "react";
import { Avatar, Box,TextField, Button, Card, Grid, Tab, Tabs, useTheme, Modal } from "@mui/material";
import { useGetDonorsQuery, useDeleteDonorMutation } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { DataGrid } from "@mui/x-data-grid";
import Buttons from "components/Buttons";




const SipsalPubuduwa = () => {
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
      handelCloseModal(false);
    };

    const [ProgramDeatils, setProgramDeatils] = useState({});
    const handelCreateProgram = () => {
      console.log(ProgramDeatils);
      handelCloseModal();
    };
    
  
    const labelStyle = {
      fontWeight: " bold",
      color: "black", 
      fontSize: "16px",
      margintop: "80px"
      
    }

  
 
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
        <Tab label="School Registration" />
        <Tab label="View School Details" />
        <Tab label="Doner Registeration" />
        <Tab label="Next School PRedictor" />
        

      </Tabs>
      {activeTab === 0 && (
  <>
    <Box sx={{ marginRight: "20px", position: "absolute", top: "20", right: "70px", display: "inline-flex", alignItems: "center", justifyItems: "center" }}>
      <Buttons label={"Register School"} onClick={handelOpenModal}/>
    </Box>
    <Box>
    </Box>
    <Modal 
      open={openModal}
      onClose={handelCloseModal}
      aria-labelledby="modal-modal-titel"
      aria-describedby="model-model-description"
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
          overflowY:'auto'
        }}
      >
        <h1 id="modal-modal-titel">School Registration</h1>
        <Box>
          
          {/* <form onSubmit={handleSubmit}> */}
            <Box sx={{mt:6}}>
              <label 
                style={labelStyle}
                htmlFor="School ID">School ID</label>
              <TextField 
                variant="outlined"
                name="SchoolID"
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

            <Box sx={{mt:6}}>
              <label 
                style={labelStyle}
                htmlFor="School Name">School Name</label>
              <TextField 
                variant="outlined"
                name="SchoolName"
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

            <Box sx={{mt:6}}>
              <label 
                style={labelStyle}
                htmlFor="School Adress">School Address</label>
              <TextField 
                variant="outlined"
                name="SchoolAddress"
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
            
            <Box sx={{mt:6}}>
              <label 
                style={labelStyle}
                htmlFor="School MN">School Mobile Number</label>
              <TextField 
                variant="outlined"
                name="SchoolMN"
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

            <Box sx={{mt:10}}>
              <label
                style={labelStyle}
                htmlFor="Area Officer Details">Principle's Contact Information</label>
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
                name="PMobileNumber"
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
              <Buttons onClick={handleClick} label="Register" />
            </Box>
          {/* </form> */}
        </Box>
      </Box>
    </Modal>
  </>
)}


{activeTab === 1 && (
  <>
    <Box sx={{ marginRight: "20px", position: "absolute", top: "20", right: "70px", display: "inline-flex", alignItems: "center", justifyItems: "center" }}>
      <Buttons label={"View"} onClick={handelOpenModal}/>
    </Box>
    <Box>
    </Box>
    <Modal 
      open={openModal}
      onClose={handelCloseModal}
      aria-labelledby="modal-modal-titel"
      aria-describedby="model-model-description"
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
          overflowY:'auto'
        }}
      >
        <Box>
          <h1 id="modal-modal-titel">View School Details</h1>
          <form onSubmit={handleSubmit}>

          <Box sx={{mt:6}}>
          <label 
          style={labelStyle}
          htmlFor="School ID">School ID</label>
            <TextField 
  
              variant="outlined"
              name="SchoolID"
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

            <Box sx={{mt:6}}>
          <label 
          style={labelStyle}
          htmlFor="School Name">School Name</label>
            <TextField 
  
              variant="outlined"
              name="SchoolName"
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
              <Buttons onClick={handleClick} label="Search" />
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  </>
)}

      
      {/* {activeTab === 1 && (
        <Box>
          <h1>View School Details</h1>
          <form onSubmit={handleSubmit}>

          <Box sx={{mt:6}}>
          <label 
          style={labelStyle}
          htmlFor="School ID">School ID</label>
            <TextField 
  
              variant="outlined"
              name="SchoolID"
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

            <Box sx={{mt:6}}>
          <label 
          style={labelStyle}
          htmlFor="School Name">School Name</label>
            <TextField 
  
              variant="outlined"
              name="SchoolName"
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
              <Buttons onClick={handleClick} label="Search" />
            </Box>
          </form>
        </Box>
      )} */}

{activeTab === 2 && (
  <>
    <Box sx={{ marginRight: "20px", position: "absolute", top: "20", right: "70px", display: "inline-flex", alignItems: "center", justifyItems: "center" }}>
      <Buttons label={"Register Donor"} onClick={handelOpenModal}/>
    </Box>
    <Box>
    </Box>
    <Modal 
      open={openModal}
      onClose={handelCloseModal}
      aria-labelledby="modal-modal-titel"
      aria-describedby="model-model-description"
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
          overflowY:'auto'
        }}
      >
        <Box>
          <h1 id="modal-modal-titel">Donor Regsitration</h1>
          <form onSubmit={handleSubmit}>
          <Box sx={{mt:6}}>
          <label 
          style={labelStyle}
          htmlFor="Donor NIC">Donor NIC</label>
            <TextField 
  
              variant="outlined"
              name="DonorNIC"
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

            <Box sx={{mt:6}}>
          <label 
          style={labelStyle}
          htmlFor="Donor Name">Donor Name</label>
            <TextField 
  
              variant="outlined"
              name="DonorName"
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

            <Box sx={{mt:6}}>
          <label 
          style={labelStyle}
          htmlFor="Donor Adress">Donor Address</label>
            <TextField 
  
              variant="outlined"
              name="DonorAddress"
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
                htmlFor="DateOfBirth">Date of Birth</label>
              <Grid container spacing={2} sx={{mt:0}}> 
                <Grid item xs={4}> 
                  <TextField
                    select
                    variant="outlined"
                    fullWidth
                    label="Month"
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
                    label="Day"
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
                    label="Year"
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
 
            


            

        
          

            <Box sx={{mt:2}}>
          <label 
          style={labelStyle}
          htmlFor="MObile Number">Mobile Number</label>
            <TextField 
  
              variant="outlined"
              name="PMobileNumber"
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

            <Box sx={{mt:5}}>
          <label 
          style={labelStyle}
          htmlFor="Ocupation">Ocupation</label>
            <TextField 
  
              variant="outlined"
              name="ocupation"
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
              <Buttons onClick={handleClick} label="Register" />
            </Box>
         </form>
          
        </Box>
      </Box>
    </Modal>
  </>
)}

      


      
      {/* {activeTab === 2 && (
        <Box>
          <h1>Donor Regsitration</h1>
          <form onSubmit={handleSubmit}>
          <Box sx={{mt:6}}>
          <label 
          style={labelStyle}
          htmlFor="Donor NIC">Donor NIC</label>
            <TextField 
  
              variant="outlined"
              name="DonorNIC"
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

            <Box sx={{mt:6}}>
          <label 
          style={labelStyle}
          htmlFor="Donor Name">Donor Name</label>
            <TextField 
  
              variant="outlined"
              name="DonorName"
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

            <Box sx={{mt:6}}>
          <label 
          style={labelStyle}
          htmlFor="Donor Adress">Donor Address</label>
            <TextField 
  
              variant="outlined"
              name="DonorAddress"
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
                htmlFor="DateOfBirth">Date of Birth</label>
              <Grid container spacing={2} sx={{mt:0}}> 
                <Grid item xs={4}> 
                  <TextField
                    select
                    variant="outlined"
                    fullWidth
                    label="Month"
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
                    label="Day"
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
                    label="Year"
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
 
            


            

        
          

            <Box sx={{mt:2}}>
          <label 
          style={labelStyle}
          htmlFor="MObile Number">Mobile Number</label>
            <TextField 
  
              variant="outlined"
              name="PMobileNumber"
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

            <Box sx={{mt:5}}>
          <label 
          style={labelStyle}
          htmlFor="Ocupation">Ocupation</label>
            <TextField 
  
              variant="outlined"
              name="ocupation"
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
              <Buttons onClick={handleClick} label="Register" />
            </Box>
         </form>

          
          
        </Box>
      )} */}

      {activeTab === 3 &&(
        <Box>
         

        </Box>
      )}

    </Box>
  );
};

export default SipsalPubuduwa;
