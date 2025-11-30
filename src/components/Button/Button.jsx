// src/components/Button/Button.jsx
import React from 'react';

const Button = ({ children, onClick, disabled = false }) => {
  const buttonStyle = {
    padding: '10px 15px',
    fontSize: '14px',
    backgroundColor: disabled ? '#ccc' : '#dc143c', // Cor temática para o botão
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.7 : 1,
    transition: 'background-color 0.3s',
    marginTop: '10px',
  };

  return (
    <button 
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Usa children para o texto do botão */}
      {children}
    </button>
  );
};

export default Button;