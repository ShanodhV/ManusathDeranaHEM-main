import React from "react";
import TextField from "@mui/material/TextField";

const CustomTextField = ({ label, variant, fullWidth, select, children }) => {
  return (
    <TextField
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      select={select}
      sx={{
        '& .Mui-focused': {
          color: '#000', // Change the text color when focused
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000', // Change the border color when focused
          },
        },
      }}
    >
      {children}
    </TextField>
  );
};

export default CustomTextField;
