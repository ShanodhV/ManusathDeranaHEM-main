import React from "react";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material";

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
  const theme = useTheme();

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
          color: theme.palette.secondary.main,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.secondary.main,
          },
          "& .MuiInputLabel-root": {
            color: theme.palette.secondary.main, // Make label color primary when focused
          },
          "& .MuiInputBase-input": {
            color: theme.palette.secondary.main, // Make input text color primary when focused
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
