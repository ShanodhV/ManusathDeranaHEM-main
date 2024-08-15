import { Delete, Edit } from "@mui/icons-material";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import CustomButton from "components/Buttons";
import ConfirmationDialog from "components/ConfirmationDialog";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useEffect, useState } from "react";
import { useDeleteVolunteerMutation, useGetVolunteersQuery } from "state/api";
import EditVolunteerModal from "./EditVolunteerModal";
import VolunteerRegistrationModal from "./VolunteerRegistrationModal";

const VolunteerRegistrationTab = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [sortModel, setSortModel] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading, refetch, error } = useGetVolunteersQuery();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [currentVolunteer, setCurrentVolunteer] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [deleteVolunteer] = useDeleteVolunteerMutation();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

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
    setOpenEditModal(false);
    setCurrentVolunteer(null);
  };

  const handleDeleteClick = (volunteerID) => {
    setSelectedVolunteer(volunteerID);
    setOpenConfirm(true);
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
        refetch();
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
        setOpenConfirm(false);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const handleEditClick = (volunteer) => {
    console.log("Selected volunteer data:", volunteer); // Debugging: Log the volunteer data
    setCurrentVolunteer(volunteer);
    setOpenEditModal(true);
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
            onClick={() => handleDeleteClick(params.row._id)}
          >
            Delete
          </Button>
          <div style={{ padding: "2px" }}></div>
          <Button
            variant="contained"
            color="info"
            endIcon={<Edit />}
            onClick={() => handleEditClick(params.row)}
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
          rows={data || []}
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

      <ConfirmationDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this volunteer? This action cannot be undone."
      />

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

      {currentVolunteer && (
        <EditVolunteerModal
          openModal={openEditModal}
          handleCloseModal={handleCloseModal}
          volunteerData={currentVolunteer}
          onVolunteerUpdated={refetch}
        />
      )}
    </Box>
  );
};

export default VolunteerRegistrationTab;
