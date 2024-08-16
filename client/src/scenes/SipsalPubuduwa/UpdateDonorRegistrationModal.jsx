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
  const theme = useTheme();
  const [donorNIC, setDonorNIC] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorAddress, setDonorAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);

  const [updateDonor] = useUpdateDonorMutation();


  const formatDate = (value) => {
    if (value.includes('-')) {
      const [year, month, day] = value.split('-');
      return `${day}/${month}/${year}`;
    }
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
    if (donorData) {
      setDonorNIC(donorData.donorNIC);
      setDonorName(donorData.donorName);
      setDonorAddress(donorData.donorAddress);
      setMobileNumber(donorData.mobileNumber);
      setOccupation(donorData.occupation);
      setDate(donorData.date ? formatDate(donorData.date) : '');
    }
  }, [donorData]);
  

  const validatePhoneNumber = (number) => /^\d+$/.test(number);

  const handleUpdateDonor = () => {
    const newErrors = {};

    if (!donorNIC) newErrors.donorNIC = "NIC is required";
    else if (donorNIC.length < 10) newErrors.donorNIC = "NIC must be at least 10 characters long";    if (!donorName) newErrors.donorName = "Name is required";
    if (!donorName) newErrors.donorName = "Name is required";
    if (!donorAddress) newErrors.donorAddress = "Address is required";
    // if (!date) newErrors.date = "Date of Birth is required";
    if (!mobileNumber) newErrors.mobileNumber = "Mobile number is required";
    else if (!validatePhoneNumber(mobileNumber)) newErrors.mobileNumber = "Mobile number must contain only numbers";
    if (!occupation) newErrors.occupation = "Occupation is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      const startTime = Date.now();
      const donorData = {
        donorNIC: donorNIC,
        donorName: donorName,
        donorAddress: donorAddress,
        date: convertToISO(date),
        mobileNumber: mobileNumber,
        occupation: occupation,
      };

      updateDonor(donorData)
  .then((response) => {
    console.log("Donor updated successfully:", response);
    const elapsedTime = Date.now() - startTime;
          const remainingTime = 500 - elapsedTime;
    setErrors({}); // Clear errors after successful update
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

  
  return (
    <>
      <Dialog
        fullScreen
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
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
              color: theme.palette.grey[500],
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

          {/* <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="Date of Birth"
              value={date}
              onChange={handleDateChange}
              fullWidth
              error={!!errors.date}
              helperText={errors.date || "Enter date as DD/MM/YYYY"}
              placeholder="DD/MM/YYYY"
              inputProps={{ pattern: "[0-9]*" }}
            />
          </Box> */}
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
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateDonor}
            color="secondary"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Update"}
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
  
