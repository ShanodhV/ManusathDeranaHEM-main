import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from '@mui/material';
import { useGetDonorVolunteerQuery } from 'state/api';

const AssignDonor = ({ open, onClose, studentId }) => {
  const { data: donors, isLoading, error } = useGetDonorVolunteerQuery();
  const [selectedDonorId, setSelectedDonorId] = useState('');
  const [donorDetails, setDonorDetails] = useState({
    donorName: '',
    donorAddress: '',
    contactNumber: '',
    emailAddress: ''
  });

  // Debug: Log the donors data
  useEffect(() => {
    console.log("Donors data:", donors);
    if (selectedDonorId && donors) {
      const donor = donors.find(d => d._id === selectedDonorId);
      if (donor) {
        setDonorDetails({
            donorName: donor.donorName,
            donorAddress: donor.donorAddress,
            contactNumber: donor.contactNumber,
            emailAddress: donor.emailAddress,
        });
      }
    }
  }, [selectedDonorId, donors]);

  const handleAssign = () => {
    // Handle assignment logic here
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Assign Donor to Student {studentId}</DialogTitle>
      <DialogContent>
        {/* {error && <p>Error loading donors: {error.message}</p>} */}
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            select
            label="Select Donor"
            value={selectedDonorId}
            onChange={(e) => setSelectedDonorId(e.target.value)}
            fullWidth
            disabled={isLoading}
          >
            {donors?.map((donor) => (
              <MenuItem key={donor._id} value={donor._id}>
                {donor.donorID}
              </MenuItem>
            ))}
          </TextField>
          <TextField label="Donor Name" value={donorDetails.donorName} fullWidth disabled />
          <TextField label="Donor Address" value={donorDetails.donorAddress} fullWidth disabled />
          <TextField label="Donor Contact" value={donorDetails.contactNumber} fullWidth disabled />
          <TextField label="Donor Email" value={donorDetails.emailAddress} fullWidth disabled />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAssign} color="primary">Assign</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignDonor;
