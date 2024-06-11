import React, { useState } from 'react';
import { Box } from '@mui/material';
import Buttons from 'components/Buttons';
import StudentRegistrationModal from './StudentRegistrationModal';

const StudentRegistrationTab = () => {

    const [openModal,setOpenModal]=useState(false);

    const handleOpenModal=()=>{
        setOpenModal(true);
    }

    const handleCloseModal=()=>{
        setOpenModal(false);
    }
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        {/* imports Buttuons component from Component folder */}
        <Buttons label={"Register Student"} onClick={handleOpenModal} />

        {/* import StudentRegistrationModal component */}
        <StudentRegistrationModal openModal={openModal} closeModal={handleCloseModal}/>
      </Box>
    </div>
  );
};

export default StudentRegistrationTab
