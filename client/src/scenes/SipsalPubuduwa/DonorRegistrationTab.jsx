import React, { useState, useEffect } from "react";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import DonorRegistrationModal from "./DonorRegistrationModal";
import { DataGrid } from "@mui/x-data-grid";
import { useGetDonorsQuery, useDeleteDonorMutation } from "state/api";
import { useTheme } from "@mui/material/styles";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import ConfirmationDialog from "components/ConfirmationDialog";
import { Delete, Edit } from "@mui/icons-material";
import Buttons from "components/Buttons";
import UpdateDonorModal from "./UpdateDonorRegistrationModal"

const DonorRegistrationTab = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [currentDonor, setcurrentDonor] = useState(null);
  const { data, isLoading, refetch, error } = useGetDonorsQuery();
  const [deleteDonor] = useDeleteDonorMutation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [donorToDelete, setDonorToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleOpenUpdateModal = (donor) => {
    setSelectedDonor(donor);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedDonor(null);
  };


  useEffect(() => {
    if (error) {
      console.error("Error fetching donors:", error);
      setSnackbar({ open: true, message: "Error fetching donors", severity: "error" });
    }
  }, [error]);

  const handleOpenModal = (donor) => {
    setSelectedDonor(donor); // Set the selected donor for the modal
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDonor(null); // Clear the selected donor on modal close
  };

  const handleDelete = (donorId) => {
    console.log("Attempting to delete donor with NIC:", donorId); // Debugging log
    setOpenConfirm(true);
    setDonorToDelete(donorId);
  };
  

  // const handleOpenUpdateModal = (donor) => {
  //   setcurrentDonor(donor);
  //   setOpenUpdateModal(true);
  // };

  const confirmDelete = () => {
    if (!donorToDelete) return;
    
    deleteDonor(donorToDelete)
      .unwrap()
      .then((response) => {
        console.log("Donor deleted successfully:", response);
        setOpenConfirm(false);
        setSnackbar({ open: true, message: "Donor deleted successfully!", severity: "success" });
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting donor:", error);
        setSnackbar({ open: true, message: "Failed to delete donor. Please try again.", severity: "error" });
        setOpenConfirm(false);
      });
  };
  

  const donorColumns = [
    {
      field: "donorId",
      headerName: "Donor ID",
      flex: 1,
    },
    {
      field: "donorNIC",
      headerName: "Donor NIC",
      flex: 1,
    },
    {
      field: "donorName",
      headerName: "Donor Name",
      flex: 1,
    },
    {
      field: "donorAddress",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "mobileNumber",
      headerName: "Mobile Number",
      flex: 1,
    },
    // {
    //   field: "dateOfBirth",
    //   headerName: "Date of Birth",
    //   flex: 1,
    //   valueFormatter: ({ value }) => {
    //     if (!value) return "";
    //     // Convert ISO date string to a Date object
    //     const date = new Date(value);
    //     // Format the date as MM/DD/YYYY
    //     const day = date.getUTCDate().toString().padStart(2, "0");
    //     const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    //     const year = date.getUTCFullYear();
    //     return `${month}/${day}/${year}`;
    //   },
    // }
    ,
    {
      field: "occupation",
      headerName: "Occupation",
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
            onClick={() => handleOpenUpdateModal(params.row)}
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
        <Buttons label="Register Donor" onClick={handleOpenModal} />
      </Box>

      <DonorRegistrationModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        donor={selectedDonor} // Pass the selected donor data to the modal
      />
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
  getRowId={(row) => row._id}  // Ensure each row has a unique identifier
  rows={data?.items || []}     // Adjust according to the API response
  columns={donorColumns}
  rowCount={data?.total || 0}  // Optional: useful for server-side pagination
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

      <UpdateDonorModal
        openModal={openUpdateModal}
        handleCloseModal={handleCloseUpdateModal}
        donorData={selectedDonor} // Pass the selected donor data to the modal
      />

    </Box>
  );
};

export default DonorRegistrationTab;
