import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
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
  useGetStudentsByDeranaDaruwoProgramQuery,
  useDeleteStudentMutation,
} from "state/api";
import ConfirmationDialog from "components/ConfirmationDialog";
import { Visibility, Edit } from "@mui/icons-material";
import CustomHeader from "./CustomerHead";
// import CustomHeader from "./CustomHead";
import RegistrationModal from "./RegistrationModal";
// import UpdateRegistrationModal from "./UpdateRegistrationModal";
import AssignDonor from "./AssignDonor"; // Import AssignDonor component

const AssignStudentsToDonors = ({ open, onClose, program }) => {
  const theme = useTheme();
  const { data: students, isLoading, refetch, error } = useGetStudentsByDeranaDaruwoProgramQuery(program?._id, {
    skip: !program,
  });
  const [deleteStudent] = useDeleteStudentMutation();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [openStudentUpdateModal, setOpenStudentUpdateModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [openAssignDonor, setOpenAssignDonor] = useState(false); // State for AssignDonor dialog

  useEffect(() => {
    if (error) {
      console.error("Error fetching students:", error);
      setSnackbar({
        open: true,
        message: "Error fetching students",
        severity: "error",
      });
    }
  }, [error]);

  const handleDelete = (StudentID) => {
    setOpenConfirm(true);
    setSelectedStudent(StudentID);
  };

  const confirmDelete = () => {
    deleteStudent(selectedStudent)
      .unwrap()
      .then(() => {
        setSnackbar({
          open: true,
          message: "Student deleted successfully",
          severity: "success",
        });
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
        setSnackbar({
          open: true,
          message: "Error deleting student",
          severity: "error",
        });
      });
    setOpenConfirm(false);
  };

  const handleOpenStudentModal = () => {
    setCurrentStudent(null);
    setOpenStudentModal(true);
  };

  const handleCloseStudentModal = () => {
    setOpenStudentModal(false);
    refetch(); // Refresh the list after adding a new student
  };

  const handleOpenStudentUpdateModal = (student) => {
    setCurrentStudent(student);
    setOpenStudentUpdateModal(true);
  };

  const handleCloseStudentUpdateModal = () => {
    setOpenStudentUpdateModal(false);
    refetch(); // Refresh the list after updating a student
  };

  const handleAssignDonor = (student) => {
    setCurrentStudent(student);
    setOpenAssignDonor(true);
  };

  const handleCloseAssignDonor = () => {
    setOpenAssignDonor(false);
    refetch(); // Refresh the list after assigning a donor
  };

  const studentColumns = [
    {
      field: "studentID",
      headerName: "Student ID",
      flex: 0.4,
      renderHeader: () => <CustomHeader title1="Student" title2="ID" />,
    },
    {
      field: "studentName",
      headerName: "Student Name",
      flex: 1,
    },
    {
      field: "studentAddress",
      headerName: "Student Address",
      flex: 1,
    },
    {
      field: "parentName",
      headerName: "Parent Name",
      flex: 0.8,
    },
    {
      field: "parentContactDetails",
      headerName: "Parent Contact",
      flex: 0.6,
      renderHeader: () => <CustomHeader title1="Parent" title2="Contact" />,
    },
    {
      field: "bankAccountDetails",
      headerName: "Bank Branch",
      flex: 0.6,
      renderHeader: () => <CustomHeader title1="Bank" title2="Branch" />,
    },
    {
      field: "accountNumber",
      headerName: "Account Number",
      flex: 0.7,
      renderHeader: () => <CustomHeader title1="Account" title2="Number" />,
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
            endIcon={<Visibility />}
            onClick={() => handleOpenStudentUpdateModal(params.row)}
          >
            View
          </Button>
          <div style={{ padding: "2px" }}></div>
          <Button
            variant="contained"
            color="error"
            endIcon={<Edit />}
            onClick={() => handleAssignDonor(params.row)}
          >
            Assign
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
            <div>Student of {program?.programId}</div>
            <div style={{ display: "flex", alignItems: "center" }}>
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
              loading={isLoading}
              getRowId={(row) => row._id}
              rows={students || []}
              columns={studentColumns}
              pageSize={20}
            />
          </Box>
        </DialogContent>
      </Dialog>

      <RegistrationModal
        openModal={openStudentModal}
        closeModal={handleCloseStudentModal}
        programId={program?._id}
      />

      {/* <UpdateRegistrationModal
        openModal={openStudentUpdateModal}
        closeModal={handleCloseStudentUpdateModal}
        currentStudent={currentStudent}
        programId={program?._id}
      /> */}

      <AssignDonor
        open={openAssignDonor} // Pass open state
        onClose={handleCloseAssignDonor} // Pass close function
        student={currentStudent} // Pass current student data
      />

      <ConfirmationDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this student? This action cannot be undone."
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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

export default AssignStudentsToDonors;
