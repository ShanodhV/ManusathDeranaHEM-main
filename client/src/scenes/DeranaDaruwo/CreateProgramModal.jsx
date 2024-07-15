import React, { useState, useEffect } from 'react';
import { Modal, Box, Grid, MenuItem } from '@mui/material';
import Buttons from "components/Buttons";
import CustomTextField from 'components/CustomTextField';
import { useAddDeranaDaruwoProgramMutation } from "state/api";

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

export default function CreateProgramModal({ openModal, closeModal }) {
  const [programId, setProgramId] = useState("");
  const [programName, setProgramName] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [cities, setCities] = useState([]);
  const [town, setTown] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [programIdError, setProgramIdError] = useState("");
  const [programNameError, setProgramNameError] = useState("");

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
  }, [district, province]); // Added 'province' to the dependency array

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setDistrict(selectedDistrict);
    setTown("");
  };

  const [addProgram] = useAddDeranaDaruwoProgramMutation();

  const validateProgramId = (id) => {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!id) {
      return "Program ID is required";
    } else if (!alphanumericRegex.test(id)) {
      return "Program ID must be alphanumeric";
    }
    return "";
  };

  const validateProgramName = (name) => {
    const alphabeticRegex = /^[a-zA-Z]+$/;
    if (!name) {
      return "Program Name is required";
    } else if (!alphabeticRegex.test(name)) {
      return "Program Name must be alphabetic";
    }
    return "";
  };

  const handleAddProgram = () => {
    const programIdValidationError = validateProgramId(programId);
    const programNameValidationError = validateProgramName(programName);

    if (programIdValidationError || programNameValidationError) {
      setProgramIdError(programIdValidationError);
      setProgramNameError(programNameValidationError);
      return;
    }

    setProgramIdError(""); // Clear any previous error messages
    setProgramNameError(""); // Clear any previous error messages

    const programData = {
      programId,
      programName,
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
      setProvince("");
      setDistrict("");
      setTown("");
      setName("");
      setMobileNumber("");
      closeModal();
    }).catch((error) => {
      console.error("Error adding program:", error);
    });
  };

  return (
    <Box>
      <Modal open={openModal} onClose={closeModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{
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
        }}>
          <h2 id="modal-modal-title">Create Program</h2>
          <Box sx={{ mt: 6 }}>
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
          <Box sx={{ mt: 6 }}>
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

          <Box sx={{ mt: 4 }}>
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
                  onChange={(e) => setProvince(e.target.value)}
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
                  onChange={handleDistrictChange}
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
                  onChange={(e) => setTown(e.target.value)}
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
          <Box sx={{ mt: 4 }}>
            <label style={{ fontWeight: "bold", color: "black", fontSize: "16px", marginTop: "16px" }} htmlFor="Principal Info">
              Area Officer Details
            </label>
          </Box>
          <Box sx={{ mt: 3 }}>
            <CustomTextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <CustomTextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
            <Buttons onClick={handleAddProgram} label="Create Program" />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
