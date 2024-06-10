import React, { useState } from 'react'
import { Modal, Box } from '@mui/material'
import CustomTextField from 'components/CustomTextField'
import { useAddStudentMutation } from "state/api"; // Adjust the import according to your file structure
import Buttons from 'components/Buttons';


const StudentRegistrationModal = ({openModal,closeModal}) => {
  const [studentID,setStudentID]=useState("");
  const [studentName,setStudentName]=useState("");
  const [studentAdress,setStudentAdress]=useState("");
  const [programID,setprogramID]=useState("");
  const [parentName,setParentName]=useState("");
  const [parentContactDetails,setParentContactDetails]=useState("");
  const[branchName,setBranchName]=useState("");
  const [AccountNumber,setAccountNumber]=useState("");
  const [addStudent]=useAddStudentMutation();

  const handleAddStudent=()=>{
    const studentData={
        studentID,
        studentName,
        studentAdress,
        programID,
        parentName,
        parentContactDetails,
        branchName,
        AccountNumber,

    }

    addStudent(studentData).then((response)=>{
        console.log("Donor added succesfully: ",response)

        setStudentID("");
        setStudentName("");
        setStudentAdress("");
        setprogramID("");
        setParentName("");
        setParentContactDetails("");
        setBranchName("");
        setAccountNumber("");

    })
    .catch((error)=>{
        console.error("Error adding donor:", error);
    });
  }

  const labelStyle = {
    fontWeight: "bold",
    color: "black",
    fontSize: "16px",
    marginTop: "16px",
  };

  return (
   
    <Box>
      
      <Modal
     open={openModal}
     onClose={closeModal}
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description"
      >
        <Box sx={
                {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width:700,
                    height:600,
                    bgcolor:"#fff",
                    borderRadius:"20px",
                    boxShadow:24,
                    p:4,
                    overflowY: "auto",
                }
            }>
            <h2 id="modal-modal-title">Register Studenet</h2>
            <Box sx={{mt:6}}>
                <CustomTextField 
                 label={"Student ID"}
                 variant={"outlined"}
                 fullWidth
                 value={studentID}
                 onChange={(e)=>setStudentID(e.target.value)}
                />
            </Box>
            <Box sx={{mt:6}}>
                <CustomTextField 
                 label={"Student Name"}
                 variant={"outlined"}
                 fullWidth
                 value={studentName}
                 onChange={(e)=>setStudentName(e.target.value)}
                />
            </Box>
            <Box sx={{mt:6}}>
                <CustomTextField 
                 label={"Student Address"}
                 variant={"outlined"}
                 fullWidth
                 value={studentAdress}
                 onChange={(e)=>setStudentAdress(e.target.value)}
                />
            </Box>
            <Box sx={{mt:6}}>
                <CustomTextField
                 label={"Select program ID"}
                 variant={"outlined"}
                 fullWidth
                 value={programID}
                 onChange={(e)=>setprogramID(e.target.value)}
                />
            </Box>
            <br /><br />
            <h4>Parent Details</h4>
            <Box sx={{mt:4}}>
                <CustomTextField
                 label={"Parent Name"}
                 variant={"outlined"}
                 fullWidth
                 value={parentName}
                 onChange={(e)=>setParentName(e.target.value)}
                />
            </Box>
            <Box sx={{mt:6}}>
                <CustomTextField
                 label={"parent Contact details"}
                 variant={"outlined"}
                 fullWidth
                 value={parentContactDetails}
                 onChange={(e)=>setParentContactDetails(e.target.value)}
                />
            </Box>
            <h4>Bank Account Details</h4>
            <Box sx={{mt:4}}>
                <CustomTextField
                 label={"Branch"}
                 variant={"outlined"}
                 fullWidth
                 value={branchName}
                 onChange={(e)=>setBranchName(e.target.value)}
                />
            </Box>
            <Box sx={{mt:6}}>
                <CustomTextField
                 label={"AccountNumber"}
                 variant={"outlined"}
                 fullWidth
                 value={AccountNumber}
                 onChange={(e)=>setAccountNumber(e.target.value)}
                />
            </Box>
            <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
                <Buttons label="Register Student" onCLick={handleAddStudent}></Buttons>
            </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default StudentRegistrationModal
