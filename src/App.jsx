
import React from 'react';
import AnimeListContainer from './containers/AnimeListContainer/AnimeListContainer'; 

function App() {
  const appStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
    padding: '20px',
  };
  
  return (
    <div style={appStyle}>
      <h1 style={{ color: '#dc143c' }}>Catálogo de Animes: Aplicação de Padrões</h1>
      {/* O Container principal é montado aqui */}
      <AnimeListContainer />
    </div>
  );
}

export default App;