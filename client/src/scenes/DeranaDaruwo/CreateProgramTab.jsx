import { Box, Button, Snackbar, Alert } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Buttons from "components/Buttons";
import DataGridCustomToolbar from 'components/DataGridCustomToolbar';
import { DataGrid } from '@mui/x-data-grid';
import { useGetDeranaDaruwoProgramsQuery, useDeleteDeranaDaruwoProgramMutation } from 'state/api';
import UpdateProgramModel from './UpdateProgramModel';
import ProgramModal from './ProgramModal';
import { Delete, Edit } from "@mui/icons-material";
import ConfirmationDialog from "components/ConfirmationDialog";




export default function CreateProgramTab() {
  const theme = useTheme();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const { data, isLoading, refetch, error } = useGetDeranaDaruwoProgramsQuery();
  const [deleteTreeEvent] = useDeleteDeranaDaruwoProgramMutation();
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

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleDelete = (programID) => {
    setOpenConfirm(true);
    setSelectedProgram(programID);
  };

  const handleUpdateClick = (program) => {
    setSelectedProgram(program);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedProgram(null);
    refetch();
  };

  const confirmDelete = () => {
    deleteTreeEvent(selectedProgram)
      .unwrap()
      .then((response) => {
        console.log("Derana Daruwo Program deleted successfully");
        setSnackbar({ open: true, message: "Derana Daruwo Program deleted successfully", severity: "success" });
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting derana daruwo program:", error);
        setSnackbar({ open: true, message: "Error deleting derana daruwo program", severity: "error" });
      });
    setOpenConfirm(false);
  };


  const eventColumns = [
    {
      field: "programId",
      headerName: "Program ID",
      flex: 1,
    },
    {
      field: "programName",
      headerName: "Program Name",
      flex: 1,
    },

    {
      field: "Date",
      headerName: "Date",
      flex: 0.5,
    },

    {
      field: "province",
      headerName: "Province",
      flex: 0.5,
    },
    {
      field: "district",
      headerName: "District",
      flex: 0.5,
    },
    {
      field: "town",
      headerName: "Town",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "mobileNumber",
      headerName: "Mobile Number",
      flex: 0.8,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.6,
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
            // sx={{
            //   "& button": {
            //     backgroundColor: theme.palette.primary[700],
            //     color: "white",
            //   },
            // }}
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
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Buttons label={"Create Program"} onClick={handleOpenCreateModal} />
        {/* Render the CreateProgramModal component and pass necessary props */}
        {/* <CreateProgramModal openModal={openCreateModal} closeModal={handleCloseCreateModal} /> */}
        <ProgramModal
         openModal={openCreateModal} closeModal={handleCloseCreateModal} refetch={refetch}
        />
      </Box>
      {openUpdateModal && (
        <UpdateProgramModel
          openModal={openUpdateModal}
          closeModal={handleCloseUpdateModal}
          newProgamDetails={selectedProgram}
          refetch={refetch}
        />
      )}
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
      <ConfirmationDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this derana daruwo program? This action cannot be undone."
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
}
