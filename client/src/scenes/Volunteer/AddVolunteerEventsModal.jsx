import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Snackbar } from "@mui/material";
import CustomTextField from "components/CustomTextField"; // Import your custom TextField component
import { useState } from "react";
import { useAddVolunteerEventMutation } from "state/api"; // Adjust the import according to your file structure

const AddVolunteerEventsModal = ({ openModal, handleCloseModal }) => {
  const [eventName, setEventName] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventDate, setEventDate] = useState({ month: "", day: "", year: "" });
  const [venue, setVenue] = useState("");
  const [location, setLocation] = useState({ province: "", district: "", town: "" });
  const [relatedOccupations, setRelatedOccupations] = useState("");
  const [description, setDescription] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar

  const [addVolunteerEvent] = useAddVolunteerEventMutation();

  const handleAddVolunteerEvent = () => {
    addVolunteerEvent({
      eventName,
      eventCategory,
      eventDate,
      venue,
      location,
      relatedOccupations,
      description,
    })
      .then((response) => {
        console.log("Volunteer event added successfully from frontend:", response);
        // Clear form fields
        setEventName("");
        setEventCategory("");
        setEventDate({ month: "", day: "", year: "" });
        setVenue("");
        setLocation({ province: "", district: "", town: "" });
        setRelatedOccupations("");
        setDescription("");

        // Show success message
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error("Error adding Volunteer event:", error);
      });
  };

  const handleMonthChange = (event) => {
    setEventDate({ ...eventDate, month: event.target.value });
  };

  const handleDayChange = (event) => {
    setEventDate({ ...eventDate, day: event.target.value });
  };

  const handleYearChange = (event) => {
    setEventDate({ ...eventDate, year: event.target.value });
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

  // Generate options for month, day, and year
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1).map(m => ({
    value: m.toString(),
    label: m.toString().padStart(2, '0'),
  }));

  const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1).map(d => ({
    value: d.toString(),
    label: d.toString().padStart(2, '0'),
  }));

  const yearOptions = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString()).map(y => ({
    value: y,
    label: y,
  }));

  // Dummy options for location
  const provinceOptions = ["Province A", "Province B", "Province C"].map(province => ({
    value: province,
    label: province,
  }));

  const districtOptions = ["District A", "District B", "District C"].map(district => ({
    value: district,
    label: district,
  }));

  const townOptions = ["Town A", "Town B", "Town C"].map(town => ({
    value: town,
    label: town,
  }));

  return (
    <>
      {/* Dialog for adding volunteer events */}
      <Dialog
        fullScreen
        open={openModal}  // State variable to control the dialog's open/close state
        onClose={handleCloseModal}  // Function to close the dialog
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" sx={{ bgcolor: "#f0f0f0" }}>
          <div style={{ color: "#d63333", fontWeight: '700', fontSize: '16px' }}>
            {"Add Volunteer Events"}
            <hr style={{ borderColor: "#d63333" }} />
          </div>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'gray',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
  
        <DialogContent sx={{ p: 4, overflowY: "auto" }}>
          <Box sx={{ mt: 6 }}>
            <CustomTextField
              label="Event Name"
              variant="outlined"
              fullWidth
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 6 }}>
            <CustomTextField
              label="Event Category"
              variant="outlined"
              fullWidth
              value={eventCategory}
              onChange={(e) => setEventCategory(e.target.value)}
            />
          </Box>
  
          <Box sx={{ mt: 4 }}>
            <label style={{ fontWeight: "bold", fontSize: "16px", color: "black" }} htmlFor="Event Date">
              Event Date
            </label>
            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid item xs={4}>
                <CustomTextField
                  select
                  label="Month"
                  variant="outlined"
                  fullWidth
                  value={eventDate.month}
                  onChange={handleMonthChange}
                >
                  {monthOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  select
                  label="Day"
                  variant="outlined"
                  fullWidth
                  value={eventDate.day}
                  onChange={handleDayChange}
                >
                  {dayOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  select
                  label="Year"
                  variant="outlined"
                  fullWidth
                  value={eventDate.year}
                  onChange={handleYearChange}
                >
                  {yearOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
            </Grid>
          </Box>
  
          <Box sx={{ mt: 6 }}>
            <CustomTextField
              label="Venue"
              variant="outlined"
              fullWidth
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </Box>
  
          <Box sx={{ mt: 4 }}>
            <label style={{ fontWeight: "bold", fontSize: "16px", color: "black" }} htmlFor="Add Location">
              Location
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
                  {provinceOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
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
                >
                  {districtOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
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
                >
                  {townOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
            </Grid>
          </Box>
  
          <Box sx={{ mt: 6 }}>
            <CustomTextField
              label="Related Occupations"
              variant="outlined"
              fullWidth
              value={relatedOccupations}
              onChange={(e) => setRelatedOccupations(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <CustomTextField
              label="Description"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
        </DialogContent>
  
        <DialogActions sx={{ p: 3, justifyContent: 'space-between', bgcolor: "#f0f0f0" }}>
          <Button
            onClick={handleAddVolunteerEvent}
            color="secondary"
            variant="contained"
          >
            Add
          </Button>
          <Button
            onClick={handleCloseModal}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  
      {/* Snackbar for success message */}
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

export default AddVolunteerEventsModal;
