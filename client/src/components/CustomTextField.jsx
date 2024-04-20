import React from "react";
import TextField from "@mui/material/TextField";

const CustomTextField = ({
  label,
  variant,
  fullWidth,
  value,
  select,
  Function,
  children,
}) => {
  return (
    <CustomTextField
      label={label}
      variant={variant}
      onChange={Function}
      fullWidth={fullWidth}
      value={value}
      select={select}
      sx={{
        "& .Mui-focused": {
          color: "#000", // Change the text color when focused
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000", // Change the border color when focused
          },
        },
      }}
    >
      {children}
    </CustomTextField>
  );
};

export default CustomTextField;
