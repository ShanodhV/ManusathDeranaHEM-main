import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Buttons from "components/Buttons";
import SchoolRegistrationModal from "./SchoolRegistrationModal"; // Import the SchoolRegistrationModal component
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useGetSchoolsQuery, useDeleteSchoolMutation } from "state/api";

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

  useEffect(() => {
    if (error) {
      console.error("Error fetching schools:", error);
    }
  }, [error]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = (schoolID) => {
    deleteSchool(schoolID)
      .unwrap()
      .then((response) => {
        console.log("School deleted successfully");
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting school:", error);
      });
  };

  const handleUpdate = (schoolID) => {
    // Logic to handle update action
    console.log("Update school with ID:", schoolID);
    // Open modal with school data to update
    // You might want to set some state here to pass the school data to the modal
  };

  const schoolColumns = [
    {
      field: "schoolID",
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
        <Box display="flex" alignItems="center">
          <Buttons
            label="Update"
            onClick={() => handleUpdate(params.row.schoolID)}
            style={{ backgroundColor: "blue", color: "white", marginRight: "8px" }}
          />
          <Buttons
            label="Delete"
            onClick={() => handleDelete(params.row.schoolID)}
            style={{ backgroundColor: "red", color: "white" }} // Assuming you have styles for the Delete button as well
          />
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Buttons label={"Register School"} onClick={handleOpenModal} />
      </Box>
      {/* Render the SchoolRegistrationModal component and pass necessary props */}
      <SchoolRegistrationModal
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
          getRowId={(row) => row.schoolID}
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
    </Box>
  );
};

export default SchoolRegistrationTab;
