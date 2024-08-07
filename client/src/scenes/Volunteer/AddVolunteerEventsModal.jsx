import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  ListItemText,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import CustomTextField from "components/CustomTextField"; // Import your custom TextField component
import { useState } from "react";
import { useAddVolunteerEventMutation } from "state/api"; // Adjust the import according to your file structure

const AddVolunteerEventsModal = ({ openModal, handleCloseModal }) => {
  const [eventName, setEventName] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventDate, setEventDate] = useState({ month: "", day: "", year: "" });
  const [venue, setVenue] = useState("");
  const [location, setLocation] = useState({ province: "", district: "", town: "" });
  const [relatedOccupations, setRelatedOccupations] = useState([]); // Changed to an array
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
        setRelatedOccupations([]);
        setDescription("");

        // Show success message
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error("Error adding Volunteer event:", error);
      });
  };

  const handleMonthChange = (event) => setEventDate({ ...eventDate, month: event.target.value });
  const handleDayChange = (event) => setEventDate({ ...eventDate, day: event.target.value });
  const handleYearChange = (event) => setEventDate({ ...eventDate, year: event.target.value });

  const handleProvinceChange = (event) => {
    const province = event.target.value;
    setLocation({ province, district: "", town: "" });
  };

  const handleDistrictChange = (event) => {
    const district = event.target.value;
    setLocation({ ...location, district, town: "" });
  };

  const handleTownChange = (event) => setLocation({ ...location, town: event.target.value });
  const handleRelatedOccupationsChange = (event) => setRelatedOccupations(event.target.value);

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  // Generate options for month, day, and year
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1).map((m) => ({
    value: m.toString(),
    label: m.toString().padStart(2, "0"),
  }));

  const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1).map((d) => ({
    value: d.toString(),
    label: d.toString().padStart(2, "0"),
  }));

  const yearOptions = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString()).map((y) => ({
    value: y,
    label: y,
  }));

  // Options for related occupations
  const occupationOptions = [
    "Technology and Information",
    "Healthcare and Medicine",
    "Engineering and Manufacturing",
    "Finance and Banking",
    "Education and Academia",
    "Law and Legal Services",
    "Business and Management",
    "Media and Communications",
    "Arts and Design",
    "Science and Research",
    "Construction and Real Estate",
    "Transportation and Logistics",
    "Agriculture and Food",
    "Energy and Environment",
    "Hospitality and Tourism",
  ].map((occupation) => ({
    value: occupation,
    label: occupation,
  }));

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
      {/* Dialog for adding volunteer events */}
      <Dialog
        fullScreen
        open={openModal} // State variable to control the dialog's open/close state
        onClose={handleCloseModal} // Function to close the dialog
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" sx={{ bgcolor: "#f0f0f0" }}>
          <div
            style={{ color: "#d63333", fontWeight: "700", fontSize: "16px" }}
          >
            {"Add Volunteer Events"}
            <hr style={{ borderColor: "#d63333" }} />
          </div>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "gray",
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
            <label
              style={{ fontWeight: "bold", fontSize: "16px", color: "black" }}
              htmlFor="Event Date"
            >
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
                  {monthOptions.map((option) => (
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
                  {dayOptions.map((option) => (
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
                  {yearOptions.map((option) => (
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
            <label
              style={{ fontWeight: "bold", fontSize: "16px", color: "black" }}
              htmlFor="Location"
            >
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

          <Box sx={{ mt: 6 }}>
            <label
              style={{ fontWeight: "bold", fontSize: "16px", color: "black" }}
              htmlFor="Related Occupations"
            >
              Related Occupations
            </label>
            <Select
              multiple
              displayEmpty
              value={relatedOccupations}
              onChange={handleRelatedOccupationsChange}
              renderValue={(selected) =>
                selected.length === 0
                  ? "Select related occupations"
                  : selected.join(", ")
              }
              fullWidth
              variant="outlined"
            >
              <MenuItem disabled value="">
                <em>Select related occupations</em>
              </MenuItem>
              {occupationOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Checkbox
                    checked={relatedOccupations.indexOf(option.value) > -1}
                  />
                  <ListItemText primary={option.label} />
                </MenuItem>
              ))}
            </Select>
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

        <DialogActions sx={{ p: 3, justifyContent: "space-between", bgcolor: "#f0f0f0" }}>
          <Button onClick={handleAddVolunteerEvent} color="secondary" variant="contained">
            Add
          </Button>
          <Button onClick={handleCloseModal} color="secondary" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            backgroundColor: "black",
            color: "white",
          }}
        >
          Event successfully added
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddVolunteerEventsModal;
