import React, { useState, useEffect } from 'react';
import { Modal, Box, Grid, MenuItem, useTheme, Button, DialogActions } from '@mui/material';
import { useUpdateDeranDaruwoProgramMutation } from 'state/api';
import CustomTextField from "components/CustomTextField";

const sriLankanData = {
  Central: {
    Kandy: ["Kandy Town", "Peradeniya"],
    Matale: ["Matale Town", "Dambulla"],
    NuwaraEliya: ["NuwaraEliya Town", "Hatton"]
  },
  Western: {
    Colombo: ["Colombo Town", "Moratuwa"],
    Gampaha: ["Gampaha Town", "Negombo"],
    Kalutara: ["Kalutara Town", "Beruwala"]
  },
  // Add other provinces and their respective districts and towns
};

export const UpdateCreateProgramModal = ({ openModal, closeModal, refetch, newProgamDetails }) => {
  const theme = useTheme();
  const [programName, setProgramName] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [cities, setCities] = useState([]);
  const [town, setTown] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [programIdError, setProgramIdError] = useState("");
  const [programNameError, setProgramNameError] = useState("");
  const [updateDeranaDaruwoProgram] = useUpdateDeranDaruwoProgramMutation();

  useEffect(() => {
    if (newProgamDetails) {
      setProgramName(newProgamDetails.programName || "");
      setProvince(newProgamDetails.province || "");
      setDistrict(newProgamDetails.district || "");
      setTown(newProgamDetails.town || "");
      setName(newProgamDetails.name || "");
      setMobileNumber(newProgamDetails.mobileNumber || "");
    }
  }, [newProgamDetails]);

  useEffect(() => {
    if (province) {
      const provinceDistricts = Object.keys(sriLankanData[province] || {});
      setDistrict(provinceDistricts.length > 0 ? provinceDistricts[0] : "");
    }
  }, [province]);

  useEffect(() => {
    if (district && province) {
      const citiesList = sriLankanData[province][district] || [];
      setCities(citiesList);
      setTown(citiesList.length > 0 ? citiesList[0] : "");
    } else {
      setCities([]);
      setTown("");
    }
  }, [district, province]);

  const handleProvinceChange = (selectedProvince) => {
    setProvince(selectedProvince);
    setDistrict("");
    setCities([]);
    setTown("");
  };

  const handleDistrictChange = (selectedDistrict) => {
    setDistrict(selectedDistrict);
  };

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

  const handleUpdateProgram = () => {
    const programIdError = validateProgramId(programName);
    const programNameError = validateProgramName(name);

    setProgramIdError(programIdError);
    setProgramNameError(programNameError);

    if (programIdError || programNameError) {
      return;
    }

    const updatedProgramData = {
      programId: newProgamDetails._id,
      programName,
      province,
      district,
      town,
      name,
      mobileNumber,
    };

    updateDeranaDaruwoProgram(updatedProgramData)
      .then((response) => {
        console.log("Program updated successfully:", response);
        setProgramName("");
        setProvince("");
        setDistrict("");
        setTown("");
        setName("");
        setMobileNumber("");
        refetch();
        closeModal();
      })
      .catch((error) => {
        console.error("Error updating program:", error);
      });
  };

  const handleCancel = () => {
    setProgramName("");
    setProvince("");
    setDistrict("");
    setTown("");
    setName("");
    setMobileNumber("");
    closeModal();
  };

  return (
    <Modal
      open={openModal}
      onClose={closeModal}
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
        <h2 id="modal-modal-title">Update Program</h2>
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
          <label
            style={{
              fontWeight: "bold",
              color: "black",
              fontSize: "16px",
              marginTop: "16px",
            }}
            htmlFor="Add Location name"
          >
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
                onChange={(e) => handleProvinceChange(e.target.value)}
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
                onChange={(e) => handleDistrictChange(e.target.value)}
                disabled={!province}
              >
                {province
                  ? Object.keys(sriLankanData[province]).map((dist) => (
                      <MenuItem key={dist} value={dist}>
                        {dist}
                      </MenuItem>
                    ))
                  : []}
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
          <label
            style={{
              fontWeight: "bold",
              color: "black",
              fontSize: "16px",
              marginTop: "16px",
            }}
            htmlFor="Principal Info"
          >
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
        <DialogActions>
          <Box
            display="flex"
            justifyContent="flex-end"
            mr={2}
            sx={{
              "& button": {
                backgroundColor: theme.palette.secondary[400],
                color: "white",
              },
            }}
          >
            <Button variant="contained" color="primary" onClick={handleUpdateProgram}>
              Update
            </Button>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{
              "& button": {
                backgroundColor: theme.palette.primary[700],
                color: "white",
              },
            }}
          >
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </Modal>
  );
};
