import React from 'react'

const Buttons = ({ onClick, label, variant, color, disabled }) => {
  return (
    <button
      onClick={onClick}
      style={{ 
        padding: '10px 20px', 
        borderRadius: '5px', 
        backgroundColor: color || "#DD7070" , 
        color: 'white', 
        border: 'none', 
        cursor: 'pointer', 
        fontWeight: 'bold', 
        fontSize: '16px', 
      }}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Buttons
