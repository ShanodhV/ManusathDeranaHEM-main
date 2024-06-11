import { Box,Modal } from '@mui/material'
import React, { useState } from 'react';
import CustomTextField from 'components/CustomTextField';
import Buttons from 'components/Buttons';
import { useAddDonorMutation } from 'state/api';


const VolunteerDonorRegistrationModal = ({ openModal, handleCloseModal }) => {

    const[donorID,setDonorID]=useState("");
    const[donorName,setDonorName]=useState("");
    const[donorAddress,setDonorAddress]=useState("");
    const[contactNumber,setContactNumber]=useState("");
    const[studentID,setStudentID]=useState("");
    const[programID,setProgramID]=useState("");

    const [addDonor] =   useAddDonorMutation();

  const handleAddDonor = () => {
    const donorData = {
      donorID,
      donorName,
      donorAddress,
      contactNumber,
      studentID,
      programID,
    };

    addDonor(donorData)
      .then((response) => {
        console.log("School added successfully:", response);
        // Clear form fields
        setDonorID("");
        setDonorName("");
        setDonorAddress("");
        setContactNumber("");
        setStudentID("");
        setProgramID("");
       
      })
      .catch((error) => {
        console.error("Error adding school:", error);
      });
  };
  const labelStyle = {
    fontWeight: "bold",
    color: "black",
    fontSize: "16px",
    marginTop: "16px",
  };

    
  return (
    <div>
      <Box>
        <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 700,
                height: 600,
                bgcolor: "#fff",
                borderRadius: "20px",
                boxShadow: 24,
                p: 4,
                overflowY: "auto",
                }}>
                    <h2 id="modal-modal-title">Add volunteer Donor Modal</h2>
                    <Box sx={{ mt: 6 }}>
                        <CustomTextField
                            label="Donor ID"
                            variant="outlined"
                            fullWidth
                            value={donorID}
                            onChange={(e) => setDonorID(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ mt: 6 }}>
                        <CustomTextField
                            label="Donor Name"
                            variant="outlined"
                            fullWidth
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ mt: 6 }}>
                        <CustomTextField
                            label="Donor Address"
                            variant="outlined"
                            fullWidth
                            value={donorAddress}
                            onChange={(e) => setDonorAddress(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ mt: 6 }}>
                        <CustomTextField
                            label="Contact Number"
                            variant="outlined"
                            fullWidth
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                        />
                    </Box>

                    <h3>Assign Student ID</h3>
                    <Box sx={{ mt: 6 }}>
                        <CustomTextField
                            label=""
                            variant="outlined"
                            fullWidth
                            value={studentID}
                            onChange={(e) => setStudentID(e.target.value)}
                        />
                    </Box>

                    <h3>programID ID</h3>
                    <Box sx={{ mt: 6 }}>
                        <CustomTextField
                            label=""
                            variant="outlined"
                            fullWidth
                            value={programID}
                            onChange={(e) => setProgramID(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
                        <Buttons label="Add Donor" onCLick={handleAddDonor}></Buttons>
                    </Box>


                </Box>

        </Modal>
      </Box>
    </div>
  )
}

export default VolunteerDonorRegistrationModal
