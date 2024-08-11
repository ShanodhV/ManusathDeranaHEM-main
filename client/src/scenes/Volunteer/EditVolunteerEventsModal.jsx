import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ListItemText,
  MenuItem,
  Select,
  Snackbar
} from "@mui/material";
import CustomTextField from "components/CustomTextField"; // Import your custom TextField component
import { useEffect, useState } from "react";
import { useUpdateVolunteerEventMutation } from "state/api"; // Assume you have this mutation for updating

const EditVolunteerEventModal = ({ openModal, handleCloseModal, eventData }) => {
  // Set initial state using eventData
  const [eventName, setEventName] = useState(eventData.eventName || "");
  const [eventCategory, setEventCategory] = useState(eventData.eventCategory || "");
  const [eventDate, setEventDate] = useState(eventData.eventDate || "");
  const [venue, setVenue] = useState(eventData.venue || "");
  const [location, setLocation] = useState(eventData.location || { province: "", district: "", town: "" });
  const [relatedOccupations, setRelatedOccupations] = useState(eventData.relatedOccupations || []);
  const [description, setDescription] = useState(eventData.description || "");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [updateVolunteerEvent] = useUpdateVolunteerEventMutation();

  const [date, setDate] = useState(eventData.eventDate || '');
  const [errors, setErrors] = useState({});

  // Ensure the state is updated if the eventData changes
  useEffect(() => {
    setEventName(eventData.eventName || "");
    setEventCategory(eventData.eventCategory || "");
    setEventDate(eventData.eventDate || "");
    setVenue(eventData.venue || "");
    setLocation(eventData.location || { province: "", district: "", town: "" });
    setRelatedOccupations(eventData.relatedOccupations || []);
    setDescription(eventData.description || "");
    setDate(eventData.eventDate || "");
  }, [eventData]);

  // Function to handle updating the volunteer event
  const handleUpdateVolunteerEvent = () => {
    if (!isValidDate(eventDate)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        eventDate: "Invalid date format. Use DD/MM/YYYY.",
      }));
      return;
    }
  
    // Convert the date to ISO format
    const isoDate = convertToISO(eventDate);

    updateVolunteerEvent({
      id: eventData.id, // Pass the event ID to update the correct entry
      eventName,
      eventCategory,
      eventDate: isoDate,
      venue,
      location,
      relatedOccupations,
      description,
    })
      .then((response) => {
        console.log("Volunteer event updated successfully:", response);
        // Show success message
        setOpenSnackbar(true);
        handleCloseModal(); // Optionally close the modal after updating
      })
      .catch((error) => {
        console.error("Error updating volunteer event:", error);
      });
  };

  // Date handling functions
  const formatDate = (value) => {
    const digits = value.replace(/\D/g, '');
    const day = digits.slice(0, 2);
    const month = digits.slice(2, 4);
    const year = digits.slice(4, 8);
    return `${day}${day && month ? '/' : ''}${month}${month && year ? '/' : ''}${year}`;
  };

  const isValidDate = (value) => {
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    return dateRegex.test(value);
  };

  const convertToISO = (value) => {
    const [day, month, year] = value.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatDate(value);
    setDate(formattedValue);
    setEventDate(formattedValue); 
  
    if (!isValidDate(formattedValue)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "Invalid date format. Use DD/MM/YYYY.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "",
      }));
    }
  };

  // Location change handlers
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

  // Options for event categories
  const eventCategoryOptions = [
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
  ].map((category) => ({
    value: category,
    label: category,
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
    "Western": {
      "Colombo": ["Colombo 1", "Colombo 2", "Colombo 3", "Colombo 4", "Colombo 5", "Colombo 6", "Colombo 7", "Colombo 8", "Colombo 9", "Colombo 10", "Colombo 11", "Colombo 12", "Colombo 13", "Colombo 14", "Colombo 15"],
      "Gampaha": ["Negombo", "Gampaha", "Veyangoda", "Wattala", "Minuwangoda", "Ja-Ela", "Kadawatha", "Ragama", "Divulapitiya", "Nittambuwa", "Kiribathgoda"],
      "Kalutara": ["Kalutara", "Panadura", "Horana", "Beruwala", "Aluthgama", "Matugama", "Wadduwa", "Bandaragama", "Ingiriya"]
    },
    "Central": {
      "Kandy": ["Kandy", "Gampola", "Nawalapitiya", "Peradeniya", "Akurana", "Kadugannawa", "Katugastota"],
      "Matale": ["Matale", "Dambulla", "Sigiriya", "Nalanda", "Ukuwela", "Rattota"],
      "Nuwara Eliya": ["Nuwara Eliya", "Hatton", "Nanu Oya", "Talawakele", "Bandarawela", "Welimada"]
    },
    "Southern": {
      "Galle": ["Galle", "Hikkaduwa", "Ambalangoda", "Elpitiya", "Bentota", "Baddegama"],
      "Matara": ["Matara", "Weligama", "Mirissa", "Akurugoda", "Hakmana", "Devinuwara"],
      "Hambantota": ["Hambantota", "Tangalle", "Tissamaharama", "Ambalantota", "Beliatta", "Weeraketiya"]
    },
    "Northern": {
      "Jaffna": ["Jaffna", "Nallur", "Chavakachcheri", "Point Pedro", "Karainagar", "Velanai"],
      "Kilinochchi": ["Kilinochchi", "Pallai", "Paranthan", "Poonakary"],
      "Mannar": ["Mannar", "Nanattan", "Madhu", "Pesalai"],
      "Vavuniya": ["Vavuniya", "Nedunkeni", "Settikulam", "Vavuniya South"],
      "Mullaitivu": ["Mullaitivu", "Oddusuddan", "Puthukudiyiruppu", "Kumulamunai"]
    },
    "Eastern": {
      "Batticaloa": ["Batticaloa", "Kalmunai", "Valaichchenai", "Koralai Pottuvil", "Eravur"],
      "Ampara": ["Ampara", "Uhana", "Sampur", "Pottuvil"],
      "Trincomalee": ["Trincomalee", "Kantalai", "Muttur", "Nilaveli", "Sampaltivu"]
    },
    "North Western": {
      "Kurunegala": ["Kurunegala", "Mawathagama", "Dambulla", "Narammala", "Hettipola"],
      "Puttalam": ["Puttalam", "Chilaw", "Nawagaththegama", "Kalpitiya"]
    },
    "North Central": {
      "Anuradhapura": ["Anuradhapura", "Mihintale", "Thambuththegama", "Tissamaharamaya"],
      "Polonnaruwa": ["Polonnaruwa", "Hingurakgoda", "Giritale", "Lankapura"]
    },
    "Uva": {
      "Badulla": ["Badulla", "Ella", "Hali-Ela", "Bopaththalawa", "Meegahakivula"],
      "Monaragala": ["Monaragala", "Bibile", "Medagama", "Kataragama"]
    },
    "Western Province": {
      "Colombo": ["Colombo", "Dehiwala", "Mount Lavinia", "Kollupitiya", "Bambalapitiya", "Havelock Town"],
      "Gampaha": ["Gampaha", "Ja-Ela", "Wattala", "Minuwangoda", "Negombo"]
    },
    "Southern Province": {
      "Galle": ["Galle", "Hikkaduwa", "Ambalangoda", "Bentota"],
      "Matara": ["Matara", "Weligama", "Mirissa"]
    }
  };

  return (
    <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="md">
      <DialogTitle>Edit Volunteer Event</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextField
              label="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              label="Event Category"
              value={eventCategory}
              onChange={(e) => setEventCategory(e.target.value)}
              fullWidth
            >
              {eventCategoryOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label="Event Date (DD/MM/YYYY)"
              value={date}
              onChange={handleDateChange}
              fullWidth
              error={!!errors.date}
              helperText={errors.date}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label="Venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              label="Province"
              value={location.province}
              onChange={handleProvinceChange}
              fullWidth
            >
              {Object.keys(sriLankanData).map((province) => (
                <MenuItem key={province} value={province}>
                  {province}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Select
              label="District"
              value={location.district}
              onChange={handleDistrictChange}
              fullWidth
              disabled={!location.province}
            >
              {sriLankanData[location.province] ? Object.keys(sriLankanData[location.province]).map((district) => (
                <MenuItem key={district} value={district}>
                  {district}
                </MenuItem>
              )) : []}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Select
              label="Town"
              value={location.town}
              onChange={handleTownChange}
              fullWidth
              disabled={!location.district}
            >
              {sriLankanData[location.province]?.[location.district] || []}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Select
              label="Related Occupations"
              multiple
              value={relatedOccupations}
              onChange={handleRelatedOccupationsChange}
              renderValue={(selected) => selected.join(", ")}
              fullWidth
            >
              {occupationOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Checkbox checked={relatedOccupations.indexOf(option.value) > -1} />
                  <ListItemText primary={option.label} />
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button onClick={handleUpdateVolunteerEvent} color="primary">
          Update Event
        </Button>
      </DialogActions>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Event updated successfully!
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default EditVolunteerEventModal;
