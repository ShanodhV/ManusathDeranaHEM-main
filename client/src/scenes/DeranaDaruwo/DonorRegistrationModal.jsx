import {
  Dialog,
  Box,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid
} from '@mui/material';
import React, { useState,useEffect } from 'react';
import { useTheme } from "@mui/material/styles";
import { useAddDonorVolunteerMutation,useGetLastDonorVolunteerQuery } from 'state/api';
import CustomTextField from 'components/CustomTextField';
import CloseIcon from "@mui/icons-material/Close";

const generateNextId = (lastId) => {
  const idNumber = parseInt(lastId.split('-')[2], 10);
  const nextIdNumber = (idNumber + 1).toString().padStart(6, '0');
  return `MD-DV-${nextIdNumber}`;
};

const DonorRegistrationModal = ({ openModal, closeModal }) => {
  const theme = useTheme();
  const [donorID, setDonorID] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorAddress, setDonorAddress] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [addDonor] = useAddDonorVolunteerMutation();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [donorIDError, setDonorIDError] = useState("");
  const [donorNameError, setDonorNameError] = useState("");
  const [donorAddressError, setDonorAddressError] = useState("");
  const [countryCodeError, setCountryCodeError] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [emailAddressError, setEmailAddressError] = useState("");
  const { data: lastDonor, isSuccess } = useGetLastDonorVolunteerQuery();

   useEffect(() => {
      if (isSuccess && lastDonor) {
        setDonorID(generateNextId(lastDonor.donorID));
      } else {
        setDonorID("MD-DV-000001");
      }
    }, [lastDonor, isSuccess]);


  const validateDonorID = (ID) => {

    if (!ID) {
      return "Donor ID is required";
    }
    return "";
  };

  const validateDonorName = (name) => {
    if (!name) {
      return "Donor Name is required";
    }
    return "";
  };

  const validateDonorAddress = (Address) => {
    if (!Address) {
      return "Donor Address is required";
    }
    return "";
  };

  const validateCountryCode = (code) => {
    if (!code) {
      return "Country Code is required";
    }
    return "";
  };

  const validateContactNumber = (contactNumber) => {
    if (!contactNumber) {
      return "Contact Number is required";
    }
    return "";
  };

  const validateEmailAddress = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email Address is required";
    } else if (!emailRegex.test(email)) {
      return "Invalid Email Address";
    }
    return "";
  };

  const handleAddDonor = async () => {
    const donorIDValidationError = validateDonorID(donorID);
    const donorNameValidationError = validateDonorName(donorName);
    const donorAddressValidationError = validateDonorAddress(donorAddress);
    const countryCodeValidationError = validateCountryCode(countryCode);
    const donorContactNumberValidationError = validateContactNumber(contactNumber);
    const donorEmailAddressValidationError = validateEmailAddress(emailAddress);

    if (
      donorIDValidationError ||
      donorNameValidationError ||
      donorAddressValidationError ||
      countryCodeValidationError ||
      donorContactNumberValidationError ||
      donorEmailAddressValidationError
    ) {
      setDonorIDError(donorIDValidationError);
      setDonorNameError(donorNameValidationError);
      setDonorAddressError(donorAddressValidationError);
      setCountryCodeError(countryCodeValidationError);
      setContactNumberError(donorContactNumberValidationError);
      setEmailAddressError(donorEmailAddressValidationError);
      return;
    }

    setDonorIDError("");
    setDonorNameError("");
    setDonorAddressError("");
    setCountryCodeError("");
    setContactNumberError("");
    setEmailAddressError("");

    const donorData = {
      donorID,
      donorName,
      donorAddress,
      countryCode,
      contactNumber,
      emailAddress,
    };

    setLoading(true);
    try {
      const response = await addDonor(donorData).unwrap();
      console.log("Response from addDonor:", response);
      setSnackbar((prevSnackbar) => ({
        ...prevSnackbar,
        open: true,
        message: "Donor added successfully",
        severity: "success",
      }));
      // Clear form fields
      setDonorID("");
      setDonorName("");
      setDonorAddress("");
      setCountryCode("");
      setContactNumber("");
      setEmailAddress("");
      closeModal();
    } catch (error) {
      console.error("Error adding donor:", error);
      setSnackbar((prevSnackbar) => ({
        ...prevSnackbar,
        open: true,
        message: `Error adding donor: ${error.message || "Unknown error"}`,
        severity: "error",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        fullScreen
        open={openModal}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle sx={{ bgcolor: "#f0f0f0", position: 'relative' }} id="form-dialog-title">
          <div style={{ color: "#d63333", fontWeight: '700', fontSize: '16px' }}>
            {"Donor Registration"}
            <hr style={{ borderColor: "#d63333" }} />
          </div>
          <IconButton
            aria-label="close"
            onClick={closeModal}
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
          <Box sx={{ mt: 6 }}>
            <CustomTextField
              label="Donor ID"
              variant="outlined"
              fullWidth
              value={donorID}
              onChange={(e) => {
                setDonorID(e.target.value);
                setDonorIDError(validateDonorID(e.target.value));
              }}
              error={!!donorIDError}
              helperText={donorIDError}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="Donor Name"
              variant="outlined"
              fullWidth
              value={donorName}
              onChange={(e) => {
                setDonorName(e.target.value);
                setDonorNameError(validateDonorName(e.target.value));
              }}
              error={!!donorNameError}
              helperText={donorNameError}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="Donor Address"
              variant="outlined"
              fullWidth
              value={donorAddress}
              onChange={(e) => {
                setDonorAddress(e.target.value);
                setDonorAddressError(validateDonorAddress(e.target.value));
              }}
              error={!!donorAddressError}
              helperText={donorAddressError}
            />
          </Box>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={4}>
              <FormControl fullWidth variant="outlined" error={!!countryCodeError}>
                <InputLabel>Country Code</InputLabel>
                <Select
                  value={countryCode}
                  onChange={(e) => {
                    setCountryCode(e.target.value);
                    setCountryCodeError(validateCountryCode(e.target.value));
                  }}
                  label="Country Code"
                >
                  <MenuItem value="+1">+1 (USA)</MenuItem>
                  <MenuItem value="+44">+44 (UK)</MenuItem>
                  <MenuItem value="+91">+91 (India)</MenuItem>
                  <MenuItem value="+61">+61 (Australia)</MenuItem>
                  <MenuItem value="+81">+81 (Japan)</MenuItem>
                  <MenuItem value="+49">+49 (Germany)</MenuItem>
                  <MenuItem value="+33">+33 (France)</MenuItem>
                  <MenuItem value="+39">+39 (Italy)</MenuItem>
                  <MenuItem value="+34">+34 (Spain)</MenuItem>
                  <MenuItem value="+86">+86 (China)</MenuItem>
                  <MenuItem value="+7">+7 (Russia)</MenuItem>
                  <MenuItem value="+55">+55 (Brazil)</MenuItem>
                  <MenuItem value="+27">+27 (South Africa)</MenuItem>
                  <MenuItem value="+971">+971 (United Arab Emirates)</MenuItem>
                  <MenuItem value="+64">+64 (New Zealand)</MenuItem>
                  <MenuItem value="+82">+82 (South Korea)</MenuItem>
                  <MenuItem value="+52">+52 (Mexico)</MenuItem>
                  <MenuItem value="+60">+60 (Malaysia)</MenuItem>
                  <MenuItem value="+65">+65 (Singapore)</MenuItem>
                </Select>
                {countryCodeError && <p style={{ color: 'red' }}>{countryCodeError}</p>}
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <CustomTextField
                label="Contact Number"
                variant="outlined"
                fullWidth
                value={contactNumber}
                onChange={(e) => {
                  setContactNumber(e.target.value);
                  setContactNumberError(validateContactNumber(e.target.value));
                }}
                error={!!contactNumberError}
                helperText={contactNumberError}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="Email Address"
              variant="outlined"
              fullWidth
              value={emailAddress}
              onChange={(e) => {
                setEmailAddress(e.target.value);
                setEmailAddressError(validateEmailAddress(e.target.value));
              }}
              error={!!emailAddressError}
              helperText={emailAddressError}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleAddDonor}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Add Donor"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prevSnackbar) => ({ ...prevSnackbar, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position the Snackbar
      >
        <Alert
          onClose={() => setSnackbar((prevSnackbar) => ({ ...prevSnackbar, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DonorRegistrationModal;
