import React from 'react'

const Buttons = ({ onClick, label, variant, color, disabled }) => {
  return (
    <button
      onClick={onClick}
      style={{ 
        padding: '10px 20px', // Example styling
        borderRadius: '5px', // Example styling
        backgroundColor: color || "#DD7070" , // Use provided color or default to blue
        color: 'white', // Example styling
        border: 'none', // Example styling
        cursor: 'pointer', // Example styling
        fontWeight: 'bold', // Example styling
        fontSize: '16px', // Example styling
      }}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Buttons
