import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Snackbar } from "@mui/material";
import Buttons from "components/Buttons";
import CustomTextField from "components/CustomTextField"; // Import your custom TextField component
import { useState } from "react";
import { useAddVolunteerMutation } from "state/api"; // Adjust the import according to your file structure

const VolunteerRegistrationModal = ({ openModal, handleCloseModal,onVolunteerAdded  }) => {
  const [volunteerNIC, setVolunteerNIC] = useState("");
  const [volunteerName, setVolunteerName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState({ month: "", day: "", year: "" });
  const [contactNumber, setContactNumber] = useState("");
  const [volunteerAddress, setVolunteerAddress] = useState("");
  const [location, setLocation] = useState({ province: "", district: "", town: "" });
  const [occupation, setOccupation] = useState("");
  const [status, setStatus] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // State for handling errors
  const [errors, setErrors] = useState({
    nic: "",
    mobile: "",
  });

  const [addVolunteer] = useAddVolunteerMutation();

  // Function to verify NIC
  const verifyNIC = (nic) => {
    // Regular expression for NIC verification
    const nicPattern = /^(\d{9}[Vv]|\d{12})$/; // Matches 9 digits followed by 'V' or 'v' or 12 digits
    return nicPattern.test(nic);
  };

  // Function to verify mobile number
  const verifyMobileNumber = (number) => {
    // Regular expression for mobile number verification
    const mobilePattern = /^\d{10}$/; // Matches exactly 10 digits
    return mobilePattern.test(number);
  };

  // Function to check if NIC is already used
  const isNICUsed = (nic) => {
    // Mock data - replace with actual API call or state check
    const existingNICs = ["123456789V", "987654321V", "123456789012"];
    return existingNICs.includes(nic);
  };

  const handleAddVolunteer = () => {
    const newErrors = {
      nic: "",
      mobile: "",
    };

    // Validate NIC
    if (!verifyNIC(volunteerNIC)) {
      newErrors.nic = "Invalid NIC format. Use 9 digits followed by 'V' or 12 digits without 'V'.";
    } else if (isNICUsed(volunteerNIC)) {
      newErrors.nic = "This NIC is already used.";
    }

    // Validate Mobile Number
    if (!verifyMobileNumber(contactNumber)) {
      newErrors.mobile = "Invalid mobile number format. Use exactly 10 digits.";
    }

    // Update errors state with accumulated errors
    setErrors(newErrors);

    // Check if there are any errors
    if (newErrors.nic || newErrors.mobile) {
      return; // Exit early if there are validation errors
    }

    // Call API to add volunteer
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

        // Show success message
        setOpenSnackbar(true);

        if (onVolunteerAdded) {
          onVolunteerAdded();
        }
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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const labelStyle = {
    fontWeight: "bold",
    color: "black",
    fontSize: "16px",
    marginTop: "16px",
  };
 // Data structure for Sri Lankan locations
  const sriLankanData = {
    Western: {
      Colombo: ["Colombo", "Dehiwala", "Moratuwa", "Negombo", "Kelaniya"],
      Gampaha: ["Gampaha", "Nittambuwa", "Minuwangoda", "Ja-Ela", "Katunayake"],
      Kalutara: ["Kalutara", "Beruwala", "Panadura", "Horana", "Aluthgama"],
    },
    Central: {
      Kandy: ["Kandy", "Peradeniya", "Katugastota", "Gampola", "Nawalapitiya"],
      Matale: ["Matale", "Dambulla", "Sigiriya", "Habarana", "Rattota"],
      NuwaraEliya: ["Nuwara Eliya", "Hatton", "Talawakele", "Nanu Oya", "Bandarawela"],
    },
    Southern: {
      Galle: ["Galle", "Hikkaduwa", "Unawatuna", "Ambalangoda", "Karapitiya"],
      Matara: ["Matara", "Weligama", "Deniyaya", "Dickwella", "Akuressa"],
      Hambantota: ["Hambantota", "Tangalle", "Tissamaharama", "Beliatta", "Ambalantota"],
    },
  };
  

  return (
    <>
      {/* Full-screen Dialog for volunteer registration */}
      <Dialog
        fullScreen
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
        aria-describedby="form-dialog-description"
      >
        <DialogTitle sx={{ bgcolor: "#f0f0f0" }} id="form-dialog-title">
          <div style={{ color: "#d63333", fontWeight: '700', fontSize: '16px' }}>
            {"Volunteer Registration"}
            <hr style={{ borderColor: "#d63333" }} />
          </div>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey.500',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
  
        <DialogContent>
          <Box
            sx={{
              mt: 4,
              width: '100%',
              maxWidth: 900,
              mx: 'auto',
            }}
          >
            <CustomTextField
              label="Volunteer’s NIC"
              variant="outlined"
              fullWidth
              value={volunteerNIC}
              onChange={(e) => setVolunteerNIC(e.target.value)}
              error={!!errors.nic}
              helperText={errors.nic}
            />
  
            <Box sx={{ mt: 4 }}>
              <CustomTextField
                label="Volunteer’s Name"
                variant="outlined"
                fullWidth
                value={volunteerName}
                onChange={(e) => setVolunteerName(e.target.value)}
              />
            </Box>
  
            <Box sx={{ mt: 4 }}>
              <label style={{ fontWeight: 'bold', fontSize: '16px' }} htmlFor="Date Of Birth">
                Date of Birth
              </label>
              <Grid container spacing={2} sx={{ mt: 0 }}>
                <Grid item xs={4}>
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
                <Grid item xs={4}>
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
                <Grid item xs={4}>
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
  
            <Box sx={{ mt: 4 }}>
              <CustomTextField
                label="Contact Number"
                variant="outlined"
                fullWidth
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                error={!!errors.mobile}
                helperText={errors.mobile}
              />
            </Box>
  
            <Box sx={{ mt: 4 }}>
              <CustomTextField
                label="Volunteer’s Address"
                variant="outlined"
                fullWidth
                value={volunteerAddress}
                onChange={(e) => setVolunteerAddress(e.target.value)}
              />
            </Box>
  
            <Box sx={{ mt: 4 }}>
              <label style={{ fontWeight: 'bold', fontSize: '16px' }} htmlFor="Add Location name">
                Add Location Name
              </label>
              <Grid container spacing={2} sx={{ mt: 0 }}>
                <Grid item xs={4}>
                  <CustomTextField
                    select
                    label="Province"
                    variant="outlined"
                    fullWidth
                    value={location.province}
                    onChange={handleProvinceChange}
                  >
                    {/* Province options */}
                    <MenuItem value="">
                      <em>Select Province</em>
                    </MenuItem>
                    {Object.keys(sriLankanData).map((province) => (
                      <MenuItem key={province} value={province}>
                        {province}
                      </MenuItem>
                    ))}

                  </CustomTextField>
                </Grid>
                <Grid item xs={4}>
                  <CustomTextField
                    select
                    label="District"
                    variant="outlined"
                    fullWidth
                    value={location.district}
                    onChange={handleDistrictChange}
                    disabled={!location.province} // Disable if no province is selected
                  >
                    {/* District options */}

                    <MenuItem value="">
                      <em>Select District</em>
                    </MenuItem>
                    {location.province &&
                      Object.keys(sriLankanData[location.province]).map(
                        (district) => (
                          <MenuItem key={district} value={district}>
                            {district}
                          </MenuItem>
                        )
                      )}


                  </CustomTextField>
                </Grid>
                <Grid item xs={4}>
                  <CustomTextField
                    select
                    label="Town"
                    variant="outlined"
                    fullWidth
                    value={location.town}
                    onChange={handleTownChange}
                    disabled={!location.district} // Disable if no district is selected
                  >
                    {/* Town options */}

                    <MenuItem value="">
                      <em>Select Town</em>
                    </MenuItem>
                    {location.district &&
                      sriLankanData[location.province][location.district].map(
                        (town) => (
                          <MenuItem key={town} value={town}>
                            {town}
                          </MenuItem>
                        )
                      )}


                  </CustomTextField>
                </Grid>
              </Grid>
            </Box>
  
            <Box sx={{ mt: 4 }}>
              <CustomTextField
                label="Occupation"
                variant="outlined"
                fullWidth
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </Box>
  
            <Box sx={{ mt: 4 }}>
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
        </DialogContent>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success"
          sx={{
            backgroundColor: 'black',
            color: 'white',
          }}>
          Event successfully added
        </Alert>
      </Snackbar>
    </>
  );
};

export default VolunteerRegistrationModal;
