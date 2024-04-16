import { Box, Grid, Modal, Tab, Tabs, TextField, useTheme, } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Buttons from "components/Buttons";
import Header from "components/Header";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css"; // Import custom CSS file for DatePicker

const Volunteer = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const [dateOfBirth, setDateOfBirth] = useState(null); // State to manage date of birth

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const[openModal, setOpenModal] = useState(false);


  const handleDateChange = (date) => {
    setDateOfBirth(date);
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

  const labelS = {
    fontWeight: "bold",
    color: "black", 
    fontSize: "16px",
    marginTop: "80px",
    marginBottom: "80px" // Change margin bottom here
  };

  const handleClick = () => {
    console.log("Button clicked!");
  };

  const columns1 = [
    { field: 'Volunteer NIC', headerName: 'Volunteer’s NIC', width: 235 },
    { field: 'Volunteer Name', headerName: 'Volunteer’s Name', width: 250 },
    { field: 'Date of Birth', headerName: 'Date of Birth', width: 250 },
    { field: 'Contact Number', headerName: 'Contact Number', width: 220 },
    { field: 'Volunteer’s Address', headerName: 'Volunteer’s Address', width: 250 },
    { field: 'Status', headerName: 'Status', width: 250 },
  ];

  const columns2 = [
    { field: 'Event Name', headerName: 'Event Name', width: 235 },
    { field: 'Event Category', headerName: 'Event Category', width: 250 },
    { field: 'Event Date', headerName: 'Event Date', width: 250 },
    { field: 'Venue', headerName: 'Venue', width: 220 },
    { field: 'Related Occupations', headerName: 'Related Occupations', width: 250 },
    { field: 'Description', headerName: 'Description', width: 250 },
  ];

  const rows = [];
  const columns = [];

  
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Volunteers Managment"
        subtitle="Manage Volunteery Programs"
      />
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="standard"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="Sipsal Pubuduwa tabs"
      >
        <Tab label="Volunteer  Registration" />
        <Tab label="Add Volunteer Events" />

      </Tabs>
      {activeTab === 0 && (
        <><Box sx={{ marginRight: "20px", position: "absolute", top: "20", right: "70px", display: "inline-flex", alignItems: "center", justifyItems: "center" }}>
          <Buttons label={"Register Volunteer"} onClick={handelOpenModal}/>
        </Box>

        
        <Box mt={8}>
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
          <h1 id="modal-modal-title">Volunteer Registration</h1>

        <Box sx={{mt:6}}>
            <label 
          style={labelStyle}
          htmlFor="Volunteer’s NIC">Volunteer’s NIC</label>
            <TextField 
  
              variant="outlined"
              name="Volunteer’s NIC"
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
          htmlFor="Volunteer’s Name">Volunteer’s Name</label>
            <TextField
  
              variant="outlined"
              name="Volunteer’s Name"
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
            


            <Box mt={6}>
            <label style={labelStyle} htmlFor="Volunteer’s Name">Date of Birth</label>
              <Grid container spacing={2} mt={0}>
                <Grid item xs={2}>

                  <Box>
                    
                    <DatePicker
                      selected={dateOfBirth}
                      onChange={handleDateChange}
                      dateFormat="dd"
                      placeholderText="Date"
                      className="date-picker"
                    />
                  </Box>
                </Grid>
              <Grid item xs={2}>
                <Box>
            
                  <DatePicker
                    selected={dateOfBirth}
                    onChange={handleDateChange}
                    dateFormat="MM"
                    placeholderText="Month"
                    className="date-picker"
                  />
                </Box>
              </Grid>
            <Grid item xs={2}>
              <Box>
             
                <DatePicker
                  selected={dateOfBirth}
                  onChange={handleDateChange}
                  dateFormat="yyyy"
                  placeholderText="Year"
                  className="date-picker"
                />
              </Box>
            </Grid>
          </Grid>
        </Box> 



            <Box sx={{mt:6}}>
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



            <Box sx={{mt:6}}>
            <label 
          style={labelStyle}
          htmlFor="Volunteer’s Address">Volunteer’s Address</label>
            <TextField 
  
              variant="outlined"
              name="Volunteer’s Address"
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




            <Box sx={{mt:6}}>
            <label 
          style={labelStyle}
          htmlFor="Occupation">Occupation</label>
            <TextField
  
              variant="outlined"
              name="Occupation"
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
          htmlFor="Status">Status</label>
            <TextField
  
              variant="outlined"
              name="Status"
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
              <Buttons label={"Register"}/>
            </Box>
            </Box>
            </Modal>
           
            </>
      )}






      {activeTab === 1 && (
        <><Box sx={{ marginRight: "20px", position: "absolute", top: "20", right: "70px", display: "inline-flex", alignItems: "center", justifyItems: "center" }}>
        <Buttons label={"Register Volunteer"} onClick={handelOpenModal}/>
        </Box>

        <Box mt={8}>
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
            <h1 id="modal-modal-title">Add Volunteer Events</h1>


          <Box sx={{mt:6}}>
            <label style={labelStyle} htmlFor="Event Name">Event Name</label>

            <TextField 
  
              variant="outlined"
              name="Event Name"
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
              <label style={labelStyle} htmlFor="Event Category">Event Category</label>

              <TextField 
      
                variant="outlined"
                name="Event Category "
                fullWidth
                sx={{
                  mt: 2,
                  '& .MuiOutlinedInput-root': {
                    padding: '0px',
                    '& fieldset': {
                      borderWidth: '3px',                    },
                    },
                  }}
                />
              </Box>

              <Box mt={6}>
                <label style={labelStyle} htmlFor="Volunteer’s Name">Event Date</label>
                <Grid container spacing={2} mt={0}>
                  <Grid item xs={2}>

                    <Box>
                        
                      <DatePicker
                        selected={dateOfBirth}
                        onChange={handleDateChange}
                        dateFormat="dd"
                        placeholderText="Date"
                        className="date-picker"
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={2}>

                    <Box>
                      <DatePicker
                        selected={dateOfBirth}
                        onChange={handleDateChange}
                        dateFormat="MM"
                        placeholderText="Month"
                        className="date-picker"
                      />
                    </Box>
                  </Grid>
                 <Grid item xs={2}>
                   <Box>
                      <DatePicker
                        selected={dateOfBirth}
                        onChange={handleDateChange}
                        dateFormat="yyyy"
                        placeholderText="Year"
                        className="date-picker"
                      />
                    </Box>
                  </Grid>
              </Grid>
            </Box> 

              

            <Box sx={{mt:6}}>
              <label style={labelStyle} htmlFor="Event Name">Event Name</label>

              <TextField 
    
                variant="outlined"
                name="Event Name"
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
              <label style={labelStyle} htmlFor="Venue">Venue</label>

              <TextField 
    
                variant="outlined"
                name="Venue"
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

            <Box sx={{ mt: 6 }}>
              <label style={labelStyle} htmlFor="Location">Location</label>
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

            <Box sx={{mt:6}}>
              <label style={labelStyle} htmlFor="Related Occupations"> Related Occupations </label>

              <TextField 
    
                variant="outlined"
                name="Related Occupations"
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
              <label style={labelStyle} htmlFor="Description">Description</label>

              <TextField 
    
                variant="outlined"
                name="Description"
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

            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'space-between' }}>
              <Buttons onClick={handleClick} label="Add" /> {/* Positioned to the left */}
              <Buttons onClick={handleClick} label="Cancel" /> {/* Positioned to the right */}
            </Box>

          </Box>
          </Modal>
          </>
      )}
      {activeTab === 2 && (
        <Box>
          
        </Box>
      )}

      {activeTab === 3 && (
        <Box>
          
        </Box>
      )}

      
    </Box>
  );
};

export default Volunteer;
