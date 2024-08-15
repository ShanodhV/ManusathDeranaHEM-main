import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Snackbar,
} from "@mui/material";
import Buttons from "components/Buttons";
import CustomButton from "components/Buttons";
import CustomTextField from "components/CustomTextField";
import { useEffect, useState } from "react";
import { useUpdateVolunteerMutation } from "state/api";

const EditVolunteerModal = ({ openModal, handleCloseModal, volunteerData, onVolunteerUpdated }) => {
  const [volunteerNIC, setVolunteerNIC] = useState("");
  const [volunteerName, setVolunteerName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [volunteerAddress, setVolunteerAddress] = useState("");
  const [location, setLocation] = useState({ province: "", district: "", town: "" });
  const [occupation, setOccupation] = useState("");
  const [status, setStatus] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [errors, setErrors] = useState({
    nic: "",
    mobile: "",
    dateOfBirth: "",
  });

  const [updateVolunteer] = useUpdateVolunteerMutation();

  useEffect(() => {
    if (volunteerData) {
      setVolunteerNIC(volunteerData.volunteerNIC);
      setVolunteerName(volunteerData.volunteerName);
      setDateOfBirth(formatDateToDDMMYYYY(volunteerData.dateOfBirth)); // Use formatting function here
      setContactNumber(volunteerData.contactNumber);
      setVolunteerAddress(volunteerData.volunteerAddress);
      setLocation(volunteerData.location);
      setOccupation(volunteerData.occupation);
      setStatus(volunteerData.status);
    }
  }, [volunteerData]);

  const verifyNIC = (nic) => {
    const nicPattern = /^(\d{9}[Vv]|\d{12})$/;
    return nicPattern.test(nic);
  };

  const verifyMobileNumber = (number) => {
    const mobilePattern = /^\d{10}$/;
    return mobilePattern.test(number);
  };

  const formatDateToDDMMYYYY = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleUpdateVolunteer = () => {
    const newErrors = {
      nic: "",
      mobile: "",
      dateOfBirth: "",
    };

    if (!verifyNIC(volunteerNIC)) {
      newErrors.nic = "Invalid NIC format. Use 9 digits followed by 'V' or 12 digits without 'V'.";
    }

    if (!verifyMobileNumber(contactNumber)) {
      newErrors.mobile = "Invalid mobile number format. Use exactly 10 digits.";
    }

    if (!isValidDate(dateOfBirth)) {
      newErrors.dateOfBirth = "Invalid date format. Use DD/MM/YYYY.";
    }

    setErrors(newErrors);

    if (newErrors.nic || newErrors.mobile || newErrors.dateOfBirth) {
      return; // Exit early if there are validation errors
    }

    const isoDate = convertToISO(dateOfBirth);

    updateVolunteer({
      id: volunteerData._id,
      volunteerNIC,
      volunteerName,
      dateOfBirth: isoDate,
      contactNumber,
      volunteerAddress,
      location,
      occupation,
      status,
    })
      .then((response) => {
        console.log("Volunteer updated successfully:", response);
        setOpenSnackbar({ open: true, message: "Volunteer updated successfully!", severity: "success" });
        if (onVolunteerUpdated) {
          onVolunteerUpdated();
        }
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error updating Volunteer:", error);
        setOpenSnackbar({ open: true, message: "Error updating volunteer", severity: "error" });
      });
  };

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
    setDateOfBirth(formattedValue);

    if (!isValidDate(formattedValue)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dateOfBirth: "Invalid date format. Use DD/MM/YYYY.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dateOfBirth: "",
      }));
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar({ open: false, message: "", severity: "success" });
  };

  const handleProvinceChange = (event) => {
    setLocation({ ...location, province: event.target.value, district: "", town: "" });
  };

  const handleDistrictChange = (event) => {
    setLocation({ ...location, district: event.target.value, town: "" });
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
      "Mullaitivu": ["Mullaitivu", "Oddusuddan", "Puthukudiyiruppu", "Weli Oya"]
    },
    "Eastern": {
      "Trincomalee": ["Trincomalee", "Kinniya", "Mutur", "Kuchchaveli"],
      "Batticaloa": ["Batticaloa", "Kaluwanchikudy", "Valachchenai", "Eravur"],
      "Ampara": ["Ampara", "Akkaraipattu", "Kalmunai", "Sainthamaruthu", "Pottuvil"]
    },
    "North Western": {
      "Kurunegala": ["Kurunegala", "Kuliyapitiya", "Narammala", "Wariyapola", "Pannala", "Melsiripura"],
      "Puttalam": ["Puttalam", "Chilaw", "Wennappuwa", "Anamaduwa", "Nattandiya", "Dankotuwa"]
    },
    "North Central": {
      "Anuradhapura": ["Anuradhapura", "Kekirawa", "Thambuttegama", "Eppawala", "Medawachchiya"],
      "Polonnaruwa": ["Polonnaruwa", "Kaduruwela", "Medirigiriya", "Hingurakgoda"]
    },
    "Uva": {
      "Badulla": ["Badulla", "Bandarawela", "Haputale", "Welimada", "Mahiyanganaya", "Passara"],
      "Monaragala": ["Monaragala", "Bibile", "Wellawaya", "Medagama", "Buttala"]
    },
    "Sabaragamuwa": {
      "Ratnapura": ["Ratnapura", "Embilipitiya", "Balangoda", "Pelmadulla", "Eheliyagoda", "Kuruwita"],
      "Kegalle": ["Kegalle", "Mawanella", "Warakapola", "Rambukkana", "Galigamuwa"]
    }
  };
  

  const provinces = Object.keys(sriLankanData);
  const districts = location.province ? Object.keys(sriLankanData[location.province]) : [];
  const towns = location.province && location.district ? sriLankanData[location.province][location.district] : [];

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
    "Hospitality and Tourism"
];
  const statusOptions = ["Active", "Inactive"];

  return (
    <Dialog
    fullScreen
    open={openModal}
    onClose={handleCloseModal}
    aria-labelledby="form-dialog-title"
    aria-describedby="form-dialog-description"
  >
        <DialogTitle sx={{ bgcolor: "#f0f0f0" }} id="form-dialog-title">
          <div style={{ color: "#d63333", fontWeight: '700', fontSize: '16px' }}>
            {"Update Volunteers"}
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
      <DialogContent dividers>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <label style={labelStyle}>NIC Number</label>
              <CustomTextField
                fullWidth
                variant="outlined"
                value={volunteerNIC}
                onChange={(e) => setVolunteerNIC(e.target.value)}
                error={!!errors.nic}
                helperText={errors.nic}
              />
            </Grid>
            <Grid item xs={6}>
              <label style={labelStyle}>Full Name</label>
              <CustomTextField
                fullWidth
                variant="outlined"
                value={volunteerName}
                onChange={(e) => setVolunteerName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <label style={labelStyle}>Date of Birth</label>
              <CustomTextField
                fullWidth
                variant="outlined"
                value={dateOfBirth}
                onChange={handleDateChange}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth || "Enter date as DD/MM/YYYY"}
                placeholder="DD/MM/YYYY"
                inputProps={{ pattern: "[0-9]*" }}
              />
            </Grid>
            <Grid item xs={6}>
              <label style={labelStyle}>Contact Number</label>
              <CustomTextField
                fullWidth
                variant="outlined"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                error={!!errors.mobile}
                helperText={errors.mobile}
              />
            </Grid>
            <Grid item xs={12}>
              <label style={labelStyle}>Address</label>
              <CustomTextField
                fullWidth
                variant="outlined"
                value={volunteerAddress}
                onChange={(e) => setVolunteerAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <label style={labelStyle}>Province</label>
              <CustomTextField
                fullWidth
                select
                variant="outlined"
                value={location.province}
                onChange={handleProvinceChange}
              >
                {provinces.map((province) => (
                  <MenuItem key={province} value={province}>
                    {province}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={4}>
              <label style={labelStyle}>District</label>
              <CustomTextField
                fullWidth
                select
                variant="outlined"
                value={location.district}
                onChange={handleDistrictChange}
                disabled={!location.province}
              >
                {districts.map((district) => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={4}>
              <label style={labelStyle}>Town</label>
              <CustomTextField
                fullWidth
                select
                variant="outlined"
                value={location.town}
                onChange={handleTownChange}
                disabled={!location.district}
              >
                {towns.map((town) => (
                  <MenuItem key={town} value={town}>
                    {town}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={6}>
              <label style={labelStyle}>Occupation</label>
              <CustomTextField
                fullWidth
                select
                variant="outlined"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              >
                {occupationOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={6}>
              <label style={labelStyle}>Status</label>
              <CustomTextField
                fullWidth
                select
                variant="outlined"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <div sx={{ display: 'flex', gap: '10px',marginRight: '10px' }}>
        <Buttons label="Update" onClick={handleUpdateVolunteer} >
        </Buttons>
        <Buttons label="Cancel" onClick={handleCloseModal}>
        </Buttons>
        </div>

      </Box>
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={openSnackbar.severity}>
          {openSnackbar.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default EditVolunteerModal;
