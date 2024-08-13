import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme, Snackbar, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import Buttons from 'components/Buttons';
import DataGridCustomToolbar from 'components/DataGridCustomToolbar';
import { useGetDonorVolunteersQuery, useDeleteDonorVolunteerMutation } from 'state/api';
import DonorRegistrationModal from './DonorRegistrationModal';
import UpdateVolunteerRegistation from './UpdateVolunteerRegistation';
import ConfirmationDialog from "components/ConfirmationDialog";

const VolunteerDonorRegistrationTab = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const { data, isLoading, refetch, error } = useGetDonorVolunteersQuery();
  const [deleteDonorVolunteer] = useDeleteDonorVolunteerMutation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });


  useEffect(() => {
    if (error) {
      console.error("Error fetching donors:", error);
    }
  }, [error]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  
  const handleDelete = (DonorID) => {
    setOpenConfirm(true);
    setSelectedDonor(DonorID);
  };


  const handleUpdateClick = (donor) => {
    console.log("Donor selected for update:", donor); // Debug log
    setSelectedDonor(donor);
    setShowUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
    setSelectedDonor(null);
    refetch();
  };

  const confirmDelete = () => {
    deleteDonorVolunteer(selectedDonor)
      .unwrap()
      .then((response) => {
        console.log("Donor deleted successfully");
        setSnackbar({ open: true, message: "Donor deleted successfully", severity: "success" });
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting donor:", error);
        setSnackbar({ open: true, message: "Error deleting donor", severity: "error" });
      });
    setOpenConfirm(false);
  };

  const donorColumns = [
    { field: "donorID", headerName: "Donor ID", flex: 0.5 },
    { field: "donorName", headerName: "Donor Name", flex: 1 },
    { field: "donorAddress", headerName: "Donor Address", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 0.7 },
    { field: "studentID", headerName: "Student ID", flex: 1 },
    { field: "programID", headerName: "Program ID", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
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
          <div style={{padding:'8px'}}></div>
          <Button
            variant="contained"
            color="info"
            endIcon={<Edit />}
            onClick={() => handleUpdateClick(params.row)}
          >
            Update
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Buttons label={"Add Donor"} onClick={handleOpenModal} />
        <DonorRegistrationModal openModal={openModal} closeModal={handleCloseModal} />
      </Box>
      <Box mt="40px" height="75vh" 
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
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
          columns={donorColumns}
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
      {showUpdateForm && (
        <UpdateVolunteerRegistation
          openModal={showUpdateForm}
          closeModal={handleCloseUpdateForm}
          newDonorData={selectedDonor}
          refetch={refetch}
        />
      )}

<ConfirmationDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this donor? This action cannot be undone."
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

export default VolunteerDonorRegistrationTab;
