import React from "react";
import TextField from "@mui/material/TextField";

const CustomTextField = ({
  label,
  variant,
  fullWidth,
  value,
  select,
  onChange,
  children,
  inputType,
  error,
  helperText,
}) => {
  return (
    <TextField
      inputMode={inputType}
      type={inputType === "numeric" ? "text" : inputType}
      label={label}
      variant={variant}
      onChange={onChange}
      fullWidth={fullWidth}
      value={value}
      select={select}
      error={error}
      helperText={helperText}
      sx={{
        "& .Mui-focused": {
          color: "#000",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000",
          },
        },
        "& .MuiFormHelperText-root.Mui-error": {
          color: "red",
        },
      }}
    >
      {children}
    </TextField>
  );
};

export default CustomTextField;
