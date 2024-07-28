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
import { useGetLabReportsByCampQuery } from "state/api";

const LabReportListModal = ({ open, onClose, camp }) => {
  const theme = useTheme();
  const { data: labReports, isLoading, error } = useGetLabReportsByCampQuery(camp?._id, { skip: !camp });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (error) {
      console.error("Error fetching lab reports:", error);
      setSnackbar({ open: true, message: "Error fetching lab reports", severity: "error" });
    }
  }, [error]);

  const labReportColumns = [
    { field: "patientName", headerName: "Patient Name", flex: 1 },
    { field: "NIC", headerName: "NIC", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "kidneySerum", headerName: "Kidney Serum", flex: 1 },
    { field: "sugarLevel", headerName: "Sugar Level", flex: 1 },
    { field: "cholesterolLevel", headerName: "Cholesterol Level", flex: 1 },
    { field: "bloodPressure", headerName: "Blood Pressure", flex: 1 },
  ];

  return (
    <>
      <Dialog fullScreen open={open} onClose={onClose}>
        <DialogTitle sx={{ bgcolor: "#f0f0f0" }} id="form-dialog-title">
          <div style={{ color: "#d63333", fontWeight: "700", fontSize: "16px" }}>
            Lab Reports of {camp?.CampId}
            <hr style={{ borderColor: "#d63333" }} />
          </div>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ marginTop: "10px" }}>
          <Box height="75vh">
            <DataGrid
              loading={isLoading}
              getRowId={(row) => row._id}
              rows={labReports || []}
              columns={labReportColumns}
              pageSize={20}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#f0f0f0" }}>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Close
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

export default LabReportListModal;
