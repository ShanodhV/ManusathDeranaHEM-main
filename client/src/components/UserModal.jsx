import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Snackbar, Alert } from '@mui/material';

const UserModal = ({ open, onClose, fetchUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const result = await response.json();
      if (response.ok) {
        setSnackbar({ open: true, message: 'User created successfully', severity: 'success' });
        fetchUsers();
        onClose();
      } else {
        setSnackbar({ open: true, message: result.message, severity: 'error' });
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setSnackbar({ open: true, message: 'Error creating user', severity: 'error' });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <TextField margin="normal" label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          <TextField margin="normal" label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField margin="normal" label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Create</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserModal;
