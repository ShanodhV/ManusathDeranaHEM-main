import { Delete, Edit } from "@mui/icons-material";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import Buttons from "components/Buttons";
import ConfirmationDialog from "components/ConfirmationDialog";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useEffect, useState } from "react";
import { useDeleteVolunteerEventMutation, useGetVolunteerEventsQuery } from "state/api";
import AddVolunteerEventsModal from "./AddVolunteerEventsModal";
import UpdateVolunteerEventsModal from "./UpdateVolunteerEventsModal"; // Import the update modal

const AddVolunteerEventsTab = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false); // State for update modal
  const [currentEvent, setCurrentEvent] = useState(null); // State to hold the current event data
  const { data, isLoading, refetch, error } = useGetVolunteerEventsQuery();
  const [deleteVolunteerEvent] = useDeleteVolunteerEventMutation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (error) {
      console.error("Error fetching volunteer events:", error);
      setSnackbar({ open: true, message: "Error fetching volunteer events", severity: "error" });
    }
  }, [error]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenUpdateModal = (eventData) => {
    setCurrentEvent(eventData);  // Set current event data to be updated
    setOpenUpdateModal(true);    // Open the update modal
  };

  const handleCloseUpdateModal = () => {
    setCurrentEvent(null);       // Clear current event data
    setOpenUpdateModal(false);   // Close the update modal
  };

  const handleDelete = (eventId) => {
    setOpenConfirm(true);
    setSelectedEvent(eventId);
  };

  const confirmDelete = () => {
    deleteVolunteerEvent(selectedEvent)
      .unwrap()
      .then(() => {
        console.log("Volunteer event deleted successfully");
        setSnackbar({ open: true, message: "Volunteer event deleted successfully", severity: "success" });
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting volunteer event:", error);
        setSnackbar({ open: true, message: "Error deleting volunteer event", severity: "error" });
      });
    setOpenConfirm(false);
  };

  const eventColumns = [
    { field: "eventName", headerName: "Event Name", flex: 1 },
    { field: "eventCategory", headerName: "Category", flex: 1 },
    { field: "eventDate", headerName: "Date", flex: 1 }, // Ensure this is formatted correctly
    { field: "venue", headerName: "Venue", flex: 1 },
    { field: "relatedOccupations", headerName: "Related Occupations", flex: 1 },
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
            onClick={() => handleOpenUpdateModal(params.row)} // Open the update modal with the current event data
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
        <Buttons label="Add Volunteer Event" onClick={handleOpenModal} />
      </Box>

      <AddVolunteerEventsModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />

      <UpdateVolunteerEventsModal
        openModal={openUpdateModal}  // Pass state to open/close modal
        handleCloseModal={handleCloseUpdateModal}  // Pass close handler
        eventData={currentEvent}  // Pass the current event data for editing
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
          getRowId={(row) => row._id}
          rows={data || []}
          columns={eventColumns}
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
      <ConfirmationDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this volunteer event? This action cannot be undone."
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

export default AddVolunteerEventsTab;
