import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Buttons from "components/Buttons";
import DonorRegistrationModal from "./DonorRegistrationModal";
import { DataGrid } from "@mui/x-data-grid";
import { useGetDonorVolunteersQuery, useDeleteDonorVolunteerMutation } from "state/api";
import { useTheme } from "@mui/material/styles";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import ConfirmationDialog from "components/ConfirmationDialog"; // Import the ConfirmationDialog component

const DonorRegistrationTab = () => {
  const theme = useTheme();

  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, refetch, error } = useGetDonorVolunteersQuery();
  const [deleteDonor] = useDeleteDonorVolunteerMutation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedDonor, setSelectedDonor] = useState(null); // State to manage selected donor for update
  const [openConfirm, setOpenConfirm] = useState(false); // State to manage confirmation dialog
  const [donorToDelete, setDonorToDelete] = useState(null); // State to store the donor to delete

  useEffect(() => {
    if (error) {
      console.error("Error fetching donors:", error);
    }
  }, [error]);

  const handleOpenModal = (donor = null) => {
    setSelectedDonor(donor); // Set the selected donor for the modal
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDonor(null); // Clear the selected donor on modal close
  };

  const handleDelete = (donorId) => {
    setOpenConfirm(true);
    setDonorToDelete(donorId);
  };

  const confirmDelete = () => {
    deleteDonor(donorToDelete)
      .unwrap()
      .then((response) => {
        console.log("Donor deleted successfully");
        setOpenConfirm(false);
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting donor:", error);
        setOpenConfirm(false);
      });
  };

  const donorColumns = [
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
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      flex: 1,
    },
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
              onClick={() => handleDelete(params.row.donorId)}
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
        <Buttons label={"Register Donor"} onClick={() => handleOpenModal()} />
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
          getRowId={(row) => row.donorId}
          rows={data || []}
          columns={donorColumns}
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
        description="Are you sure you want to delete this donor? This action cannot be undone."
      />
    </Box>
  );
};

export default DonorRegistrationTab;
