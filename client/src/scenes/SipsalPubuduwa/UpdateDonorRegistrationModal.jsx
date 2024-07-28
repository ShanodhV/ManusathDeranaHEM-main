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

import CustomTextField from "components/CustomTextField"; // Import your custom TextField component
import { useUpdateDonorMutation } from "state/api"; // Adjust the import according to your file structure

const UpdateDonorRegistrationModal = ({ openModal, handleCloseModal, donorData }) => {
  const [donorNIC, setDonorNIC] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorAddress, setDonorAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [occupation, setOccupation] = useState("");
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);

  const [updateDonor] = useUpdateDonorMutation();

  useEffect(() => {
    if (donorData) {
      setDonorNIC(donorData.donorNIC);
      setDonorName(donorData.donorName);
      setDonorAddress(donorData.donorAddress);
      setMobileNumber(donorData.mobileNumber);
      setMonth(donorData.dateOfBirth?.month || "");
      setDay(donorData.dateOfBirth?.day || "");
      setYear(donorData.dateOfBirth?.year || "");
      setOccupation(donorData.occupation);
    }
  }, [donorData]);

  const validatePhoneNumber = (number) => /^\d+$/.test(number);

  const handleUpdateDonor = () => {
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

      setLoading(true);
      updateDonor(donorData)
        .then((response) => {
          console.log("Donor updated successfully:", response);
          setErrors({});
          setSnackbar({ open: true, message: "Donor updated successfully!", severity: "success" });
          setLoading(false);
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error updating donor:", error);
          setSnackbar({ open: true, message: "Failed to update donor. Please try again.", severity: "error" });
          setLoading(false);
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
    <>
      <Dialog
        fullScreen
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle sx={{ bgcolor: "#f0f0f0" }} id="modal-modal-title">
          <div style={{ color: "#d63333", fontWeight: '700', fontSize: '16px' }}>
            Update Donor
            <hr style={{ borderColor: "#d63333" }} />
          </div>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
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
          <Box sx={{ mt: 2 }}>
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
          <Box sx={{ mt: 2 }}>
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
          <Box sx={{ mt: 2 }}>
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
          <Box sx={{ mt: 2 }}>
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
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#f0f0f0" }}>
          <Button
            onClick={handleUpdateDonor}
            color="secondary"
            variant="contained"
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
            >
              Update Donor
            </Button>
            <Button onClick={handleCloseModal} variant="outlined" color="secondary">
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
  
  export default UpdateDonorRegistrationModal;
  
