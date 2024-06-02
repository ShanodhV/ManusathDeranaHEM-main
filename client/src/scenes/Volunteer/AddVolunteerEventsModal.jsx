import { Box, Grid, Modal } from "@mui/material";
import Buttons from "components/Buttons";
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
        <h2 id="modal-modal-titel">Add Volunteer Events</h2>

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
          <label style={labelStyle} htmlFor="Event Date">
            Event Date
          </label>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={2.5}>
              <CustomTextField
                select
                label="Month"
                variant="outlined"
                fullWidth
                value={eventDate.month}
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
                value={eventDate.day}
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
                value={eventDate.year}
                onChange={handleYearChange}
              >
                {/* Year options */}
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
          <label style={labelStyle} htmlFor="Add Location">
            Location
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

        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'space-between' }}>
          <Buttons onClick={handleAddVolunteerEvent} label="Add" /> {/* Add button */}
          <Buttons onClick={handleCloseModal} label="Cancel" /> {/* Cancel button */}
        </Box>

      </Box>
    </Modal>
  );
};

export default AddVolunteerEventsModal;

