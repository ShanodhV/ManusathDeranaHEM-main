import React,{useState} from 'react'
import VolunteerDonorRegistrationModal from './VolunteerDonorRegistrationModal'
import { Box } from '@mui/material';
import Buttons from 'components/Buttons';

const VolunteerDonorRegistrationTab = () => {
  const[openModal,setOpenModal]=useState(false);


    const handleOpenModal=()=>{
        setOpenModal(true);
    }

    
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <div>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            {/* imports Buttuons component from Component folder */}
            <Buttons label={"Add Donor"} onClick={handleOpenModal} />

            {/* import StudentRegistrationModal component */}
            <VolunteerDonorRegistrationModal openModal={openModal} closeModal={handleCloseModal}/>
        </Box>
      
    </div>
  )
}

export default VolunteerDonorRegistrationTab
