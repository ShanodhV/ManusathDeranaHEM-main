import React, { useState, useEffect } from 'react';
import { Box, Button, Snackbar, Alert, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import UserModal from 'components/UserModal';

const UsersPage = () => {
  const theme = useTheme();
  const auth = useSelector((state) => state.global.auth);
  const isAdmin = auth?.user?.role === 'admin'; // Ensure auth and user are defined

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setSnackbar({ open: true, message: 'Error fetching users', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:5001/users/${userId}`, { method: 'DELETE' });
      setSnackbar({ open: true, message: 'User deleted successfully', severity: 'success' });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setSnackbar({ open: true, message: 'Error deleting user', severity: 'error' });
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="secondary" onClick={() => handleDeleteUser(params.row.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4">Users</Typography>
      {isAdmin && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
            Add User
          </Button>
        </Box>
      )}
      <Box
        mt="40px"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': { border: 'none' },
          '& .MuiDataGrid-cell': { borderBottom: 'none', color: theme.palette.secondary[100] },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': { backgroundColor: theme.palette.primary.light },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': { color: `${theme.palette.secondary[200]} !important` },
        }}
      >
        <DataGrid loading={loading} rows={users} columns={columns} pageSize={10} />
      </Box>
      <UserModal open={openModal} onClose={() => setOpenModal(false)} fetchUsers={fetchUsers} />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UsersPage;
