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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import Buttons from "components/Buttons";
import CustomTextField from "components/CustomTextField";
import { useAddSchoolMutation, useGetLastSchoolQuery } from "state/api";
import { Alert, Snackbar } from "@mui/material";

const generateNextId = (lastId) => {
  const idNumber = parseInt(lastId.split('-')[2], 10);
  const nextIdNumber = (idNumber + 1).toString().padStart(6, '0');
  return `MD-SC-${nextIdNumber}`;
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

const CreateSchoolModal = ({ openModal, closeModal }) => {
  const theme = useTheme();
  const [schoolId, setSchoolId] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [schoolMobileNumber, setSchoolMobileNumber] = useState("");
  const [principalContact, setPrincipalContact] = useState([{ pname: "", pnumber: "" }]);
  const [addSchool] = useAddSchoolMutation();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [districts, setDistricts] = useState([]);
  const [towns, setTowns] = useState([]);

  const { data: lastSchool, isSuccess } = useGetLastSchoolQuery();

  useEffect(() => {
    if (isSuccess && lastSchool) {
      setSchoolId(generateNextId(lastSchool.schoolId));
    } else {
      setSchoolId("MD-SC-000001");
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

  const handleClickAddPerson = () => {
    setPrincipalContact([...principalContact, { pname: "", pnumber: "" }]);
  };

  const handleChangePrincipalContact = (index, field, value) => {
    const updatedPrincipalContact = [...principalContact];
    updatedPrincipalContact[index][field] = value;
    setPrincipalContact(updatedPrincipalContact);
  };

  const validatePhoneNumber = (number) => /^\d{10}$/.test(number);

  const handleSubmit = () => {
    const newErrors = {};
    if (!schoolId) newErrors.schoolId = "School ID is required";
    if (!schoolName) newErrors.schoolName = "School name is required";
    if (!schoolAddress) newErrors.schoolAddress = "School address is required";
    if (!province) newErrors.province = "Province is required";
    if (!district) newErrors.district = "District is required";
    if (!town) newErrors.town = "Town is required";
    if (!schoolMobileNumber) newErrors.schoolMobileNumber = "Mobile number is required";
    principalContact.forEach((person, index) => {
      if (!person.pname) newErrors[`principalContact${index}pname`] = "Name is required";
      if (!person.pnumber) newErrors[`principalContact${index}pnumber`] = "Phone number is required";
      else if (!validatePhoneNumber(person.pnumber)) newErrors[`principalContact${index}pnumber`] = "Phone number must contain only 10 digits";
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      const startTime = Date.now();
      const schoolData = {
        schoolId: schoolId,
        schoolName: schoolName,
        schoolAddress: schoolAddress,
        location: {
          province: province,
          district: district,
          town: town,
        },
        schoolMobileNumber: schoolMobileNumber,
        principalContact: principalContact,
      };

      addSchool(schoolData)
        .then((response) => {
          console.log("School saved successfully:", response);
          setSchoolId(generateNextId(schoolId));
          setSchoolName("");
          setSchoolAddress("");
          setProvince("");
          setDistrict("");
          setTown("");
          setSchoolMobileNumber("");
          setPrincipalContact([{ pname: "", pnumber: "" }]);

          const elapsedTime = Date.now() - startTime;
          const remainingTime = 500 - elapsedTime;
          setTimeout(() => {
            setLoading(false);
            closeModal();
            setSnackbar({ open: true, message: `School registerd successfully`, severity: "success" });
          }, remainingTime > 0 ? remainingTime : 0);
        })
        .catch((error) => {
          console.error("Error adding school:", error);
          setLoading(false);
          setSnackbar({ open: true, message: "Error adding school", severity: "error" });
        });
    }
  };
  const [errors, setErrors] = useState({});

  return (
    <>
      <Dialog
        fullScreen
        open={openModal}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle sx={{bgcolor:"#f0f0f0"}} id="form-dialog-title">
        <div style={{ color: "#d63333", fontWeight: '700', fontSize: '16px' }}>
          {"Register School"}
          <hr style={{ borderColor: "#d63333", }} />
        </div>        
          <IconButton
            aria-label="close"
            onClick={closeModal}
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
              value={schoolId}
              fullWidth
              error={!!errors.schoolId}
              helperText={errors.schoolId}
              disabled
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="School Name"
              variant="outlined"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              fullWidth
              error={!!errors.schoolName}
              helperText={errors.schoolName}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="School Address"
              variant="outlined"
              value={schoolAddress}
              onChange={(e) => setSchoolAddress(e.target.value)}
              fullWidth
              error={!!errors.schoolAddress}
              helperText={errors.schoolAddress}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <CustomTextField
                  label="Province"
                  variant="outlined"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  select
                  fullWidth
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
                  label="District"
                  variant="outlined"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  select
                  fullWidth
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
                  label="Town"
                  variant="outlined"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  select
                  fullWidth
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
            <CustomTextField
              label="Mobile Number"
              variant="outlined"
              value={schoolMobileNumber}
              onChange={(e) => setSchoolMobileNumber(e.target.value)}
              fullWidth
              error={!!errors.schoolMobileNumber}
              helperText={errors.schoolMobileNumber}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <label style={{ fontWeight: "bold", color: "black", fontSize: "16px" }}>Add Principal Contact</label>
            {principalContact.map((person, index) => (
              <Box key={index} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Name"
                      variant="outlined"
                      value={person.pname}
                      onChange={(e) => handleChangePrincipalContact(index, "pname", e.target.value)}
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
                      onChange={(e) => handleChangePrincipalContact(index, "pnumber", e.target.value)}
                      fullWidth
                      error={!!errors[`principalContact${index}pnumber`]}
                      helperText={errors[`principalContact${index}pnumber`]}
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}
            {/* <Box sx={{ mt: 2 }}>
              <Buttons onClick={handleClickAddPerson} label="Add another Person" />
            </Box> */}
          </Box>
        </DialogContent>
        <DialogActions sx={{bgcolor:"#f0f0f0"}}>
          <Button
            onClick={handleSubmit}
            color="secondary"
            variant="contained"
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {"Register School"}
          </Button>
          <Button onClick={closeModal}  variant="outlined" color="secondary">
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

export default CreateSchoolModal;
