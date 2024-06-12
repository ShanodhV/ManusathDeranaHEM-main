import React, { useState } from 'react';
import { Modal, Box, Grid } from '@mui/material';
import Buttons from "components/Buttons";
import CustomTextField from 'components/CustomTextField';
import { useAddDeranaDaruwoProgramMutation } from "state/api";
        
        

        export default function CreateProgramModal({openModal, handleCloseModal}) {

            const [programId,setProgramId]=useState("");
            const [programName,setProgramName]=useState("");
            const [province, setProvince] = useState("");
            const [district, setDistrict] = useState("");
            const [town, setTown] = useState("");
            const [name,setName]=useState("");
            const [mobileNumber,setMobileNumber]=useState("");

            const[addProgram]=useAddDeranaDaruwoProgramMutation();

            const handleAddProgram=()=>{
            
                    const programData={
                        programId,
                        programName,
                        location:{
                            province,
                            district,
                            town,
                        },
                        areaOfficerDetails:{
                            mobileNumber,
                            name,
                        }
                      
                    };

                    addProgram(programData).then((Response)=>{
                        console.log("program added successfully",Response);

                        // clear from fields 
                        setProgramId("");
                        setProgramName("");
                        setProvince("");
                        setDistrict("");
                        setTown("");
                        setName("");
                        setMobileNumber("");
                    })

                }
            
        return (
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
                    <h2 id="modal-modal-title">Create Program</h2>
                    <Box sx={{ mt: 6 }}>
                        <CustomTextField
                            label="Program ID"
                            variant="outlined"
                            fullWidth
                            value={programId}
                            onChange={(e) => setProgramId(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ mt: 4 }}>
                        <label style={{ fontWeight: "bold", color: "black", fontSize: "16px", marginTop: "16px" }} htmlFor="Add Location name">
                            Add Location Name
                        </label>
                        <Grid container spacing={2} sx={{ mt: 0 }}>
                        <Grid item xs={4}>
                            <CustomTextField
                            select
                            label="Province"
                            variant="outlined"
                            fullWidth
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            >
                            {/* Province options */}
                            </CustomTextField>
                        </Grid>
                        <Grid item xs={4}>
                            <CustomTextField
                            select
                            label="District"
                            variant="outlined"
                            fullWidth
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            >
                            {/* District options */}
                            </CustomTextField>
                        </Grid>
                        <Grid item xs={4}>
                            <CustomTextField
                            select
                            label="Town"
                            variant="outlined"
                            fullWidth
                            value={town}
                            onChange={(e) => setTown(e.target.value)}
                            >
                            {/* Town options */}
                            </CustomTextField>
                        </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ mt: 4 }}>
                        <label style={{ fontWeight: "bold", color: "black", fontSize: "16px", marginTop: "16px" }} htmlFor="Principal Info">
                        Principal's Information
                        </label>
                    </Box>  
                    <Box sx={{ mt: 3 }}>
                        <CustomTextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ mt: 3 }}>
                    <CustomTextField
                        label="Mobile Number"
                        variant="outlined"
                        fullWidth
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                    </Box>
                    <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
                        <Buttons onClick={handleAddProgram} label="Create Program" />
                    </Box>
                </Box>
            </Modal>
        </Box>

        )
    }




