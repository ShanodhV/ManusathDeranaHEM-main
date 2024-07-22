import React, { useState, useEffect } from "react";
import { Box, Button, Snackbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PatientRegistrationModal from "./PatientRegistrationModal";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { DataGrid } from "@mui/x-data-grid";
import { useGetPatientsQuery, useDeletePatientMutation } from "state/api";
import ConfirmationDialog from "components/ConfirmationDialog"; // Import the confirmation dialog
import { Delete } from "@mui/icons-material";
import Buttons from "components/Buttons";

const PatientRegistrationTab = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, refetch, error } = useGetPatientsQuery();
  const [deletePatient] = useDeletePatientMutation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (error) {
      console.error("Error fetching patients:", error);
    }
  }, [error]);

  const handleOpenModal = () => {
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
        setToastOpen(true);
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting patient:", error);
      });
    setOpenConfirm(false);
  };

  const handleUpdateClick = (camp) => {
    console.log("Update camp:", camp);
    // Implement the update logic here
    handleOpenModal(); // If you want to reuse the modal for update
  };

  const patientColumns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "NIC",
      headerName: "NIC",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "City",
      headerName: "City",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-around">
          <Box
            display="flex"
            justifyContent="flex-end"
            mr={2}
            sx={{
              "& button": {
                backgroundColor: theme.palette.secondary[400],
                color: "white",
              },
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </Button>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{
              "& button": {
                backgroundColor: theme.palette.primary[700],
                color: "white",
              },
            }}
          >
            <Button
              variant="contained"
              color="info"
              onClick={() => handleUpdateClick(params.row)}
            >
              Update
            </Button>
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Buttons label="Register Patient" onClick={handleOpenModal} />
        <PatientRegistrationModal open={openModal} onClose={handleCloseModal} />
      </Box>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            color: theme.palette.secondary[100],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
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
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
      <ConfirmationDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this patient? This action cannot be undone."
      />
      <Snackbar
        open={toastOpen}
        autoHideDuration={6000}
        onClose={() => setToastOpen(false)}
        message="Patient deleted successfully"
      />
    </Box>
  );
};

export default PatientRegistrationTab;
