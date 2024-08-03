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
  Select,
  InputLabel,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useAddLabReportMutation, useGetPatientsByCampQuery, useGetLabReportsQuery } from "state/api";

const LabReportModal = ({ open, onClose, camp }) => {
  const theme = useTheme();
  const [patient, setPatient] = useState("");
  const [gender, setGender] = useState("");
  const [kidneySerum, setKidneySerum] = useState("");
  const [sugarLevel, setSugarLevel] = useState("");
  const [cholesterolLevel, setCholesterolLevel] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [addLabReport] = useAddLabReportMutation();
  const { data: campPatients, isLoading: isLoadingPatients } = useGetPatientsByCampQuery(camp._id);
  const { data: labReports } = useGetLabReportsQuery();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (snackbar.open) {
      const timer = setTimeout(() => setSnackbar({ ...snackbar, open: false }), 6000);
      return () => clearTimeout(timer);
    }
  }, [snackbar]);

  const validateKidneySerum = (value) => /^(\d|\d\.\d)$/.test(value);
  const validateNumeric = (value) => /^\d+(\.\d+)?$/.test(value);
  const validateBloodPressure = (value) => /^\d{2,3}\/\d{2,3}$/.test(value);

  const handleSubmit = async () => {
    const newErrors = {};
    if (!patient) newErrors.patient = "Patient is required";
    if (!gender) newErrors.gender = "Gender is required";
    if (!kidneySerum || !validateKidneySerum(kidneySerum)) newErrors.kidneySerum = "Valid Kidney Serum is required";
    if (!sugarLevel || !validateNumeric(sugarLevel)) newErrors.sugarLevel = "Valid Sugar Level is required";
    if (!cholesterolLevel || !validateNumeric(cholesterolLevel)) newErrors.cholesterolLevel = "Valid Cholesterol Level is required";
    if (!bloodPressure || !validateBloodPressure(bloodPressure)) newErrors.bloodPressure = "Valid Blood Pressure is required";

    const existingReport = labReports?.find(report => report.patient === patient && report.camp === camp._id);

    if (existingReport) {
      newErrors.patient = "Lab report for this patient already exists in this camp";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      const labReportData = {
        patient,
        gender,
        kidneySerum,
        sugarLevel,
        cholesterolLevel,
        bloodPressure,
        camp: camp._id,
      };

      try {
        await addLabReport(labReportData).unwrap();
        setSnackbar({
          open: true,
          message: "Lab report created successfully",
          severity: "success",
        });
        setTimeout(() => {
          onClose();
          setPatient("");
          setGender("");
          setKidneySerum("");
          setSugarLevel("");
          setCholesterolLevel("");
          setBloodPressure("");
          setErrors({});
        }, 1500); // Delay to show the snackbar before closing the modal
      } catch (error) {
        setSnackbar({ open: true, message: error.data?.error || "Error saving lab report", severity: "error" });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle sx={{ bgcolor: "#f0f0f0" }} id="form-dialog-title">
          <div style={{ color: "#d63333", fontWeight: "700", fontSize: "16px" }}>
            Register Lab Report
            <hr style={{ borderColor: "#d63333" }} />
          </div>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8, color: theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Patient</InputLabel>
              <Select
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                disabled={isLoadingPatients}
                error={!!errors.patient}
              >
                {campPatients?.map((p) => (
                  <MenuItem key={p._id} value={p._id}>
                    {p.name} ({p.NIC})
                  </MenuItem>
                ))}
              </Select>
              {errors.patient && (
                <Typography color="error" variant="caption">
                  {errors.patient}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                error={!!errors.gender}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              {errors.gender && (
                <Typography color="error" variant="caption">
                  {errors.gender}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Kidney Serum"
              variant="outlined"
              value={kidneySerum}
              onChange={(e) => setKidneySerum(e.target.value)}
              fullWidth
              error={!!errors.kidneySerum}
              helperText={errors.kidneySerum}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Sugar Level"
              variant="outlined"
              value={sugarLevel}
              onChange={(e) => setSugarLevel(e.target.value)}
              fullWidth
              error={!!errors.sugarLevel}
              helperText={errors.sugarLevel}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Cholesterol Level"
              variant="outlined"
              value={cholesterolLevel}
              onChange={(e) => setCholesterolLevel(e.target.value)}
              fullWidth
              error={!!errors.cholesterolLevel}
              helperText={errors.cholesterolLevel}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Blood Pressure"
              variant="outlined"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
              fullWidth
              error={!!errors.bloodPressure}
              helperText={errors.bloodPressure}
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
            Register Lab Report
          </Button>
          <Button onClick={onClose} variant="outlined" color="secondary">
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
