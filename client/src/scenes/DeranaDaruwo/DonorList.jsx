import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import {
  // useGetStudentsByDeranaDaruwoProgramQuery,
  useDeleteDonorVolunteerMutation,
  useGetDonorVolunteersQuery
} from "state/api";
import CustomHeader from "./CustomerHead";
// import UpdateRegistationModal from "./UpdateRegistationModal";
import DonorRegistrationModal from "./DonorRegistrationModal"; // Import the DonorRegistrationModal
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import ConfirmationDialog from "components/ConfirmationDialog";
import { Delete, Edit } from "@mui/icons-material";
import Buttons from "components/Buttons";


const DonorList = ({ open, onClose }) => {
  const theme = useTheme();
  
  const [deleteDonor] = useDeleteDonorVolunteerMutation();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const { data, isLoading, refetch, error } = useGetDonorVolunteersQuery();

  // const [openStudentModal, setOpenStudentModal] = useState(false);
  // const [openStudentUpdateModal, setOpenStudentUpdateModal] = useState(false);
  // const [currentStudent, setCurrentStudent] = useState(null);
  const [openDonorRegistrationModal, setOpenDonorRegistrationModal] = useState(false); // State for Donor Registration Modal
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (error) {
      console.error("Error fetching donor:", error);
      setSnackbar({
        open: true,
        message: "Error fetching donor",
        severity: "error",
      });
    }
  }, [error]);

  const handleDelete = (donorID) => {
    setOpenConfirm(true);
    setSelectedDonor(donorID);
  };

  const confirmDelete = () => {
    deleteDonor(selectedDonor)
      .unwrap()
      .then(() => {
        setSnackbar({
          open: true,
          message: "Donor deleted successfully",
          severity: "success",
        });
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting Donor:", error);
        setSnackbar({
          open: true,
          message: "Error deleting Donor",
          severity: "error",
        });
      });
    setOpenConfirm(false);
  };

  // const handleOpenStudentModal = () => {
  //   setCurrentStudent(null);
  //   setOpenStudentModal(true);
  // };

  // const handleCloseStudentModal = () => {
  //   setOpenStudentModal(false);
  //   refetch(); // Refresh the list after adding a new patient
  // };

  // const handleOpenStudentUpdateModal = (patient) => {
  //   setCurrentStudent(patient);
  //   setOpenStudentUpdateModal(true);
  // };

  // const handleCloseStudentUpdateModal = () => {
  //   setOpenStudentUpdateModal(false);
  //   refetch(); // Refresh the list after updating a patient
  // };

  // Functions to handle the Donor Registration Modal
  const handleOpenDonorRegistrationModal = () => {
    setOpenDonorRegistrationModal(true);
  };

  const handleCloseDonorRegistrationModal = () => {
    setOpenDonorRegistrationModal(false);
    refetch(); // Refresh the list if needed after adding a new donor
  };

  const donorColumns = [
    {
      field: "donorID",
      headerName: "donor ID",
      flex: 0.4,
    },
    {
      field: "donorName",
      headerName: "donor Name",
      flex: 1,
    },
    {
      field: "donorAddress",
      headerName: "donor Address",
      flex: 1,
    },

    {
      field: "countryCode",
      headerName: "country Code",
      flex: 1,
    },
    {
      field: "contactNumber",
      headerName: "contact Number",
      flex: 0.8,
    },
    {
      field: "emailAddress",
      headerName: "email Address",
      flex: 0.6,
     
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
            color="info"
            endIcon={<Edit />}
            // onClick={() => handleOpenStudentUpdateModal(params.row)}
          >
            Update
          </Button>
          <div style={{ padding: "2px" }}></div>
          <Button
            variant="contained"
            color="error"
            endIcon={<Delete />}
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Dialog fullScreen open={open} onClose={onClose}>
        <DialogTitle sx={{ bgcolor: "#f0f0f0" }} id="form-dialog-title">
          <div
            style={{
              color: "#d63333",
              fontWeight: "700",
              fontSize: "16px",
              display: "flex",
              justifyContent: "space-between", // Align children with space between
              alignItems: "center", // Align items vertically
            }}
          >
            <div>Donor of</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={handleOpenDonorRegistrationModal} // Open Donor Registration Modal on click
                color="secondary"
                variant="contained"
                style={{ marginRight: "8px" }} // Add some margin between button and icon
              >
                Register Donor
              </Button>
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  color: theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <hr style={{ borderColor: "#d63333", marginTop: "8px" }} />
        </DialogTitle>
        <DialogContent sx={{ marginTop: "10px" }}>
          <Box height="75vh">
          <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
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
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#f0f0f0" }}>
          <Button
            onClick={handleOpenDonorRegistrationModal} // Open Donor Registration Modal on click
            color="secondary"
            variant="contained"
          >
            Register Donor
          </Button>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

     

      {/* <UpdateRegistationModal
        openModal={openStudentUpdateModal}
        closeModal={handleCloseStudentUpdateModal}
        currentStudent={currentStudent}
        programId={program?._id}
      /> */}

      <DonorRegistrationModal
        openModal={openDonorRegistrationModal} // Pass state to open the modal
        closeModal={handleCloseDonorRegistrationModal} // Pass function to close the modal
      />

      <ConfirmationDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this donor? This action cannot be undone."
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DonorList;
