import { Delete, Edit } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import Button from "components/Buttons";
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

  useEffect(() => {
    if (error) {
      console.error("Error fetching volunteers:", error);
      setSnackbar({ open: true, message: "Error fetching volunteer", severity: "error" });
    }

    // Debugging: Log the fetched data
    if (data) {
      console.log("Fetched volunteer data:", data);
    }
  }, [error, data]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = (volunteerID) => {
    deleteVolunteer(volunteerID)
      .unwrap()
      .then(() => {
        console.log("Volunteer deleted successfully");
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting volunteer:", error);
      });
  };

  // Define columns for the data grid
  const volunteerColumns = [
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
      field: "city",
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
          <Button
            variant="contained"
            color="error"
            endIcon={<Delete />}
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
          <div style={{ padding: "2px" }}></div>
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
    <Box m="1.5rem 2.5rem">
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button label="Register Volunteer" onClick={handleOpenModal} />
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
          rows={data?.volunteers || []} // Use the correct path to access volunteer data
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
    </Box>
  );
};

export default VolunteerRegistrationTab;
