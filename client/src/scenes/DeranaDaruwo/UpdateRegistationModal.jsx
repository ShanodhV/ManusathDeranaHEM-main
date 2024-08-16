import React, { useState, useEffect } from 'react';
import { Dialog, Box, DialogContent, DialogTitle, DialogActions, IconButton, CircularProgress, Button, Snackbar, Alert } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import CustomTextField from 'components/CustomTextField';
import { useUpdateStudentsMutation, useGetDeranaDaruwoProgramsQuery, useGetStudentsByDeranaDaruwoProgramQuery } from "state/api";
import CloseIcon from "@mui/icons-material/Close";

const UpdateRegistrationModal = ({ openModal, closeModal, refetch, currentStudent, programId }) => {
  const theme = useTheme();
  const [studentName, setStudentName] = useState("");
  const [studentAddress, setStudentAddress] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentContactDetails, setParentContactDetails] = useState("");
  const [bankAccountDetails, setBankAccountDetails] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [updateStudents] = useUpdateStudentsMutation();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const { data: programs, isLoading, isError } = useGetDeranaDaruwoProgramsQuery();
  const { data: programStudents } = useGetStudentsByDeranaDaruwoProgramQuery(programId, { skip: !programId });

  useEffect(() => {
    if (currentStudent) {
      setStudentName(currentStudent.studentName);
      setStudentAddress(currentStudent.studentAddress);
      setParentName(currentStudent.parentName);
      setParentContactDetails(currentStudent.parentContactDetails);
      setBankAccountDetails(currentStudent.bankAccountDetails);
      setAccountNumber(currentStudent.accountNumber);
    }
  }, [currentStudent]);

  const handleUpdateStudent = () => {
    const studentData = {
      studentID: currentStudent?.studentID,  // studentId is used only for identifying the student to update
      studentName,
      studentAddress,
      parentName,
      parentContactDetails,
      bankAccountDetails,
      accountNumber,
      deranaDaruwProgram: programId,
    };

    setLoading(true);
    updateStudents(studentData)
      .then((response) => {
        console.log("Student updated successfully:", response);
        setStudentName("");
        setStudentAddress("");
        setParentName("");
        setParentContactDetails("");
        setBankAccountDetails("");
        setAccountNumber("");
        closeModal();
        refetch();
      })
      .catch((error) => {
        console.error("Error updating student:", error);
        setSnackbar({ open: true, message: "Error updating student", severity: "error" });
      })
      .finally(() => setLoading(false));
  };

  const handleCancel = () => {
    setStudentName("");
    setStudentAddress("");
    setParentName("");
    setParentContactDetails("");
    setBankAccountDetails("");
    setAccountNumber("");
    closeModal();
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
            {"Update Student"}
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
              label="Student Name"
              variant="outlined"
              fullWidth
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 6 }}>
            <CustomTextField
              label="Student Address"
              variant="outlined"
              fullWidth
              value={studentAddress}
              onChange={(e) => setStudentAddress(e.target.value)}
            />
          </Box>
          <br /><br />
          <h4>Parent Details</h4>
          <Box sx={{ mt: 4 }}>
            <CustomTextField
              label="Parent Name"
              variant="outlined"
              fullWidth
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 6 }}>
            <CustomTextField
              label="Parent Contact Details"
              variant="outlined"
              fullWidth
              value={parentContactDetails}
              onChange={(e) => setParentContactDetails(e.target.value)}
            />
          </Box>
          <h4>Bank Account Details</h4>
          <Box sx={{ mt: 4 }}>
            <CustomTextField
              label="Bank Account Details"
              variant="outlined"
              fullWidth
              value={bankAccountDetails}
              onChange={(e) => setBankAccountDetails(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 6 }}>
            <CustomTextField
              label="Account Number"
              variant="outlined"
              fullWidth
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <CustomTextField label="Program object ID" variant="outlined" value={programId} fullWidth disabled />
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#f0f0f0" }}>
          <Button
            onClick={handleUpdateStudent}
            color="secondary"
            variant="contained"
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {"Update Student"}
          </Button>
          <Button onClick={handleCancel} variant="outlined" color="secondary">
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
}

export default UpdateRegistrationModal;
