import React, { useState, useEffect, setRows} from "react";
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
  const [selectedRow, setSelectedRow] = useState(null);

  
  
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

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [ProgramDetails,setProgramDetails] = useState({});
  const handelCreateProgram = () => {
    console.log(ProgramDetails);
    handleCloseModal();
  }


  const labelStyle = {
    fontWeight: " bold",
    color: "black", 
    fontSize: "16px",
    margintop: "80px"
    
  }

  const columns1 = [
    { field: 'Program ID', headerName: 'Program ID', width: 235 },
    { field: 'Location', headerName: 'Location', width: 250 },
    { field: 'Area Officer Name', headerName: 'Area Officer Name', type: 'text', width: 250 },
    { field: 'Area Officer PhoneNo.', headerName: 'Area Officer PhoneNo.', width: 220 },
    { field: 'Actions', headerName: 'Action', width: 250 },
  ];

  const columns2 = [
    { field: 'Student Name', headerName: 'Student Name', width: 235 },
    { field: 'Student Address', headerName: 'Student Address', width: 250 },
    { field: 'Program ID', headerName: 'Program Id', type: 'text', width: 250 },
    { field: 'Student ID', headerName: 'Student ID', width: 220 },
    { field: 'Actions', headerName: 'Action', width: 250 },
  ];

  const columns3 = [
    { field: 'Donor Name', headerName: 'Donor Name', width: 200 },
    { field: 'Donor Address', headerName: 'Donor Address', width: 160 },
    { field: 'Donor ContactNo.', headerName: 'Donor ContactNo.', width: 160 },
    { field: 'Donor ID', headerName: 'Donor ID', width: 160 },
    { field: 'Program ID', headerName: 'Program Id', type: 'text', width: 160 },
    { field: 'Student ID', headerName: 'Student ID', width: 160 },
    { field: 'Actions', headerName: 'Action', width: 205 },
  ];

  const rows = [];
  const columns = [];

  const handleCreateProgram = () => {
    // Generate a random Program ID
    const programId = Math.floor(1000 + Math.random() * 9000);
    console.log("Random Program ID:", programId);
    handleCloseModal(); // Close the modal after creating a program
  };

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const rows1 = [
    { id: 1, ProgramID: 123, Location: 'Location A', AreaOfficerName: 'John Doe', AreaOfficerPhoneNo: '123-456-7890', Actions: '' },
    { id: 2, ProgramID: 456, Location: 'Location B', AreaOfficerName: 'Jane Doe', AreaOfficerPhoneNo: '987-654-3210', Actions: '' },
    // Add more rows as needed
  ];

  const rows2 = [
    { id: 1, ProgramID: 123, Location: 'Location A', AreaOfficerName: 'John Doe', AreaOfficerPhoneNo: '123-456-7890', Actions: '' },
    { id: 2, ProgramID: 456, Location: 'Location B', AreaOfficerName: 'Jane Doe', AreaOfficerPhoneNo: '987-654-3210', Actions: '' },
    // Add more rows as needed
  ];

  const rows3 = [
    { id: 1, ProgramID: 123, Location: 'Location A', AreaOfficerName: 'John Doe', AreaOfficerPhoneNo: '123-456-7890', Actions: '' },
    { id: 2, ProgramID: 456, Location: 'Location B', AreaOfficerName: 'Jane Doe', AreaOfficerPhoneNo: '987-654-3210', Actions: '' },
    // Add more rows as needed
  ];

  useEffect(() => {
    // Fetch data from the database using an API call
    const fetchData = async () => {
      try {
        // Make an API call to fetch data
        const response = await fetch('your_api_endpoint');
        const data = await response.json();
        // Update the rows state with the fetched data
        setRows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

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

        <Box mt={8} height="calc(100vh - 250px)" sx={{ '& .MuiDataGrid-root': { border: 'none' }, '& .MuiDataGrid-columnHeader': { backgroundColor: theme.palette.primary.main }, '& .MuiDataGrid-row': { borderBottom: `1px solid ${theme.palette.primary.light}` } }}>
  <DataGrid
    rows={rows}
    columns={columns1}
    pageSize={10}
    rowsPerPageOptions={[10, 20, 50]}
    autoHeight
    disableSelectionOnClick
    onRowClick={(params) => handleOpenModal(params.row)}
  />
</Box>
        
        <Box>
          </Box>
          <Modal 
          open = {openModal}
          onClose={handleCloseModal}
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

           <Grid item xs={6} >
      <label style={labelStyle} htmlFor="Program ID">
        Program ID
      </label>
      <TextField
            name="programId"
            label="Program ID"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
        {/* Add dropdown options here */}
      
    </Grid>
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
                <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-start" }}>
  <Buttons onClick={handleClick} label="Save" sx={{ mr: 20}} /> 
  <Buttons onClick={handleClick} label="Cancel" sx={{marginLeft: 20}}/>
</Box>
<Box sx={{ mt: 3, display: "flex", justifyContent: "flex-start" }}>
  
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

        <Box mt={8} height="calc(100vh - 250px)" sx={{ '& .MuiDataGrid-root': { border: 'none' }, '& .MuiDataGrid-columnHeader': { backgroundColor: theme.palette.primary.main }, '& .MuiDataGrid-row': { borderBottom: `1px solid ${theme.palette.primary.light}` } }}>
  <DataGrid
    rows={rows}
    columns={columns2}
    pageSize={10}
    rowsPerPageOptions={[10, 20, 50]}
    autoHeight
    disableSelectionOnClick
    onRowClick={(params) => handleOpenModal(params.row)}
  />
</Box>
        <Modal 
        open = {openModal}
        onClose={handleCloseModal}
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
            <Grid item xs={6}>
      <label style={labelStyle} htmlFor="Student ID">
        Student ID
      </label>
      <TextField
        select
        variant="outlined"
        fullWidth
        label="Select Program ID"
        sx={{ mt:1,
          "& fieldset": {
            borderWidth: "3px",
          },
        }}
      >
        
      </TextField>
    </Grid>
            </Box>
        <Box sx={{mt:1}}>
            <Grid item xs={6}>

      <label style={labelStyle} htmlFor="Program ID">
        Program ID
      </label>
      <TextField
            name="programId"
            label="Program ID"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
        
      
  
            </Grid>
            </Box>
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
          <Buttons label={"Register Donor"} onClick={handelOpenModal}/>
        </Box>

        <Box mt={8} height="calc(100vh - 250px)" sx={{ '& .MuiDataGrid-root': { border: 'none' }, '& .MuiDataGrid-columnHeader': { backgroundColor: theme.palette.primary.main }, '& .MuiDataGrid-row': { borderBottom: `1px solid ${theme.palette.primary.light}` } }}>
  <DataGrid
   rows={rows}
   columns={columns3}
   pageSize={10}
   rowsPerPageOptions={[10, 20, 50]}
   autoHeight
   disableSelectionOnClick
   onRowClick={(params) => handleOpenModal(params.row)}
 />
</Box>

        <Modal
        open = {openModal}
        onClose={handleCloseModal}
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
          <h2 id="modal-modal-titel">Register Volunteer Donors</h2>
          
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

            <Box sx={{ mt: 1 }}>
  <Grid item xs={6}>
    <label style={labelStyle} htmlFor="Donor ID">
      Donor ID
    </label>
    <TextField
      select
      variant="outlined"
      fullWidth
      label="Select Donor ID"
      sx={{
        "& fieldset": {
          borderWidth: "3px",
        },
        marginTop: "8px", 
      }}
    >
     
    </TextField>
  </Grid>
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
          marginTop: "8px",
        }}
      >
       
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
          marginTop: "8px",
        }}
      >
       
      </TextField>
    </Grid>
  </Grid>
</Box>

        <Box sx={{mt:4,mb:4}}>
          <Buttons label={"Register Donor"}/>
        </Box>
          
        </Box>
        </Modal>
        </>
      )}
      {activeTab === 3 && (
        <Box>
          {/* <h1>Next Area Predictor</h1> */}
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