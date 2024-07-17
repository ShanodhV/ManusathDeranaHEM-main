import React from 'react'

const Buttons = ({ onClick, label, variant, color, disabled }) => {
  return (
    <button
      onClick={onClick}
      style={{ 
        padding: '10px 20px', 
        borderRadius: '10px', 
        backgroundColor: color || "#CD0000" , 
        color: 'white', 
        border: 'none', 
        fontFamily:'Poppins',
        cursor: 'pointer', 
        fontWeight: 'bold', 
        fontSize: '15px', 
      }}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Buttons
