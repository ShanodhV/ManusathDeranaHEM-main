import React, { useState, useEffect } from "react";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomButton from "components/Buttons";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { DataGrid } from "@mui/x-data-grid";
import { useGetCampsQuery, useDeleteCampMutation } from "state/api";
import ConfirmationDialog from "components/ConfirmationDialog";
import { Delete, Edit } from "@mui/icons-material";

const HealthCampsTab = ({ handleOpenCreateModal, handleOpenUpdateModal }) => {
  const theme = useTheme();
  const [currentCamp, setCurrentCamp] = useState(null);
  const { data, isLoading, refetch, error } = useGetCampsQuery();
  const [deleteHealthCamp] = useDeleteCampMutation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (error) {
      console.error("Error fetching health camps:", error);
      setSnackbar({ open: true, message: "Error fetching health camps", severity: "error" });
    }
  }, [error]);

  const handleDelete = (campID) => {
    setOpenConfirm(true);
    setSelectedCamp(campID);
  };

  const confirmDelete = () => {
    deleteHealthCamp(selectedCamp)
      .unwrap()
      .then((response) => {
        console.log("Health Camp deleted successfully");
        setSnackbar({ open: true, message: "Health Camp deleted successfully", severity: "success" });
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting health camp:", error);
        setSnackbar({ open: true, message: "Error deleting health camp", severity: "error" });
      });
    setOpenConfirm(false);
  };

  const campColumns = [
    { field: "CampId", headerName: "Camp ID", flex: 1 },
    { field: "District", headerName: "District", flex: 1 },
    { field: "Town", headerName: "Town", flex: 1 },
    {
      field: 'ContactPersons',
      headerName: 'Contact Persons',
      flex: 1,
      renderCell: (params) => {
        const { value } = params;
        if (!value || !Array.isArray(value)) return null;
        
        return (
          <div>
            {value.map((contact, index) => (
              <div key={index}>
                <strong>{contact.cname}</strong> - {contact.cnumber}
              </div>
            ))}
          </div>
        );
      },
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
            endIcon={<Delete/>}
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
          <div style={{padding:'2px'}}></div>
          <Button
            variant="contained"
            color="info"
            endIcon={<Edit/>}
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
        <CustomButton label="Create Health Camp" onClick={handleOpenCreateModal} />
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
          columns={campColumns}
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
        description="Are you sure you want to delete this health camp? This action cannot be undone."
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

export default HealthCampsTab;
