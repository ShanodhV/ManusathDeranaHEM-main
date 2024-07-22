import React from 'react'
import { ArrowDropDown } from '@mui/icons-material'

const CustomDropdown = (
    {
        label,
        variant,
        fullWidth,
        value,
        select,
        onChange, // Changed from Function to onChange
        children,
    }
) => {
  return (
    <ArrowDropDown
    label={label}
    variant={variant}
    onChange={onChange} // Updated here
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
  </ArrowDropDown>
  )
}

export default CustomDropdown
