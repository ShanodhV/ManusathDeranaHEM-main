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
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useGetPatientsByCampQuery, useAddLabReportMutation } from "state/api";
import CustomTextField from "components/CustomTextField";

const LabReportModal = ({ open, onClose, camp }) => {
  const theme = useTheme();
  const { data: patients, isLoading: isLoadingPatients, error: patientError } = useGetPatientsByCampQuery(camp?._id, { skip: !camp });
  const [addLabReport] = useAddLabReportMutation();
  const [selectedPatient, setSelectedPatient] = useState("");
  const [reportValues, setReportValues] = useState({
    gender: "",
    kidneySerum: "",
    sugarLevel: "",
    cholesterolLevel: "",
    bloodPressure: "",
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (patientError) {
      console.error("Error fetching patients:", patientError);
      setSnackbar({ open: true, message: "Error fetching patients", severity: "error" });
    }
  }, [patientError]);

  const handlePatientChange = (event) => {
    setSelectedPatient(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReportValues({ ...reportValues, [name]: value });
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!selectedPatient) newErrors.selectedPatient = "Patient is required";
    if (!reportValues.gender) newErrors.gender = "Gender is required";
    if (!reportValues.kidneySerum) newErrors.kidneySerum = "Kidney Serum is required";
    if (!reportValues.sugarLevel) newErrors.sugarLevel = "Sugar Level is required";
    if (!reportValues.cholesterolLevel) newErrors.cholesterolLevel = "Cholesterol Level is required";
    // Blood pressure is optional, so no validation required

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      try {
        await addLabReport({
          patient: selectedPatient,
          ...reportValues,
        }).unwrap();
        setSnackbar({ open: true, message: "Lab report added successfully", severity: "success" });
        handleClose();
      } catch (error) {
        setSnackbar({ open: true, message: "Error adding lab report", severity: "error" });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    setSelectedPatient("");
    setReportValues({
      gender: "",
      kidneySerum: "",
      sugarLevel: "",
      cholesterolLevel: "",
      bloodPressure: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <>
      <Dialog fullScreen open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle sx={{ bgcolor: "#f0f0f0" }} id="form-dialog-title">
          <div style={{ color: "#d63333", fontWeight: "700", fontSize: "16px" }}>
            Add Lab Report for {camp.CampId}
            <hr style={{ borderColor: "#d63333" }} />
          </div>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8, color: theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <CustomTextField
              select
              label="Select Patient"
              fullWidth
              value={selectedPatient}
              onChange={handlePatientChange}
              error={!!errors.selectedPatient}
              helperText={errors.selectedPatient}
              disabled={isLoadingPatients}
            >
              {patients?.map((patient) => (
                <MenuItem key={patient._id} value={patient._id}>
                  {patient.name} ({patient.NIC})
                </MenuItem>
              ))}
            </CustomTextField>
          </Box>
          <Box sx={{ mt: 2 }}>
            <CustomTextField
              select
              label="Gender"
              name="gender"
              fullWidth
              value={reportValues.gender}
              onChange={handleInputChange}
              error={!!errors.gender}
              helperText={errors.gender}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </CustomTextField>
          </Box>
          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="Kidney Serum"
              name="kidneySerum"
              variant="outlined"
              fullWidth
              type="number"
              value={reportValues.kidneySerum}
              onChange={handleInputChange}
              error={!!errors.kidneySerum}
              helperText={errors.kidneySerum}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="Sugar Level"
              name="sugarLevel"
              variant="outlined"
              fullWidth
              type="number"
              value={reportValues.sugarLevel}
              onChange={handleInputChange}
              error={!!errors.sugarLevel}
              helperText={errors.sugarLevel}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="Cholesterol Level"
              name="cholesterolLevel"
              variant="outlined"
              fullWidth
              type="number"
              value={reportValues.cholesterolLevel}
              onChange={handleInputChange}
              error={!!errors.cholesterolLevel}
              helperText={errors.cholesterolLevel}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <CustomTextField
              label="Blood Pressure"
              name="bloodPressure"
              variant="outlined"
              fullWidth
              value={reportValues.bloodPressure}
              onChange={handleInputChange}
              helperText="Optional"
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
            Add Report
          </Button>
          <Button onClick={handleClose} variant="outlined" color="secondary">
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
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LabReportModal;
