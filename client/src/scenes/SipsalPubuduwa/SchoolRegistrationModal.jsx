import React, { useState, useEffect } from "react";
import { Modal, Box, Grid } from "@mui/material";
import Buttons from "components/Buttons";
import CustomTextField from "components/CustomTextField"; // Import your custom TextField component
import { useAddSchoolMutation } from "state/api"; // Adjust the import according to your file structure

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
  const [schoolID, setSchoolID] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [schoolMobileNumber, setSchoolMobileNumber] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [principalName, setPrincipalName] = useState("");
  const [principalMobileNumber, setPrincipalMobileNumber] = useState("");
  const [errors, setErrors] = useState({});

  const [districts, setDistricts] = useState([]);
  const [towns, setTowns] = useState([]);

  const [addSchool] = useAddSchoolMutation();

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
      schoolID,
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
    if (!schoolID) newErrors.schoolID = "School ID is required";
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
      addSchool(schoolData)
        .then((response) => {
          console.log("School added successfully:", response);
          // Clear form fields
          setSchoolID("");
          setSchoolName("");
          setSchoolAddress("");
          setProvince("");
          setDistrict("");
          setTown("");
          setSchoolMobileNumber("");
          setPrincipalName("");
          setPrincipalMobileNumber("");
          setErrors({});
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error adding school:", error);
        });
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
        <h2 id="modal-modal-title">Register School</h2>

        <Box sx={{ mt: 2 }}>
        <CustomTextField
            label="School ID"
            variant="outlined"
            fullWidth
            value={schoolID}
            onChange={(e) => setSchoolID(e.target.value)}
            error={!!errors.schoolID}
            helperText={errors.schoolID}
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
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
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
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
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
                {towns.map((townItem) => (
                  <option key={townItem} value={townItem}>
                    {townItem}
                  </option>
                ))}
              </CustomTextField>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 4 }}>
          <label
            style={{
              fontWeight: "bold",
              color: "black",
              fontSize: "16px",
              marginTop: "16px"
            }}
            htmlFor="Principal Info"
          >
            Principal's Information
          </label>
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
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Buttons onClick={handleAddSchool} label="Register School" />
        </Box>
      </Box>
    </Modal>
  );
};

export default SchoolRegistrationModal;

