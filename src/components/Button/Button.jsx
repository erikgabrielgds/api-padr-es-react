import React from 'react';

const Button = ({ children, onClick, disabled = false }) => {
  // estilo do botão, nada demais, só o básico mesmo
  const buttonStyle = {
    padding: '10px 15px',
    fontSize: '14px',
    backgroundColor: disabled ? '#ccc' : '#dc143c', // se tiver desabilitado muda a cor
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: disabled ? 'not-allowed' : 'pointer', // cursor muda tbm
    opacity: disabled ? 0.7 : 1, // deixa meio apagado quando não pode clicar
    transition: 'background-color 0.3s',
    marginTop: '10px',
  };

  return (
    <button 
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {/* texto q eu quiser jogar no botão, vem do children */}
      {children}
    </button>
  );
};

export default Button;
