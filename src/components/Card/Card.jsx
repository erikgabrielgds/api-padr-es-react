
import React from 'react';

const Card = ({ title, children }) => {
  const cardStyle = {
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  
  const titleStyle = {
    borderBottom: '2px solid #eee',
    paddingBottom: '10px',
    marginBottom: '15px',
    width: '100%',
  }

  return (
    <div style={cardStyle}>
      {title && <h3 style={titleStyle}>{title}</h3>}
      {/* Demonstra o uso de children para renderizar o conteúdo interno */}
      {children}
    </div>
  );
};

export default Card;