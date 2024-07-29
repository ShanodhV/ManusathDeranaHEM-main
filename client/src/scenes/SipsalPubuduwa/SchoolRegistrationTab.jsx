import React, { useState, useEffect } from "react";
import { Box, Avatar, Button } from "@mui/material";
import Buttons from "components/Buttons";
import SchoolRegistrationModal from "./SchoolRegistrationModal"; // Import the SchoolRegistrationModal component
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useGetSchoolsQuery, useDeleteSchoolMutation } from "state/api";
import ConfirmationDialog from "components/ConfirmationDialog"; // Import the ConfirmationDialog component
import { Delete, Edit } from "@mui/icons-material";

const SchoolRegistrationTab = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, refetch, error } = useGetSchoolsQuery();
  const [deleteSchool] = useDeleteSchoolMutation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null); // State to manage selected school for update
  const [openConfirm, setOpenConfirm] = useState(false); // State to manage confirmation dialog
  const [schoolToDelete, setSchoolToDelete] = useState(null); // State to store the school to delete

  useEffect(() => {
    if (error) {
      console.error("Error fetching schools:", error);
    }
  }, [error]);

  const handleOpenModal = (school = null) => {
    setSelectedSchool(school); // Set the selected school for the modal
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSchool(null); // Clear the selected school on modal close
  };

  const handleDelete = (schoolId) => {
    setOpenConfirm(true);
    setSchoolToDelete(schoolId);
  };

  const confirmDelete = () => {
    deleteSchool(schoolToDelete)
      .unwrap()
      .then((response) => {
        console.log("School deleted successfully");
        setOpenConfirm(false);
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting school:", error);
        setOpenConfirm(false);
      });
  };

  const schoolColumns = [
    {
      field: "schoolId",
      headerName: "School ID",
      flex: 1,
    },
    {
      field: "schoolName",
      headerName: "School Name",
      flex: 1,
    },
    {
      field: "schoolAddress",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "schoolMobileNumber",
      headerName: "Mobile Number",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "PrincipalName",
      headerName: "Principal Name",
      flex: 1,
    },
    {
      field: "principalContact",
      headerName: "Principal Contact",
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
              onClick={() => handleDelete(params.row.schoolId)}
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
              onClick={() => handleOpenModal(params.row)}
            >
              Update
            </Button>
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Buttons label={"Register School"} onClick={() => handleOpenModal()} />
      </Box>
      {/* Render the SchoolRegistrationModal component and pass necessary props */}
      <SchoolRegistrationModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        school={selectedSchool} // Pass the selected school data to the modal
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
          getRowId={(row) => row.schoolId}
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
        description="Are you sure you want to delete this school? This action cannot be undone."
      />
    </Box>
  );
};

export default SchoolRegistrationTab;
