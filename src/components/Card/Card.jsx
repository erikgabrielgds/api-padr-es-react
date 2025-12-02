import React from 'react';

const Card = ({ title, children }) => {
  // estilo do card (o quadradinho branco)
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
  
  // estilo do título do card
  const titleStyle = {
    borderBottom: '2px solid #eee',
    paddingBottom: '10px',
    marginBottom: '15px',
    width: '100%',
  }

  return (
    <div style={cardStyle}>
      {/* se tiver título, mostra ele aqui */}
      {title && <h3 style={titleStyle}>{title}</h3>}
      
      {/* children é o conteúdo q eu coloco dentro do Card */}
      {children}
    </div>
  );
};

export default Card;
