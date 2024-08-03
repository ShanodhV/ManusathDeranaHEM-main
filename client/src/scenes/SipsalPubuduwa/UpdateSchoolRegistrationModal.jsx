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
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
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

const UpdateSchoolRegistrationModal = ({ openModal, closeModal, currentSchool }) => {
  const theme = useTheme();
  const [schoolId, setSchoolId] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [schoolMobileNumber, setSchoolMobileNumber] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [principalContact, setPrincipalContact] = useState([{ pname: "", pnumber: "" }]);
  // const [principalName, setPrincipalName] = useState("");
  // const [contactNumber, setContactNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [updateSchool] = useUpdateSchoolMutation();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [districts, setDistricts] = useState([]);
  const [towns, setTowns] = useState([]);

  useEffect(() => {
    if (currentSchool) {
      setSchoolId(currentSchool.schoolId);
      setSchoolName(currentSchool.schoolName);
      setSchoolAddress(currentSchool.schoolAddress);
      setSchoolMobileNumber(currentSchool.schoolMobileNumber);
      setProvince(currentSchool.province);
      setDistrict(currentSchool.district);
      setTown(currentSchool.town);
      setPrincipalContact(currentSchool.principalContact.length ? currentSchool.principalContact : [{ pname: "", pnumber: "" }]);

      // setPrincipalName(currentSchool.principalName);
      // setContactNumber(currentSchool.contactNumber);

      if (currentSchool.province) {
        setDistricts(Object.keys(sriLankanData[currentSchool.province]));
      }
      if (currentSchool.province && currentSchool.district) {
        setTowns(sriLankanData[currentSchool.province][currentSchool.district]);
      }
    }
  }, [currentSchool]);

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

  const handleChangePrincipalContact = (index, field, value) => {
    const updateprincipalContact = [...principalContact];
    updateprincipalContact[index][field] = value;
    setPrincipalContact(updateprincipalContact);
  };

  const validatePhoneNumber = (number) => /^\d{10}$/.test(number);


  const handleSubmit = () => {
    const newErrors = {};
    if (!schoolId) newErrors.schoolId = "School ID is required";
    if (!province) newErrors.province = "Province is required";
    if (!district) newErrors.district = "District is required";
    if (!town) newErrors.town = "Town is required";
    principalContact.forEach((person, index) => {
      if (!person.pname) newErrors[`principalContact${index}pname`] = "Name is required";
      if (!person.pnumber) newErrors[`principalContact${index}pnumber`] = "Phone number is required";
      else if (!validatePhoneNumber(person.pnumber)) newErrors[`principalContact${index}pnumber`] = "Phone number must contain only 10 digits";
    });
    // if (!principalName) newErrors.principalName = "Principal Name is required";
    // if (!contactNumber) newErrors.contactNumber = "Contact Number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      const startTime = Date.now();
      const schoolData = {
        schoolId: schoolId,
        schoolName: schoolName,
        schoolAddress: schoolAddress,
        province: province,
        district: district,
        town: town,
        principalContact: principalContact,
        // principalName,
        // contactNumber,
      };

      updateSchool({ id: currentSchool._id, ...schoolData })
        .then((response) => {
        console.log("School updated successfully:", response);


          const elapsedTime = Date.now() - startTime;
          const remainingTime = 500 - elapsedTime;
          setTimeout(() => {
            setLoading(false);
            closeModal();
            setSnackbar({ open: true, message: `School updated successfully`, severity: "success" });
          }, remainingTime > 0 ? remainingTime : 0);
        })
        .catch((error) => {
          console.error("Error updating school:", error);
          setLoading(false);
          setSnackbar({ open: true, message: "Error updating school", severity: "error" });
        });
    }
  };

  return (
    <>
        <Dialog
            fullScreen
            open={openModal}
            onClose={closeModal}
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
              <label style={{ fontWeight: "bold", color: "black", fontSize: "16px" }}>Prinscipal Contact</label>
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

export default UpdateSchoolRegistrationModal;
