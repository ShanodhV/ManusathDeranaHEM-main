import { Box,Button } from '@mui/material';
import React, { useState,useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import VolunteerDonorRegistrationModal from './VolunteerDonorRegistrationModal'
import Buttons from 'components/Buttons';
import DataGridCustomToolbar from 'components/DataGridCustomToolbar';
import { DataGrid } from '@mui/x-data-grid';
import { useGetDonorVolunteersQuery,useDeleteDonorVolunteerMutation } from 'state/api';

const VolunteerDonorRegistrationTab = () => {

  
    const theme = useTheme();
    const[openModal,setOpenModal]=useState(false);
    const { data, isLoading, refetch, error } = useGetDonorVolunteersQuery();
    const [deleteTreeEvent] = useDeleteDonorVolunteerMutation();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");


    useEffect(() => {
      if (error) {
        console.error("Error fetching events:", error);
      }
    }, [error]);


    const handleOpenModal=()=>{
        setOpenModal(true);
    }

    
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = (eventID) => {
    deleteTreeEvent(eventID)
      .unwrap()
      .then((response) => {
        console.log("Event deleted successfully");
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  const handleUpdateClick = (event) => {
    setSelectedEvent(event);
    setShowUpdateForm(true);
  };

const eventColumns = [
    {
      field: "donorID",
      headerName: "Donor ID",
      flex: 0.5,
      
    },
    {
      field: "donorName",
      headerName: "Donor Name",
      flex: 1,
    },
    {
      field: "donorAddress",
      headerName: "Donor Address ",
      flex: 1,
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      flex: 0.7,
    },
    {
      field: "studentID",
      headerName: "Student ID",
      flex: 1,
    },
    {
      field: "programID",
      headerName: "program ID",
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
    <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            {/* imports Buttuons component from Component folder */}
            <Buttons label={"Add Donor"} onClick={handleOpenModal} />

            {/* import StudentRegistrationModal component */}
            <VolunteerDonorRegistrationModal openModal={openModal} closeModal={handleCloseModal}/>
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
    </Box>
  )
}

export default VolunteerDonorRegistrationTab
