import React from 'react';
import { Box, Typography } from '@mui/material';

const CustomHeader = ({ title1, title2 }) => (
  <Box textAlign="center">
    <Typography variant="body2">{title1}</Typography>
    <Typography variant="body2">{title2}</Typography>
  </Box>
);

export default CustomHeader;
