import React, { useState, useEffect } from "react";
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
import { useAddDonorMutation, useGetLastDonorQuery } from "state/api";

 // Function to generate the next Donor ID
 const generateNextId = (lastId) => {
  const idNumber = parseInt(lastId.split('-')[2], 10);
  const nextIdNumber = (idNumber + 1).toString().padStart(6, '0');
  return `MD-D-${nextIdNumber}`;
};


const DonorRegistrationModal = ({ openModal, handleCloseModal }) => {
  const theme = useTheme();
  const [donorId, setDonorId] = useState("");
  const [donorNIC, setDonorNIC] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorAddress, setDonorAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);
  
  const { data: lastDonor, isSuccess } = useGetLastDonorQuery();
  const [addDonor] = useAddDonorMutation();

 
  useEffect(() => {
    if (isSuccess && lastDonor) {
      setDonorId(generateNextId(lastDonor.donorId));
    } else {
      setDonorId("MD-D-000001");
    }
  }, [lastDonor, isSuccess]);

  // Date handling functions
  const formatDate = (value) => {
    const digits = value.replace(/\D/g, '');
    const day = digits.slice(0, 2);
    const month = digits.slice(2, 4);
    const year = digits.slice(4, 8);
    return `${day}${day && month ? '/' : ''}${month}${month && year ? '/' : ''}${year}`;
  };
  const validateNICFormat = (nic) => {
    const nicRegex = /^\d{9}[vVxX]$|^\d{12}$/; // Old and new NIC formats
    return nicRegex.test(nic);
  };
  
  const isValidDate = (value) => {
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    return dateRegex.test(value);
  };

  const convertToISO = (value) => {
    const [day, month, year] = value.split('/');
    return `${year}-${month}-${day}`;
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

  // Function to validate phone number
  const validatePhoneNumber = (number) => /^\d{10}$/.test(number);

  // Function to handle form submission
  const handleAddDonor = () => {
    const newErrors = {};
    if (!donorId) newErrors.donorId = "Donor ID is required";
    if (!donorNIC) newErrors.donorNIC = "NIC is required";
    else if (donorNIC.length < 10) newErrors.donorNIC = "NIC must be at least 10 characters long";    if (!donorName) newErrors.donorName = "Name is required";
    if (!donorAddress) newErrors.donorAddress = "Address is required";
    if (!date) newErrors.date = "Date of Birth is required";
    if (!mobileNumber) newErrors.mobileNumber = "Mobile number is required";
    else if (!validatePhoneNumber(mobileNumber)) newErrors.mobileNumber = "Mobile number must contain only numbers";
    if (!occupation) newErrors.occupation = "Occupation is required";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      const startTime = Date.now();
      const donorData = {
        donorId: donorId,
        donorNIC: donorNIC,
        donorName: donorName,
        donorAddress: donorAddress,
        dateOfBirth: convertToISO(date),  // Ensure this matches the API
        mobileNumber: mobileNumber,
        occupation: occupation,
      };
  
      addDonor(donorData)
        .then((response) => {
          console.log("Donor added successfully:", response);
          // Clear form fields
          setDonorId(generateNextId(donorId));
          setDonorNIC("");
          setDonorName("");
          setDonorAddress("");
          setDate("");
          setMobileNumber("");
          setOccupation("");
  
          const elapsedTime = Date.now() - startTime;
          const remainingTime = 500 - elapsedTime;
          setTimeout(() => {
            setLoading(false);
            handleCloseModal();
            setSnackbar({ open: true, message: `Donor registered successfully`, severity: "success" });
          }, remainingTime > 0 ? remainingTime : 0);
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
        aria-labelledby="form-dialog-title"
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <DialogTitle sx={{ bgcolor: "#f0f0f0", position: 'relative' }} id="modal-modal-title">
          <div style={{ color: "#d63333", fontWeight: '700', fontSize: '16px' }}>
          {"Register Donor"}
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
              label="Donor ID"
              variant="outlined"
              fullWidth
              value={donorId}
              onChange={(e) => setDonorId(e.target.value)}
              error={!!errors.donorId}
              helperText={errors.donorId}
              disabled
            />
          </Box>
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
              label="Date of Birth"
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
        <DialogActions sx={{bgcolor:"#f0f0f0"}}>
          <Button
            onClick={handleAddDonor}
            color="secondary"
            variant="contained"
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {"Register Donor"}
          </Button>
          <Button onClick={handleCloseModal}  variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DonorRegistrationModal;
