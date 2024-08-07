import { Dialog, Box, DialogContent, DialogTitle, DialogActions, IconButton, CircularProgress, Button, MenuItem, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CustomTextField from 'components/CustomTextField';
import { useTheme } from "@mui/material/styles";
import { useAddDeranaDaruwoProgramMutation, useGetLastProgramQuery } from "state/api";
import { Alert, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const generateNextId = (lastId) => {
  const idNumber = parseInt(lastId.split('-')[2], 10);
  const nextIdNumber = (idNumber + 1).toString().padStart(6, '0');
  return `MD-DD-${nextIdNumber}`;
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

const ProgramModal = ({ openModal, closeModal, refetch }) => {
  const theme = useTheme();
  const [programId, setProgramId] = useState("");
  const [programName, setProgramName] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [name, setName] = useState("");
  const [cities, setCities] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [programIdError, setProgramIdError] = useState("");
  const [programNameError, setProgramNameError] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [townError, setTownError] = useState("");
  const [nameError, setNameError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const { data: lastProgram, isSuccess } = useGetLastProgramQuery();
  const [date, setDate] = useState('');
  const [dateErrors, setDateErrors] = useState({});
  const [addProgram] = useAddDeranaDaruwoProgramMutation();

  useEffect(() => {
    if (province) {
      setDistrict("");
      setCities([]);
      setTown("");
    }
  }, [province]);

  useEffect(() => {
    if (district) {
      setCities(sriLankanData[province][district]);
      setTown("");
    } else {
      setCities([]);
    }
  }, [district, province]);

  useEffect(() => {
    if (isSuccess && lastProgram) {
      setProgramId(generateNextId(lastProgram.programId));
    } else {
      setProgramId("MD-DD-000001");
    }
  }, [lastProgram, isSuccess]);

  const formatDate = (value) => {
    const cleaned = value.replace(/[^\d]/g, "");
    let formatted = cleaned;

    if (cleaned.length >= 3 && cleaned.length <= 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else if (cleaned.length >= 5) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    }

    return formatted;
  };

  const isValidDate = (value) => {
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    return dateRegex.test(value);
  };
  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setDistrict(selectedDistrict);
    setTown("");
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatDate(value);
    setDate(formattedValue);

    if (!isValidDate(formattedValue)) {
      setDateErrors("Invalid date format. Use DD/MM/YYYY.");
    } else {
      setDateErrors("");
    }
  };

  const convertToISO = (value) => {
    const [day, month, year] = value.split('/');
    return `${year}-${month}-${day}`;
  };

  const validateProgramId = (id) => {
    if (!id) {
      return "Program ID is required";
    }
    return ""; 
  };

  const validateProgramName = (name) => {
    if (!name) {
      return "Program Name is required";
    }
    return "";
  };

  const validateProvince = (province) => {
    if (!province) {
      return "Province is required";
    }
    return "";
  };

  const validateDistrict = (district) => {
    if (!district) {
      return "District is required";
    }
    return "";
  };

  const validateTown = (town) => {
    if (!town) {
      return "Town is required";
    }
    return "";
  };

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    if (!name) {
      return "Name is required.";
    } else if (!regex.test(name)) {
      return "Name can only contain letters and spaces.";
    } else if (name.length < 3) {
      return "Name must be at least 3 characters long.";
    }
    return '';
  };

  const validateMobileNumber = (mobileNumber) => {
    const regex = /^\d{10}$/; // This regex checks for exactly 10 digits
    if (!mobileNumber) {
      return "Phone number is required.";
    } else if (!regex.test(mobileNumber)) {
      return "Phone number must be exactly 10 digits.";
    }
    return '';
  };

  const handleAddProgram = () => {
    const programIdValidationError = validateProgramId(programId);
    const programNameValidationError = validateProgramName(programName);
    const provinceValidationError = validateProvince(province);
    const districtValidationError = validateDistrict(district);
    const townValidationError = validateTown(town);
    const nameValidationError = validateName(name);
    const mobileNumberValidationError = validateMobileNumber(mobileNumber);
    const dateValidationError = !isValidDate(date) ? "Invalid date format. Use DD/MM/YYYY." : '';

    if (programIdValidationError || programNameValidationError || provinceValidationError || districtValidationError || townValidationError || nameValidationError || mobileNumberValidationError||dateValidationError) {
      setProgramIdError(programIdValidationError);
      setProgramNameError(programNameValidationError);
      setProvinceError(provinceValidationError);
      setDistrictError(districtValidationError);
      setTownError(townValidationError);
      setNameError(nameValidationError);
      setMobileNumberError(mobileNumberValidationError);
      setDateErrors(dateValidationError);
      return;
    }

    setProgramIdError(""); // Clear any previous error messages
    setProgramNameError(""); // Clear any previous error messages
    setDate("");
    setProvinceError("");
    setDistrictError("");
    setTownError("");
    setNameError("");
    setMobileNumberError("");
    
    setLoading(true); // Set loading state
    const programData = {
      programId,
      programName,
      Date: convertToISO(date),
      province,
      district,
      town,
      mobileNumber,
      name,
    };

    addProgram(programData).then((response) => {
      console.log("Program added successfully", response);

      // Clear form fields
      setProgramId("");
      setProgramName("");
      setDate("");
      setProvince("");
      setDistrict("");
      setTown("");
      setName("");
      setMobileNumber("");
      setSnackbar({ open: true, message: "Program added successfully", severity: "success" });

      // Call refetch to update the grid
      refetch();
      closeModal();
    }).catch((error) => {
      console.error("Error adding program:", error);
      setSnackbar({ open: true, message: "Error adding program", severity: "error" });
    }).finally(() => {
      setLoading(false); // Reset loading state
    });
  };

  return (
    <>
      <Dialog
        fullScreen
        open={openModal}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle sx={{ bgcolor: "#f0f0f0" }} id="form-dialog-title">
          <div style={{ color: "#d63333", fontWeight: '700', fontSize: '16px' }}>
            {"Create Program"}
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
          {/* Form Fields */}
          
        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Program ID"
            variant="outlined"
            fullWidth
            value={programId}
            onChange={(e) => {
              setProgramId(e.target.value);
              setProgramIdError(validateProgramId(e.target.value));
            }}
            error={!!programIdError}
            helperText={programIdError}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Program Name"
            variant="outlined"
            fullWidth
            value={programName}
            onChange={(e) => {
              setProgramName(e.target.value);
              setProgramNameError(validateProgramName(e.target.value));
            }}
            error={!!programNameError}
            helperText={programNameError}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="Date"
              value={date}
              onChange={handleDateChange}
              fullWidth
              error={!!dateErrors.date}
              helperText={dateErrors.date || "Enter date as DD/MM/YYYY"}
              placeholder="DD/MM/YYYY"
              inputProps={{ pattern: "[0-9]*" }}
            />
          </Box>
        
        <Box sx={{ mt: 2 }}>
          <label style={{ fontWeight: "bold", color: "black", fontSize: "16px", marginTop: "16px" }} htmlFor="Add Location name">
            Add Location Name
          </label>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <CustomTextField
                select
                label="Province"
                variant="outlined"
                fullWidth
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                  setProvinceError(validateProvince(e.target.value));
                }}
                error={!!provinceError}
                helperText={provinceError}
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
                onChange={(e) => {
                  handleDistrictChange(e);
                  setDistrictError(validateDistrict(e.target.value));
                }}
                error={!!districtError}
                helperText={districtError}
                disabled={!province}
              >
                {province ? Object.keys(sriLankanData[province]).map((dist) => (
                  <MenuItem key={dist} value={dist}>
                    {dist}
                  </MenuItem>
                )) : []}
              </CustomTextField>
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                select
                label="Town"
                variant="outlined"
                fullWidth
                value={town}
                onChange={(e) => {
                  setTown(e.target.value);
                  setTownError(validateTown(e.target.value));
                }}
                error={!!townError}
                helperText={townError}
                disabled={!district}
              >
                {cities.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 2 }}>
          <label style={{ fontWeight: "bold", color: "black", fontSize: "16px", marginTop: "16px" }} htmlFor="Principal Info">
            Area Officer Details
          </label>
        </Box>
        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(validateName(e.target.value));
            }}
            error={!!nameError}
            helperText={nameError}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            value={mobileNumber}
            onChange={(e) => {
              setMobileNumber(e.target.value);
              setMobileNumberError(validateMobileNumber(e.target.value));
            }}
            error={!!mobileNumberError}
            helperText={mobileNumberError}
          />
        </Box>
        </DialogContent>
        <DialogActions sx={{bgcolor:"#f0f0f0"}}>
          <Button
            onClick={handleAddProgram}
            color="secondary"
            variant="contained"
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {"Create Program"}
          </Button>
          <Button onClick={closeModal} variant="outlined" color="secondary">
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

export default ProgramModal;
