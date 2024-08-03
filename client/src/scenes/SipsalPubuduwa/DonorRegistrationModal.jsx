import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import CustomTextField from "components/CustomTextField";
import { useAddDonorMutation } from "state/api";

const DonorRegistrationModal = ({ openModal, handleCloseModal }) => {
  const theme = useTheme();
  const [donorNIC, setDonorNIC] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorAddress, setDonorAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  const [addDonor] = useAddDonorMutation();

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

  const validatePhoneNumber = (number) => /^\d{10}$/.test(number);

  const handleAddDonor = () => {
    // Reset errors
    setErrors({});
    const newErrors = {};

    if (!donorNIC) newErrors.donorNIC = "NIC is required";
    if (!donorName) newErrors.donorName = "Name is required";
    if (!donorAddress) newErrors.donorAddress = "Address is required";
    if (!date) newErrors.date = "Date is required";
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
        date,
        mobileNumber,
        occupation,
      };

      setLoading(true);
      addDonor(donorData)
        .unwrap()
        .then((response) => {
          console.log("Donor added successfully:", response);
          // Clear form fields
          setDonorNIC("");
          setDonorName("");
          setDonorAddress("");
          setDate("");
          setMobileNumber("");
          setOccupation("");
          setErrors({});
          setSnackbar({ open: true, message: "Donor added successfully!", severity: "success" });
          setLoading(false);
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error adding donor:", error);
          setSnackbar({ open: true, message: "Failed to add donor. Please try again.", severity: "error" });
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Dialog
        fullScreen
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle sx={{ bgcolor: "#f0f0f0", position: 'relative' }} id="modal-modal-title">
          <div style={{ color: "#d63333", fontWeight: '700', fontSize: '16px' }}>
            Register Donor
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
            onClick={handleAddDonor}
            color="secondary"
            variant="contained"
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            Register Donor
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

export default DonorRegistrationModal;
