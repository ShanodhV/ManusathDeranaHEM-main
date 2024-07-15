import React, { useState } from "react";
import { Modal, Box, Grid, MenuItem } from "@mui/material";
import Buttons from "components/Buttons";
import CustomTextField from "components/CustomTextField"; // Import your custom TextField component
import { useAddDonorVolunteerMutation } from "state/api"; // Adjust the import according to your file structure

const DonorRegistrationModal = ({ openModal, handleCloseModal }) => {
  const [donorNIC, setDonorNIC] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorAddress, setDonorAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [occupation, setOccupation] = useState("");
  const [errors, setErrors] = useState({});

  const [addDonor] = useAddDonorVolunteerMutation();

  const validatePhoneNumber = (number) => /^\d+$/.test(number);

  const handleAddDonor = () => {
    const newErrors = {};
    
    if (!donorNIC) newErrors.donorNIC = "NIC is required";
    if (!donorName) newErrors.donorName = "Name is required";
    if (!donorAddress) newErrors.donorAddress = "Address is required";
    if (!month || !day || !year) newErrors.dateOfBirth = "Date of Birth is required";
    if (!mobileNumber) newErrors.mobileNumber = "Mobile number is required";
    else if (!validatePhoneNumber(mobileNumber)) newErrors.mobileNumber = "Mobile number must contain only numbers";
    if (!occupation) newErrors.occupation = "Occupation is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const donorData = {
        donorNIC,
        donorName,
        donorAddress,
        dateOfBirth: {
          month,
          day,
          year,
        },
        mobileNumber,
        occupation,
      };
  
      addDonor(donorData)
        .then((response) => {
          console.log("Donor added successfully:", response);
          // Clear form fields
          setDonorNIC("");
          setDonorName("");
          setDonorAddress("");
          setMonth("");
          setDay("");
          setYear("");
          setMobileNumber("");
          setOccupation("");
          setErrors({});
        })
        .catch((error) => {
          console.error("Error adding donor:", error);
        });
    }
  };

  const labelStyle = {
    fontWeight: "bold",
    color: "black",
    fontSize: "16px",
    marginTop: "16px",
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

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
        <h2 id="modal-modal-title">Register Donor</h2>

        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Donor NIC"
            variant="outlined"
            fullWidth
            value={donorNIC}
            onChange={(e) => setDonorNIC(e.target.value)}
            error={!!errors.donorNIC}
            helperText={errors.donorNIC}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Donor Name"
            variant="outlined"
            fullWidth
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            error={!!errors.donorName}
            helperText={errors.donorName}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Address"
            variant="outlined"
            fullWidth
            value={donorAddress}
            onChange={(e) => setDonorAddress(e.target.value)}
            error={!!errors.donorAddress}
            helperText={errors.donorAddress}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            error={!!errors.mobileNumber}
            helperText={errors.mobileNumber}
          />
        </Box>

        <Box sx={{ mt: 4 }}>
          <label style={labelStyle} htmlFor="Date Of Birth">
            Date of Birth
          </label>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={4}>
              <CustomTextField
                select
                label="Month"
                variant="outlined"
                fullWidth
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
              >
                {months.map((m) => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                select
                label="Day"
                variant="outlined"
                fullWidth
                value={day}
                onChange={(e) => setDay(e.target.value)}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
              >
                {days.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                select
                label="Year"
                variant="outlined"
                fullWidth
                value={year}
                onChange={(e) => setYear(e.target.value)}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
              >
                {years.map((y) => (
                  <MenuItem key={y} value={y}>
                    {y}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Occupation"
            variant="outlined"
            fullWidth
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            error={!!errors.occupation}
            helperText={errors.occupation}
          />
        </Box>

        <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
          <Buttons onClick={handleAddDonor} label="Register Donor" />
        </Box>
      </Box>
    </Modal>
  );
};

export default DonorRegistrationModal;
