import React, { useState } from 'react';
import { Box } from '@mui/material';
import Buttons from 'components/Buttons';
import StudentRegistrationModal from './StudentRegistrationModal';

const StudentRegistrationTab = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Buttons label="Register Student" onClick={handleOpenModal} />
      </Box>
      <StudentRegistrationModal openModal={openModal} closeModal={handleCloseModal} />
    </div>
  );
};

export default StudentRegistrationTab;
