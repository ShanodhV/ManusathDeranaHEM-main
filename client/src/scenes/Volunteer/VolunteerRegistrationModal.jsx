import { Box, Grid, Modal } from "@mui/material";
import Buttons from "components/Buttons";
import CustomTextField from "components/CustomTextField"; // Import your custom TextField component
import { useState } from "react";
import { useAddVolunteerMutation } from "state/api"; // Adjust the import according to your file structure

const VolunteerRegistrationModal = ({ openModal, handleCloseModal }) => {
  const [volunteerNIC, setVolunteerNIC] = useState("");
  const [volunteerName, setVolunteerName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState({ month: "", day: "", year: "" });
  const [contactNumber, setContactNumber] = useState("");
  const [volunteerAddress, setVolunteerAddress] = useState("");
  const [location, setLocation] = useState({ province: "", district: "", town: "" });
  const [occupation, setOccupation] = useState("");
  const [status, setStatus] = useState("");

  const [addVolunteer] = useAddVolunteerMutation();

  const handleAddVolunteer = () => {
    addVolunteer({
      volunteerNIC,
      volunteerName,
      dateOfBirth,
      contactNumber,
      volunteerAddress,
      location,
      occupation,
      status,
    })
      .then((response) => {
        console.log("Volunteer added successfully from frontend:", response);
        // Clear form fields
        setVolunteerNIC("");
        setVolunteerName("");
        setDateOfBirth({ month: "", day: "", year: "" });
        setContactNumber("");
        setVolunteerAddress("");
        setLocation({ province: "", district: "", town: "" });
        setOccupation("");
        setStatus("");
      })
      .catch((error) => {
        console.error("Error adding Volunteer:", error);
      });
  };

  const handleMonthChange = (event) => {
    setDateOfBirth({ ...dateOfBirth, month: event.target.value });
  };

  const handleDayChange = (event) => {
    setDateOfBirth({ ...dateOfBirth, day: event.target.value });
  };

  const handleYearChange = (event) => {
    setDateOfBirth({ ...dateOfBirth, year: event.target.value });
  };

  const handleProvinceChange = (event) => {
    setLocation({ ...location, province: event.target.value });
  };

  const handleDistrictChange = (event) => {
    setLocation({ ...location, district: event.target.value });
  };

  const handleTownChange = (event) => {
    setLocation({ ...location, town: event.target.value });
  };

  const labelStyle = {
    fontWeight: "bold",
    color: "black",
    fontSize: "16px",
    marginTop: "16px",
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-titel"
      aria-describedby="model-model-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 600,
          bgcolor: "#fff",
          borderRadius: "20px",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
        }}
      >
        <h2 id="modal-modal-titel">Volunteer Registration</h2>

        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Volunteer’s NIC"
            variant="outlined"
            fullWidth
            value={volunteerNIC}
            onChange={(e) => setVolunteerNIC(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Volunteer’s Name"
            variant="outlined"
            fullWidth
            value={volunteerName}
            onChange={(e) => setVolunteerName(e.target.value)}
          />
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <label style={labelStyle} htmlFor="Date Of Birth">
            Date of Birth
          </label>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={2.5}>
              <CustomTextField
                select
                label="Month"
                variant="outlined"
                fullWidth
                value={dateOfBirth.month}
                onChange={handleMonthChange}
              >
                {/* Month options */}
              </CustomTextField>
            </Grid>
            <Grid item xs={2.5}>
              <CustomTextField
                select
                label="Day"
                variant="outlined"
                fullWidth
                value={dateOfBirth.day}
                onChange={handleDayChange}
              >
                {/* Day options */}
              </CustomTextField>
            </Grid>
            <Grid item xs={2.5}>
              <CustomTextField
                select
                label="Year"
                variant="outlined"
                fullWidth
                value={dateOfBirth.year}
                onChange={handleYearChange}
              >
                {/* Year options */}
              </CustomTextField>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Contact Number"
            variant="outlined"
            fullWidth
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Volunteer’s Address"
            variant="outlined"
            fullWidth
            value={volunteerAddress}
            onChange={(e) => setVolunteerAddress(e.target.value)}
          />
        </Box>

        <Box sx={{ mt: 4 }}>
          <label style={labelStyle} htmlFor="Add Location name">
            Add Location Name
          </label>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={2.5}>
              <CustomTextField
                select
                label="Province"
                variant="outlined"
                fullWidth
                value={location.province}
                onChange={handleProvinceChange}
              >
                {/* Province options */}
              </CustomTextField>
            </Grid>
            <Grid item xs={2.5}>
              <CustomTextField
                select
                label="District"
                variant="outlined"
                fullWidth
                value={location.district}
                onChange={handleDistrictChange}
              >
                {/* District options */}
              </CustomTextField>
            </Grid>
            <Grid item xs={2.5}>
              <CustomTextField
                select
                label="Town"
                variant="outlined"
                fullWidth
                value={location.town}
                onChange={handleTownChange}
              >
                {/* Town options */}
              </CustomTextField>
            </Grid>
          </Grid>
        </Box>
       
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Occupation"
            variant="outlined"
            fullWidth
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <CustomTextField
            label="Status"
            variant="outlined"
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            />
          </Box>
  
          <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
            <Buttons onClick={handleAddVolunteer} label="Register" />
          </Box>
        </Box>
      </Modal>
    );
  };
  
  export default VolunteerRegistrationModal;
  
