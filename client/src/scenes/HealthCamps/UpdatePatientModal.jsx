import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  Button,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import CustomTextField from "components/CustomTextField";
import { useUpdatePatientMutation } from "state/api";

const UpdatePatientModal = ({ openModal, closeModal, currentPatient }) => {
  const theme = useTheme();
  const [patientId, setPatientId] = useState("");
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [updatePatient] = useUpdatePatientMutation();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentPatient) {
      setPatientId(currentPatient.patientId);
      setName(currentPatient.name);
      setNic(currentPatient.nic);
      setPhone(currentPatient.phone);
      setAddress(currentPatient.address);
      setCity(currentPatient.city);
    }
  }, [currentPatient]);

  const validatePhoneNumber = (number) => /^\d{10}$/.test(number);

  const handleSubmit = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!nic) newErrors.nic = "NIC is required";
    if (!phone) newErrors.phone = "Phone number is required";
    else if (!validatePhoneNumber(phone)) newErrors.phone = "Phone number must contain only 10 digits";
    if (!address) newErrors.address = "Address is required";
    if (!city) newErrors.city = "City is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      const patientData = {
        patientId,
        name,
        nic,
        phone,
        address,
        city,
      };

      updatePatient({ id: currentPatient._id, ...patientData })
        .then((response) => {
          console.log("Patient updated successfully:", response);

          setLoading(false);
          closeModal();
          setSnackbar({ open: true, message: `Patient updated successfully`, severity: "success" });
        })
        .catch((error) => {
          console.error("Error updating patient:", error);
          setLoading(false);
          setSnackbar({ open: true, message: "Error updating patient", severity: "error" });
        });
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
        <DialogTitle sx={{ bgcolor: "#f0f0f0" }} id="form-dialog-title">
          <div style={{ color: "#d63333", fontWeight: '700', fontSize: '16px' }}>
            {"Update Patient"}
            <hr style={{ borderColor: "#d63333", }} />
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
          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="Patient ID"
              variant="outlined"
              value={patientId}
              fullWidth
              disabled
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="NIC"
              variant="outlined"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              fullWidth
              error={!!errors.nic}
              helperText={errors.nic}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              error={!!errors.address}
              helperText={errors.address}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="City"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              error={!!errors.city}
              helperText={errors.city}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#f0f0f0" }}>
          <Button
            onClick={handleSubmit}
            color="secondary"
            variant="contained"
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {"Update Patient"}
          </Button>
          <Button onClick={closeModal} variant="outlined" color="secondary">
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

export default UpdatePatientModal;
