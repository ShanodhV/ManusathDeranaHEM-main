// components/GraphModal.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import Graphs from './Graphs';

const GraphModal = ({ open, onClose, districtData, townData, isLoadingDistrict, isLoadingTown, errorDistrict, errorTown }) => {
  const theme = useTheme();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      aria-labelledby="graph-modal-title"
    >
      <DialogTitle sx={{ bgcolor: "#f0f0f0" }} id="graph-modal-title">
        <div style={{ color: "#d63333", fontWeight: "700", fontSize: "16px" }}>
          Health Camp Graphs
          <hr style={{ borderColor: "#d63333" }} />
        </div>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8, color: theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Graphs
            districtData={districtData}
            townData={townData}
            isLoadingDistrict={isLoadingDistrict}
            isLoadingTown={isLoadingTown}
            errorDistrict={errorDistrict}
            errorTown={errorTown}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default GraphModal;
