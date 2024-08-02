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
import { useAddSchoolMutation, useGetLastSchoolQuery } from "state/api";

const generateNextId = (lastId) => {
  const idNumber = parseInt(lastId.split('-')[2], 10);
  const nextIdNumber = (idNumber + 1).toString().padStart(6, '0');
  return `MD-SHL-${nextIdNumber}`;
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

const SchoolRegistrationModal = ({ openModal, handleCloseModal }) => {
  const theme = useTheme();
  const [schoolId, setSchoolId] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [schoolMobileNumber, setSchoolMobileNumber] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [principalName, setPrincipalName] = useState("");
  const [principalMobileNumber, setPrincipalMobileNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);

  const [districts, setDistricts] = useState([]);
  const [towns, setTowns] = useState([]);
  const { data: lastSchool, isSuccess } = useGetLastSchoolQuery();

  const [addSchool] = useAddSchoolMutation();

  useEffect(() => {
    if (isSuccess && lastSchool) {
      setSchoolId(generateNextId(lastSchool.schoolId));
    } else {
      setSchoolId("MD-SHL-000001");
    }
  }, [lastSchool, isSuccess]);

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

  const validatePhoneNumber = (number) => /^\d+$/.test(number);

  const handleAddSchool = () => {
    const schoolData = {
      schoolId,
      schoolName,
      schoolAddress,
      location: {
        province,
        district,
        town,
      },
      schoolMobileNumber,
      principalContact: {
        name: principalName,
        mobileNumber: principalMobileNumber,
      },
    };

    const newErrors = {};
    if (!schoolId) newErrors.schoolId = "School ID is required";
    if (!schoolName) newErrors.schoolName = "School Name is required";
    if (!schoolAddress) newErrors.schoolAddress = "School Address is required";
    if (!province) newErrors.province = "Province is required";
    if (!district) newErrors.district = "District is required";
    if (!town) newErrors.town = "Town is required";
    if (!schoolMobileNumber) newErrors.schoolMobileNumber = "School Mobile Number is required";
    else if (!validatePhoneNumber(schoolMobileNumber)) newErrors.schoolMobileNumber = "School Mobile Number must contain only numbers";
    if (!principalName) newErrors.principalName = "Principal Name is required";
    if (!principalMobileNumber) newErrors.principalMobileNumber = "Principal Mobile Number is required";
    else if (!validatePhoneNumber(principalMobileNumber)) newErrors.principalMobileNumber = "Principal Mobile Number must contain only numbers";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      addSchool(schoolData)
        .then((response) => {
          console.log("School added successfully:", response);
          // Clear form fields
          setSchoolId(generateNextId(schoolId)); // Generate next ID based on the current ID
          setSchoolName("");
          setSchoolAddress("");
          setProvince("");
          setDistrict("");
          setTown("");
          setSchoolMobileNumber("");
          setPrincipalName("");
          setPrincipalMobileNumber("");
          setErrors({});
          setSnackbar({ open: true, message: "School added successfully!", severity: "success" });
          setLoading(false);
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error adding school:", error);
          setSnackbar({ open: true, message: "Failed to add school. Please try again.", severity: "error" });
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
            Register School
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
              onChange={(e) => setSchoolId(e.target.value)}
              error={!!errors.schoolId}
              helperText={errors.schoolId}
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
            <CustomTextField
              label="Principal Name"
              variant="outlined"
              fullWidth
              value={principalName}
              onChange={(e) => setPrincipalName(e.target.value)}
              error={!!errors.principalName}
              helperText={errors.principalName}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="Principal Mobile Number"
              variant="outlined"
              fullWidth
              value={principalMobileNumber}
              onChange={(e) => setPrincipalMobileNumber(e.target.value)}
              error={!!errors.principalMobileNumber}
              helperText={errors.principalMobileNumber}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleAddSchool}
            variant="contained"
            sx={{
              bgcolor: "#d63333",
              color: "white",
              "&:hover": {
                bgcolor: "#a30000",
              },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SchoolRegistrationModal;
