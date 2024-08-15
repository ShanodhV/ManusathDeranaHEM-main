import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  MenuItem,
  Button,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CustomTextField from "components/CustomTextField";
import { useUpdateSchoolMutation } from "state/api";

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
  
const SchoolUpdateModal = ({ openModal, handleCloseModal, schoolData }) => {
  const theme = useTheme();
  const [schoolId, setSchoolId] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [schoolMobileNumber, setSchoolMobileNumber] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [principalContact, setPrincipalContact] = useState([{ pname: "", pnumber: "" }]);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);

  const [districts, setDistricts] = useState([]);
  const [towns, setTowns] = useState([]);
  const [updateSchool] = useUpdateSchoolMutation();

  useEffect(() => {
    if (schoolData) {
      setSchoolId(schoolData.schoolId);
      setSchoolName(schoolData.schoolName);
      setSchoolAddress(schoolData.schoolAddress);
      setSchoolMobileNumber(schoolData.schoolMobileNumber);
      setProvince(schoolData.location.province);
      setDistrict(schoolData.location.district);
      setTown(schoolData.location.town);
      setPrincipalContact(schoolData.principalContact);
    }
  }, [schoolData]);

  useEffect(() => {
    if (province) {
      setDistricts(Object.keys(sriLankanData[province]));
    } else {
      setDistricts([]);
    }
    setDistrict("");
    setTown("");
  }, [province]);

  useEffect(() => {
    if (district) {
      setTowns(sriLankanData[province][district]);
    } else {
      setTowns([]);
    }
    setTown("");
  }, [district]);


  const handlePrincipalContactChange = (index, field, value) => {
    const updateprincipalContacts = [...principalContact];
    updateprincipalContacts[index][field] = value;
    setPrincipalContact(updateprincipalContacts);
  }

  // const handlePrincipalContactChange = (index, field, value) => {
  //   setPrincipalContact((prevContacts) => {
  //     const updatedContacts = [...prevContacts];
  //     updatedContacts[index][field] = value;
  //     return updatedContacts;
  //   });
  // };

  const validatePhoneNumber = (number) => /^\d+$/.test(number);

  const handleUpdateSchool = () => {
    const newErrors = {};
    if (!schoolId) newErrors.schoolId = "School ID is required";
    if (!schoolName) newErrors.schoolName = "School Name is required";
    if (!schoolAddress) newErrors.schoolAddress = "School Address is required";
    if (!province) newErrors.province = "Province is required";
    if (!district) newErrors.district = "District is required";
    if (!town) newErrors.town = "Town is required";
    if (!schoolMobileNumber) newErrors.schoolMobileNumber = "School Mobile Number is required";
    else if (!validatePhoneNumber(schoolMobileNumber)) newErrors.schoolMobileNumber = "School Mobile Number must contain only numbers";
    principalContact.forEach((person, index) => {
      if (!person.pname) newErrors[`principalContact${index}pname`] = "Name is required";
      if (!person.pnumber) newErrors[`principalContact${index}pnumber`] = "Phone number is required";
      else if (!validatePhoneNumber(person.pnumber)) newErrors[`principalContact${index}pnumber`] = "Phone number must contain only numbers";
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      const schoolData = {
        schoolId,
        schoolName,
        schoolAddress,
        location: { province, district, town },
        schoolMobileNumber,
        principalContact,
      };

      updateSchool({ schoolId: schoolData.schoolId, schoolData })
        .unwrap()
        .then(() => {
          setSnackbar({ open: true, message: "School updated successfully!", severity: "success" });
          setErrors({});
          setLoading(false);
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error updating school:", error);
          setSnackbar({ open: true, message: "Failed to update school. Please try again.", severity: "error" });
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Dialog
        fullScreen
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <DialogTitle sx={{ bgcolor: "#f0f0f0" }} id="modal-title">
          <div style={{ color: "#d63333", fontWeight: '700', fontSize: '16px' }}>
            Update School
            <hr style={{ borderColor: "#d63333" }} />
          </div>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="School ID"
              variant="outlined"
              fullWidth
              value={schoolId}
              error={!!errors.schoolId}
              helperText={errors.schoolId}
              disabled
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="School Name"
              variant="outlined"
              fullWidth
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              error={!!errors.schoolName}
              helperText={errors.schoolName}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="School Address"
              variant="outlined"
              fullWidth
              value={schoolAddress}
              onChange={(e) => setSchoolAddress(e.target.value)}
              error={!!errors.schoolAddress}
              helperText={errors.schoolAddress}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="School Mobile Number"
              variant="outlined"
              fullWidth
              value={schoolMobileNumber}
              onChange={(e) => setSchoolMobileNumber(e.target.value)}
              error={!!errors.schoolMobileNumber}
              helperText={errors.schoolMobileNumber}
            />
          </Box>
          <Box sx={{ mt: 4 }}>
            <label
              style={{
                fontWeight: "bold",
                color: "black",
                fontSize: "16px",
                marginTop: "16px"
              }}
              htmlFor="Add Location name"
            >
              Add Location Name
            </label>
            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid item xs={4}>
                <CustomTextField
                  select
                  label="Province"
                  variant="outlined"
                  fullWidth
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  error={!!errors.province}
                  helperText={errors.province}
                >
                  {Object.keys(sriLankanData).map((prov) => (
                    <MenuItem key={prov} value={prov}>
                      {prov}
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
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  error={!!errors.district}
                  helperText={errors.district}
                  disabled={!province}
                >
                  {districts.map((dist) => (
                    <MenuItem key={dist} value={dist}>
                      {dist}
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
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  error={!!errors.town}
                  helperText={errors.town}
                  disabled={!district}
                >
                  {towns.map((t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 2 }}>
            <label style={{ fontWeight: "bold", color: "black", fontSize: "16px" }}>Principal Contact</label>
            {principalContact.map((person, index) => (
              <Box key={index} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Name"
                      variant="outlined"
                      value={person.pname}
                      onChange={(e) => handlePrincipalContactChange(index, "pname", e.target.value)}
                      fullWidth
                      error={!!errors[`principalContact${index}pname`]}
                      helperText={errors[`principalContact${index}pname`]}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Mobile Number"
                      variant="outlined"
                      value={person.pnumber}
                      onChange={(e) => handlePrincipalContactChange(index, "pnumber", e.target.value)}
                      fullWidth
                      error={!!errors[`principalContact${index}pnumber`]}
                      helperText={errors[`principalContact${index}pnumber`]}
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#f0f0f0" }}>
          <Button
            onClick={handleUpdateSchool}
            color="secondary"
            variant="contained"
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {"Update School"}
          </Button>
          <Button onClick={handleCloseModal} variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SchoolUpdateModal;
