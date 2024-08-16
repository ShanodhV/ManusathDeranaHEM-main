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
import { useGetStudentsByDeranaDaruwoProgramQuery, useDeleteStudentMutation } from "state/api";
import ConfirmationDialog from "components/ConfirmationDialog";
import { Delete, Edit } from "@mui/icons-material";
import CustomHeader from './CustomerHead';
import RegistrationModal from "./RegistrationModal";
import UpdateRegistationModal from "./UpdateRegistationModal";

// import PatientRegistrationModal from "./PatientRegistrationModal";
// import PatientUpdateModal from "./PatientUpdateModal";



const StudentList = ({ open, onClose, program}) => {
    const theme = useTheme();
    const { data: students, isLoading, refetch, error } = useGetStudentsByDeranaDaruwoProgramQuery(program?._id, { skip: !program });
    const [deleteStudent] = useDeleteStudentMutation();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [openStudentModal, setOpenStudentModal] = useState(false);
    const [openStudentUpdateModal, setOpenStudentUpdateModal] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);

    useEffect(() => {
        if (error) {
          console.error("Error fetching student:", error);
          setSnackbar({ open: true, message: "Error fetching student", severity: "error" });
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
            setSnackbar({ open: true, message: "Student deleted successfully", severity: "success" });
            refetch();
          })
          .catch((error) => {
            console.error("Error deleting Student:", error);
            setSnackbar({ open: true, message: "Error deleting Student", severity: "error" });
          });
        setOpenConfirm(false);
      };
    
      const handleOpenStudentModal = () => {
        setCurrentStudent(null);
        setOpenStudentModal(true);
      };
    
      const handleCloseStudentModal = () => {
        setOpenStudentModal(false);
        refetch(); // Refresh the list after adding a new patient
      };
    
      const handleOpenStudentUpdateModal = (patient) => {
        setCurrentStudent(patient);
        setOpenStudentUpdateModal(true);
      };
    
      const handleCloseStudentUpdateModal = () => {
        setOpenStudentUpdateModal(false);
        refetch(); // Refresh the list after updating a patient
      };

      const studentColumns = [
        {
            field: "studentID",
            headerName: "Student ID",
            flex: 0.8,
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
         
          // {
          //   field: "programID",
          //   headerName: "Program ID",
          //   flex: 0.4,
          //   renderHeader: () => <CustomHeader title1="Program" title2="ID" />,
          // },
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
                endIcon={<Edit />}
                onClick={() => handleOpenStudentUpdateModal(params.row)}
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
        <div>Student of {program?.programId}</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={handleOpenStudentModal}
            color="secondary"
            variant="contained"
            style={{ marginRight: "8px" }} // Add some margin between button and icon
          >
            Register Student
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
              loading={isLoading}
              getRowId={(row) => row._id}
              rows={students || []}
              columns={studentColumns}
              pageSize={20}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#f0f0f0" }}>
          <Button
            onClick={handleOpenStudentModal}
            color="secondary"
            variant="contained"
          >
            Register Student
          </Button>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <RegistrationModal
        openModal={openStudentModal} 
        closeModal={handleCloseStudentModal}
        programId={program?._id}
      />

      <UpdateRegistationModal
        openModal={openStudentUpdateModal}
        closeModal={handleCloseStudentUpdateModal}
        currentStudent={currentStudent}
        programId={program?._id}
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
  )
}

export default StudentList