import React, { useState, useEffect } from "react";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PatientRegistrationModal from "./PatientRegistrationModal";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { DataGrid } from "@mui/x-data-grid";
import { useGetPatientsQuery, useDeletePatientMutation } from "state/api";
import ConfirmationDialog from "components/ConfirmationDialog";
import { Delete, Edit } from "@mui/icons-material";
import CustomButton from "components/Buttons";

const PatientRegistrationTab = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const { data, isLoading, refetch, error } = useGetPatientsQuery();
  const [deletePatient] = useDeletePatientMutation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (error) {
      console.error("Error fetching patients:", error);
      setSnackbar({ open: true, message: "Error fetching patients", severity: "error" });
    }
  }, [error]);

  const handleOpenModal = (patient = null) => {
    if (patient) {
      setCurrentPatient(patient);
      setIsUpdate(true);
    } else {
      setCurrentPatient(null);
      setIsUpdate(false);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = (patientID) => {
    setOpenConfirm(true);
    setSelectedPatient(patientID);
  };

  const confirmDelete = () => {
    deletePatient(selectedPatient)
      .unwrap()
      .then((response) => {
        console.log("Patient deleted successfully");
        setSnackbar({ open: true, message: "Patient deleted successfully", severity: "success" });
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting patient:", error);
        setSnackbar({ open: true, message: "Error deleting patient", severity: "error" });
      });
    setOpenConfirm(false);
  };

  const patientColumns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "NIC", headerName: "NIC", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    {
      field: "healthCamp",
      headerName: "Health Camp",
      flex: 1,
      valueGetter: (params) => `${params.row.healthCamp?.CampId || ""}`,
    },
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
          <div style={{padding:'2px'}}></div>
          <Button
            variant="contained"
            color="info"
            endIcon={<Edit />}
            onClick={() => handleOpenModal(params.row)}
          >
            Update
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <CustomButton label="Register Patient" onClick={() => handleOpenModal()} />
      </Box>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none", color: theme.palette.secondary[100] },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: theme.palette.background.alt, color: theme.palette.secondary[100], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: theme.palette.primary.light },
          "& .MuiDataGrid-footerContainer": { backgroundColor: theme.palette.background.alt, color: theme.palette.secondary[100], borderTop: "none" },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${theme.palette.secondary[200]} !important` },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={patientColumns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{ toolbar: { searchInput, setSearchInput, setSearch } }}
        />
      </Box>
      <PatientRegistrationModal
        openModal={openModal}
        closeModal={handleCloseModal}
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
    </Box>
  );
};

export default PatientRegistrationTab;
