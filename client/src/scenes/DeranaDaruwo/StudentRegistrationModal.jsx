import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box } from '@mui/material';
import CustomTextField from 'components/CustomTextField';
import { useAddStudentMutation } from 'state/api'; // Adjust the import according to your file structure
import Buttons from 'components/Buttons';

const StudentRegistrationModal = ({ openModal, closeModal }) => {
  const [studentID, setStudentID] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentAddress, setStudentAddress] = useState("");
  const [programID, setProgramID] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentContactDetails, setParentContactDetails] = useState("");
  const [bankAccountDetails, setBankAccountDetails] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [addStudent] = useAddStudentMutation();

  const handleAddStudent = () => {
    const studentData = {
      studentID,
      studentName,
      studentAddress,
      programID,
      parentName,
      parentContactDetails,
      bankAccountDetails,
      accountNumber,
    };

    addStudent(studentData)
      .then((response) => {
        console.log("Student added successfully: ", response);

        setStudentID("");
        setStudentName("");
        setStudentAddress("");
        setProgramID("");
        setParentName("");
        setParentContactDetails("");
        setBankAccountDetails("");
        setAccountNumber("");
        closeModal();
      })
      .catch((error) => {
        console.error("Error adding student:", error);
      });
  };

  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 600,
          bgcolor: '#fff',
          borderRadius: '20px',
          boxShadow: 24,
          p: 4,
          overflowY: 'auto',
        }}
      >
        <h2 id="modal-modal-title">Register Student</h2>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Student ID"
            variant="outlined"
            fullWidth
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Student Name"
            variant="outlined"
            fullWidth
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Student Address"
            variant="outlined"
            fullWidth
            value={studentAddress}
            onChange={(e) => setStudentAddress(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Select Program ID"
            variant="outlined"
            fullWidth
            value={programID}
            onChange={(e) => setProgramID(e.target.value)}
          />
        </Box>
        <br /><br />
        <h4>Parent Details</h4>
        <Box sx={{ mt: 4 }}>
          <CustomTextField
            label="Parent Name"
            variant="outlined"
            fullWidth
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Parent Contact Details"
            variant="outlined"
            fullWidth
            value={parentContactDetails}
            onChange={(e) => setParentContactDetails(e.target.value)}
          />
        </Box>
        <h4>Bank Account Details</h4>
        <Box sx={{ mt: 4 }}>
          <CustomTextField
            label="Bank Account Details"
            variant="outlined"
            fullWidth
            value={bankAccountDetails}
            onChange={(e) => setBankAccountDetails(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Account Number"
            variant="outlined"
            fullWidth
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <Buttons label="Register Student" onClick={handleAddStudent} />
        </Box>
      </Box>
    </Modal>
  );
};

StudentRegistrationModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default StudentRegistrationModal;
