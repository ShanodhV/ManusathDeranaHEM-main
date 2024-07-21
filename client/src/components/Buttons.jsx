import React from 'react'
import { useTheme } from "@mui/material/styles";


const Buttons = ({ onClick, label, variant, color, disabled }) => {
  const theme = useTheme();

  return (
    <button
      onClick={onClick}
      style={{ 
        padding: '10px 20px', 
        borderRadius: '15px', 
        backgroundColor: color || "#CD0000" , 
        color: 'white', 
        border: 'none', 
        fontFamily:'Poppins',
        cursor: 'pointer', 
        fontWeight: 'bold', 
        fontSize: '12px', 
      }}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Buttons
