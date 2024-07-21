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
import { useAddCampMutation, useGetLastCampQuery } from "state/api";
import { Alert, Snackbar } from "@mui/material";

const generateNextId = (lastId) => {
  const idNumber = parseInt(lastId.split('-')[2], 10);
  const nextIdNumber = (idNumber + 1).toString().padStart(6, '0');
  return `MD-HC-${nextIdNumber}`;
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


const CreateHealthCampModal = ({ openModal, closeModal }) => {
  const theme = useTheme();
  const [campId, setCampId] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [mohFields, setMohFields] = useState([""]);
  const [contactPersons, setContactPersons] = useState([{ cname: "", cnumber: "" }]);
  const [sponsors, setSponsors] = useState([""]);
  const [addCamp] = useAddCampMutation();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [districts, setDistricts] = useState([]);
  const [towns, setTowns] = useState([]);

  const { data: lastCamp, isSuccess } = useGetLastCampQuery();

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

  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});

  const handleDateChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatDate(value);
    setDate(formattedValue);

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

  useEffect(() => {
    if (isSuccess && lastCamp) {
      setCampId(generateNextId(lastCamp.CampId));
    } else {
      setCampId("MD-HC-000001");
    }
  }, [lastCamp, isSuccess]);

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

  const handleClickAddMoh = () => {
    setMohFields([...mohFields, ""]);
  };

  const handleClickAddPerson = () => {
    setContactPersons([...contactPersons, { cname: "", cnumber: "" }]);
  };

  const handleClickAddSponsor = () => {
    setSponsors([...sponsors, ""]);
  };

  const handleChangeContactPerson = (index, field, value) => {
    const updatedContactPersons = [...contactPersons];
    updatedContactPersons[index][field] = value;
    setContactPersons(updatedContactPersons);
  };

  const handleChangeMohField = (index, value) => {
    const updatedMohFields = [...mohFields];
    updatedMohFields[index] = value;
    setMohFields(updatedMohFields);
  };

  const handleChangeSponsorField = (index, value) => {
    const updatedSponsors = [...sponsors];
    updatedSponsors[index] = value;
    setSponsors(updatedSponsors);
  };

  const validatePhoneNumber = (number) => /^\d{10}$/.test(number);

  const handleSubmit = () => {
    const newErrors = {};
    if (!campId) newErrors.campId = "Camp ID is required";
    if (!province) newErrors.province = "Province is required";
    if (!district) newErrors.district = "District is required";
    if (!town) newErrors.town = "Town is required";
    if (!date) newErrors.date = "Date is required";
    contactPersons.forEach((person, index) => {
      if (!person.cname) newErrors[`contactPersons${index}cname`] = "Name is required";
      if (!person.cnumber) newErrors[`contactPersons${index}cnumber`] = "Phone number is required";
      else if (!validatePhoneNumber(person.cnumber)) newErrors[`contactPersons${index}cnumber`] = "Phone number must contain only 10 digits";
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      const startTime = Date.now();
      const campData = {
        CampId: campId,
        Province: province,
        District: district,
        Town: town,
        Date: convertToISO(date),
        MOH: mohFields,
        ContactPersons: contactPersons,
        Sponsors: sponsors,
      };

      addCamp(campData)
        .then((response) => {
          console.log("Camp saved successfully:", response);
          setCampId(generateNextId(campId));
          setProvince("");
          setDistrict("");
          setTown("");
          setDate("");
          setMohFields([""]);
          setContactPersons([{ cname: "", cnumber: "" }]);
          setSponsors([""]);

          const elapsedTime = Date.now() - startTime;
          const remainingTime = 500 - elapsedTime;
          setTimeout(() => {
            setLoading(false);
            closeModal();
            setSnackbar({ open: true, message: `Health Camp created successfully`, severity: "success" });
          }, remainingTime > 0 ? remainingTime : 0);
        })
        .catch((error) => {
          console.error("Error adding camp:", error);
          setLoading(false);
          setSnackbar({ open: true, message: "Error adding camp", severity: "error" });
        });
    }
  };

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
          {"Create Health Camp"}
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
              label="Camp ID"
              variant="outlined"
              value={campId}
              fullWidth
              error={!!errors.campId}
              helperText={errors.campId}
              disabled
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
              label="Date"
              value={date}
              onChange={handleDateChange}
              fullWidth
              error={!!errors.date}
              helperText={errors.date || "Enter date as DD/MM/YYYY"}
              placeholder="DD/MM/YYYY"
              inputProps={{ pattern: "[0-9]*" }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {mohFields.map((moh, index) => (
                <Grid item xs={4} key={index}>
                  <CustomTextField
                    label={`MOH ${index + 1}`}
                    variant="outlined"
                    value={moh}
                    onChange={(e) => handleChangeMohField(index, e.target.value)}
                    fullWidth
                  />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Buttons onClick={handleClickAddMoh} label="Add another MOH" />
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <label style={{ fontWeight: "bold", color: "black", fontSize: "16px" }}>Add Contact Persons</label>
            {contactPersons.map((person, index) => (
              <Box key={index} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Name"
                      variant="outlined"
                      value={person.cname}
                      onChange={(e) => handleChangeContactPerson(index, "cname", e.target.value)}
                      fullWidth
                      error={!!errors[`contactPersons${index}cname`]}
                      helperText={errors[`contactPersons${index}cname`]}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Mobile Number"
                      variant="outlined"
                      value={person.cnumber}
                      onChange={(e) => handleChangeContactPerson(index, "cnumber", e.target.value)}
                      fullWidth
                      error={!!errors[`contactPersons${index}cnumber`]}
                      helperText={errors[`contactPersons${index}cnumber`]}
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Box sx={{ mt: 2 }}>
              <Buttons onClick={handleClickAddPerson} label="Add another Person" />
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <label style={{ fontWeight: "bold", color: "black", fontSize: "16px" }}>Add Sponsors</label>
            {sponsors.map((sponsor, index) => (
              <Box key={index} sx={{ mt: 2 }}>
                <CustomTextField
                  label={`Sponsor ${index + 1}`}
                  variant="outlined"
                  value={sponsor}
                  onChange={(e) => handleChangeSponsorField(index, e.target.value)}
                  fullWidth
                />
              </Box>
            ))}
            <Box sx={{ mt: 2 }}>
              <Buttons onClick={handleClickAddSponsor} label="Add Another Sponsor" />
            </Box>
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
            {"Create Health Camp"}
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

export default CreateHealthCampModal;
