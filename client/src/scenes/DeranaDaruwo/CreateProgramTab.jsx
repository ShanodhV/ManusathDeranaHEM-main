import { Box } from '@mui/material';
import React, { useState } from 'react'
import Buttons from "components/Buttons";
import CreateProgramModal from './CreateProgramModal';

export default function CreateProgramTab() {

    const[openModal,setOpenModal]=useState(false);


    const handleOpenModal=()=>{
        setOpenModal(true);
    }

    
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
   <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Buttons label={"Create Program"} onClick={handleOpenModal} />
            {/* Render the DonerRegistrationModal component and pass necessary props */}
            <CreateProgramModal openModal={openModal} handleCloseModal={handleCloseModal} />
        </Box>
   </Box>
  );
};



