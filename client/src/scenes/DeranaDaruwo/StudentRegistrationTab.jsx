import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Snackbar, Alert  } from '@mui/material';
import Buttons from 'components/Buttons';
import DataGridCustomToolbar from 'components/DataGridCustomToolbar';
import { DataGrid } from '@mui/x-data-grid';
import { useGetStudentsQuery, useDeleteStudentMutation } from 'state/api';
import UpdateRegistationModal from './UpdateRegistationModal';
import CustomHeader from './CustomerHead';
import RegistrationModal from './RegistrationModal';
import { Delete, Edit } from "@mui/icons-material";
import ConfirmationDialog from "components/ConfirmationDialog";


const StudentRegistrationTab = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, refetch, error } = useGetStudentsQuery();
  const [deleteStuddent] = useDeleteStudentMutation();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });


  useEffect(() => {
    if (error) {
      console.error("Error fetching events:", error);
    }
  }, [error]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = (studentID) => {
    setOpenConfirm(true);
    setSelectedStudent(studentID);
  };


  const handleUpdateClick = (student) => {
    setSelectedStudent(student);
    setShowUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
    setSelectedStudent(null);
    refetch();
  };

  const confirmDelete = () => {
    deleteStuddent(selectedStudent)
      .unwrap()
      .then((response) => {
        console.log("Studewnt deleted successfully");
        setSnackbar({ open: true, message: "Student deleted successfully", severity: "success" });
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
        setSnackbar({ open: true, message: "Error deleting student", severity: "error" });
      });
    setOpenConfirm(false);
  };

  const eventColumns = [
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
      field: "programID",
      headerName: "Program ID",
      flex: 0.4,
      renderHeader: () => <CustomHeader title1="Program" title2="ID" />,
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
      flex: 1.4,
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
              endIcon={<Delete/>}
              onClick={() => handleDelete(params.row._id)}
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
              endIcon={<Edit/>}
              onClick={() => handleUpdateClick(params.row)}
            >
              Update
            </Button>
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Buttons label="Register Student" onClick={handleOpenModal} />
        {/* <StudentRegistrationModal openModal={openModal} closeModal={handleCloseModal} newStudentData={selectedStudent} refetch={refetch}/> */}
        <RegistrationModal openModal={openModal} closeModal={handleCloseModal}/>
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

      {showUpdateForm && (
        <UpdateRegistationModal
          openModal={showUpdateForm}
          closeModal={handleCloseUpdateForm}
          newStudentData={selectedStudent}
          refetch={refetch}
        />
      )}

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
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentRegistrationTab;
