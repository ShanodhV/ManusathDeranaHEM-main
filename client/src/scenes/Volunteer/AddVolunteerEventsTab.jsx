import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Buttons from "components/Buttons";
import AddVolunteerEventsModal from "./AddVolunteerEventsModal"; // Import the AddVolunteerEventsModal component
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useGetVolunteerEventsQuery, useDeleteVolunteerEventMutation } from "state/api";

const VolunteerEventsTab = () => {
  const theme = useTheme();

  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, refetch, error } = useGetVolunteerEventsQuery();
  const [deleteVolunteerEvent] = useDeleteVolunteerEventMutation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (error) {
      console.error("Error fetching volunteer events:", error);
    }
  }, [error]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = (eventId) => {
    deleteVolunteerEvent(eventId)
      .unwrap()
      .then((response) => {
        console.log("Volunteer event deleted successfully");
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting volunteer event:", error);
      });
  };

  const eventColumns = [
    {
      field: "eventName",
      headerName: "Event Name",
      flex: 1,
    },
    {
      field: "eventCategory",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "eventDate",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "venue",
      headerName: "Venue",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "relatedOccupations",
      headerName: "Related Occupations",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Buttons
          label="Delete"
          onClick={() => handleDelete(params.row.eventId)}
        />
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Buttons label={"Add Volunteer Event"} onClick={handleOpenModal} />
      </Box>
      {/* Render the AddVolunteerEventsModal component and pass necessary props */}
      <AddVolunteerEventsModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
      <Box
        mt="40px"
        height="75vh"
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
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.eventId}
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
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default VolunteerEventsTab;
