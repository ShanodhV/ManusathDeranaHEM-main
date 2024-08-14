import React, { useState, useEffect } from "react";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomButton from "components/Buttons";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { DataGrid } from "@mui/x-data-grid";
import { useGetSchoolsQuery, useDeleteSchoolMutation } from "state/api";
import ConfirmationDialog from "components/ConfirmationDialog";
import { Delete, Edit } from "@mui/icons-material";
import CreateSchoolModal from "./SchoolRegistrationModal"; 
import UpdateSchoolModal from "./UpdateSchoolRegistrationModal"; // Import the update modal

const SchoolRegistrationTab = () => {
  const theme = useTheme();
  const [currentSchool, setCurrentSchool] = useState(null);
  const { data, isLoading, refetch, error } = useGetSchoolsQuery();
  const [deleteSchool] = useDeleteSchoolMutation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // State for handling modals
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  useEffect(() => {
    if (error) {
      console.error("Error fetching schools:", error);
      setSnackbar({ open: true, message: "Error fetching schools", severity: "error" });
    }
  }, [error]);

  const handleDelete = (schoolID) => {
    setOpenConfirm(true);
    setSelectedSchool(schoolID);
  };

  const confirmDelete = () => {
    deleteSchool(selectedSchool)
      .unwrap()
      .then(() => {
        setSnackbar({ open: true, message: "School deleted successfully", severity: "success" });
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting school:", error);
        setSnackbar({ open: true, message: "Error deleting school", severity: "error" });
      });
    setOpenConfirm(false);
  };

  const handleOpenUpdateModal = (school) => {
    setCurrentSchool(school);
    setOpenUpdateModal(true);
  };

  const schoolColumns = [
    { field: "schoolId", headerName: "School ID", flex: 0.8 },
    { field: "schoolName", headerName: "School Name", flex: 0.8 },
    { field: "schoolAddress", headerName: "School Address", flex: 1 },
    {
      field: "location",
      headerName: "Town",
      flex: 0.5,
      valueGetter: (params) => params.row.location?.town || "",  // Extract the town from the location object
    },    {
      field: 'principalContact',
      headerName: 'Principal Contact',
      flex: 1,
      renderCell: (params) => {
        const { value } = params;
        if (!value || !Array.isArray(value)) return null;
        
        return (
          <div>
            {value.map((contact, index) => (
              <div key={index}>
                <strong>{contact.pname}</strong> - {contact.pnumber}
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
    <Box m="1.5rem 2.5rem">
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <CustomButton label="Register School" onClick={() => setOpenCreateModal(true)} />
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
          columns={schoolColumns}
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
        description="Are you sure you want to delete this school? This action cannot be undone."
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

      {/* Create School Modal */}
      <CreateSchoolModal openModal={openCreateModal} closeModal={() => setOpenCreateModal(false)} />

      {/* Update School Modal */}
      <UpdateSchoolModal openModal={openUpdateModal} closeModal={() => setOpenUpdateModal(false)} school={currentSchool} />
    </Box>
  );
};

export default SchoolRegistrationTab;
