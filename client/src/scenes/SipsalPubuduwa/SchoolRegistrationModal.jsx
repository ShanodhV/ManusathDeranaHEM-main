import React, { useState } from "react";
import { Modal, Box, Grid } from "@mui/material";
import Buttons from "components/Buttons";
import CustomTextField from "components/CustomTextField"; // Import your custom TextField component
import { useAddSchoolMutation } from "state/api"; // Adjust the import according to your file structure

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

  const [addSchool] = useAddSchoolMutation();

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

    addSchool(schoolData)
      .then((response) => {
        console.log("School added successfully:", response);
        // Clear form fields
        setSchoolID("");
        setSchoolName("");
        setSchoolAddress("");
        setSchoolMobileNumber("");
        setProvince("");
        setDistrict("");
        setTown("");
        setPrincipalName("");
        setPrincipalMobileNumber("");
      })
      .catch((error) => {
        console.error("Error adding school:", error);
      });
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

        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="School ID"
            variant="outlined"
            fullWidth
            value={schoolID}
            onChange={(e) => setSchoolID(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="School Name"
            variant="outlined"
            fullWidth
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="School Address"
            variant="outlined"
            fullWidth
            value={schoolAddress}
            onChange={(e) => setSchoolAddress(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="School Mobile Number"
            variant="outlined"
            fullWidth
            value={schoolMobileNumber}
            onChange={(e) => setSchoolMobileNumber(e.target.value)}
          />
        </Box>

        <Box sx={{ mt: 4 }}>
          <label style={{ fontWeight: "bold", color: "black", fontSize: "16px", marginTop: "16px" }} htmlFor="Add Location name">
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
              >
                {/* Province options */}
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
              >
                {/* District options */}
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
              >
                {/* Town options */}
              </CustomTextField>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 4 }}>
          <label style={{ fontWeight: "bold", color: "black", fontSize: "16px", marginTop: "16px" }} htmlFor="Principal Info">
            Principal's Information
          </label>
        </Box>
        <Box sx={{ mt: 3 }}>
          <CustomTextField
            label="Name"
            variant="outlined"
            fullWidth
            value={principalName}
            onChange={(e) => setPrincipalName(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <CustomTextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            value={principalMobileNumber}
            onChange={(e) => setPrincipalMobileNumber(e.target.value)}
          />
        </Box>

        <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
          <Buttons onClick={handleAddSchool} label="Register School" />
        </Box>
      </Box>
    </Modal>
  );
};

export default SchoolRegistrationModal;
