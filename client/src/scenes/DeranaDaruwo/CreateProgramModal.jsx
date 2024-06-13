import React, { useState } from 'react';
import { Modal, Box, Grid, MenuItem } from '@mui/material';
import Buttons from "components/Buttons";
import CustomTextField from 'components/CustomTextField';
import { useAddDeranaDaruwoProgramMutation } from "state/api";


const provinces = [
    { id: 1, name: "Province 1" },
    { id: 2, name: "Province 2" },
    { id: 3, name: "Province 3" },
  ];
  
  const districtsByProvince = {
    1: [
      { id: 1, name: "District 1 - Province 1" },
      { id: 2, name: "District 2 - Province 1" },
    ],
    2: [
      { id: 3, name: "District 1 - Province 2" },
      { id: 4, name: "District 2 - Province 2" },
    ],
    3: [
      { id: 5, name: "District 1 - Province 3" },
      { id: 6, name: "District 2 - Province 3" },
    ],
  };
  
  const townsByDistrict = {
    1: [
      { id: 1, name: "Town 1 - District 1" },
      { id: 2, name: "Town 2 - District 1" },
    ],
    2: [
      { id: 3, name: "Town 1 - District 2" },
      { id: 4, name: "Town 2 - District 2" },
    ],
  };

export default function CreateProgramModal({ openModal, closeModal }) {
    const [programId, setProgramId] = useState("");
    const [programName, setProgramName] = useState("");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [town, setTown] = useState("");
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");

    const [programIdError, setProgramIdError] = useState("");
    const [programNameError, setProgramNameError] = useState("");

    const handleProvinceChange = (event) => {
        const selectedProvince = event.target.value;
        setProvince(selectedProvince);
        setDistrict(""); // Clear district when province changes
        setTown(""); // Clear town when province changes
    };

    const handleDistrictChange = (event) => {
        const selectedDistrict = event.target.value;
        setDistrict(selectedDistrict);
        setTown(""); // Clear town when district changes
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
                                        onChange={handleProvinceChange}
                                    >
                                        {provinces.map((province) => (
                                            <MenuItem key={province.id} value={province.id}>
                                                {province.name}
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
                                        {districtsByProvince[province] &&
                                            districtsByProvince[province].map((district) => (
                                                <MenuItem key={district.id} value={district.id}>
                                                    {district.name}
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
                                        disabled={!district}
                                    >
                                        {townsByDistrict[district] &&
                                            townsByDistrict[district].map((town) => (
                                                <MenuItem key={town.id} value={town.id}>
                                                    {town.name}
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
