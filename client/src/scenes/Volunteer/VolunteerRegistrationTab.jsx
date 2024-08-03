import { Delete, Edit } from "@mui/icons-material";
import { Alert, Box, Button, Snackbar } from "@mui/material"; // Import Snackbar and Alert
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import CustomButton from "components/Buttons";
import ConfirmationDialog from "components/ConfirmationDialog"; // Import ConfirmationDialog component
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useEffect, useState } from "react";
import { useDeleteVolunteerMutation, useGetVolunteersQuery } from "state/api";
import VolunteerRegistrationModal from "./VolunteerRegistrationModal"; // Import the VolunteerRegistrationModal component

const VolunteerRegistrationTab = ({ handleOpenCreateModal, handleOpenUpdateModal }) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [sortModel, setSortModel] = useState([]); // Update sort state to an array
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading, refetch, error } = useGetVolunteersQuery();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [deleteVolunteer] = useDeleteVolunteerMutation();

  const [openConfirm, setOpenConfirm] = useState(false); // State for confirmation dialog
  const [selectedVolunteer, setSelectedVolunteer] = useState(null); // State for selected volunteer

  useEffect(() => {
    if (error) {
      console.error("Error fetching volunteers:", error);
      setSnackbar({ open: true, message: "Error fetching volunteer", severity: "error" });
    }
  }, [error]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteClick = (volunteerID) => {
    setSelectedVolunteer(volunteerID); // Set selected volunteer
    setOpenConfirm(true); // Open confirmation dialog
  };

  const handleConfirmDelete = () => {
    deleteVolunteer(selectedVolunteer)
      .unwrap()
      .then(() => {
        console.log("Volunteer deleted successfully");
        setSnackbar({
          open: true,
          message: "Volunteer deleted successfully",
          severity: "success",
        });
        refetch(); // Refetch data after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting volunteer:", error);
        setSnackbar({
          open: true,
          message: "Error deleting volunteer",
          severity: "error",
        });
      })
      .finally(() => {
        setOpenConfirm(false); // Close confirmation dialog
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" }); // Close snackbar
  };

  // Define columns for the data grid
  const volunteerColumns = [
    {
      field: "volunteerName",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "volunteerNIC",
      headerName: "NIC",
      flex: 1,
    },
    {
      field: "contactNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "volunteerAddress",
      headerName: "Address",
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
            onClick={() => handleDeleteClick(params.row._id)} // Trigger confirmation
          >
            Delete
          </Button>
          <div style={{ padding: "2px" }}></div>
          <Button
            variant="contained"
            color="info"
            endIcon={<Edit/>}
            onClick={() => handleOpenUpdateModal(params.row)} // Open update modal
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
        <CustomButton label="Register Volunteer" onClick={handleOpenModal} />
        <VolunteerRegistrationModal openModal={openModal} handleCloseModal={handleCloseModal} />
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
          rows={data || []} // Use the correct path to access volunteer data
          columns={volunteerColumns}
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

      {/* Confirmation Dialog for Delete Action */}
      <ConfirmationDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this volunteer? This action cannot be undone."
      />

      {/* Snackbar for Success/Error Messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VolunteerRegistrationTab;
