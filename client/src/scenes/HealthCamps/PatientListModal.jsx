import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import { useGetPatientsByCampQuery, useDeletePatientMutation } from "state/api";
import PatientRegistrationModal from "./PatientRegistrationModal";
import ConfirmationDialog from "components/ConfirmationDialog";
import { Delete, Edit } from "@mui/icons-material";

const PatientListModal = ({ open, onClose, camp }) => {
  const theme = useTheme();
  const { data: patients, isLoading, refetch, error } = useGetPatientsByCampQuery(camp?._id, { skip: !camp });
  const [deletePatient] = useDeletePatientMutation();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [openPatientModal, setOpenPatientModal] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (error) {
      console.error("Error fetching patients:", error);
      setSnackbar({ open: true, message: "Error fetching patients", severity: "error" });
    }
  }, [error]);

  const handleDelete = (patientID) => {
    setOpenConfirm(true);
    setSelectedPatient(patientID);
  };

  const confirmDelete = () => {
    deletePatient(selectedPatient)
      .unwrap()
      .then(() => {
        setSnackbar({ open: true, message: "Patient deleted successfully", severity: "success" });
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting patient:", error);
        setSnackbar({ open: true, message: "Error deleting patient", severity: "error" });
      });
    setOpenConfirm(false);
  };

  const handleOpenPatientModal = (patient = null) => {
    setCurrentPatient(patient);
    setIsUpdate(!!patient);
    setOpenPatientModal(true);
  };

  const handleClosePatientModal = () => {
    setOpenPatientModal(false);
  };

  const patientColumns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "NIC", headerName: "NIC", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-around">
          <Button
            variant="contained"
            color="error"
            endIcon={<Delete />}
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
          <div style={{ padding: '2px' }}></div>
          <Button
            variant="contained"
            color="info"
            endIcon={<Edit />}
            onClick={() => handleOpenPatientModal(params.row)}
          >
            Update
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Dialog fullScreen open={open} onClose={onClose}>
        <DialogTitle sx={{ bgcolor: "#f0f0f0" }} id="form-dialog-title">
          <div style={{ color: "#d63333", fontWeight: '700', fontSize: '16px' }}>
            Patients of {camp?.CampId}
            <hr style={{ borderColor: "#d63333", }} />
          </div>
          <IconButton
            aria-label="close"
            onClick={onClose}
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
          <Box height="75vh">
            <DataGrid
              loading={isLoading}
              getRowId={(row) => row._id}
              rows={patients || []}
              columns={patientColumns}
              pageSize={20}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#f0f0f0" }}>
          <Button onClick={() => handleOpenPatientModal()} color="secondary" variant="contained">
            Register Patient
          </Button>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <PatientRegistrationModal
        openModal={openPatientModal}
        closeModal={handleClosePatientModal}
        currentPatient={currentPatient}
        isUpdate={isUpdate}
      />

      <ConfirmationDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this patient? This action cannot be undone."
      />

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

export default PatientListModal;
