
import React from 'react';
import AnimeListContainer from './containers/AnimeListContainer/AnimeListContainer'; 

function App() {
    // estilo básico da página inteira
  const appStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
    padding: '20px',
  };
  
  return (
    <div style={appStyle}>
      {/* título principal da aplicação */}
      <h1 style={{ color: '#dc143c' }}>Catálogo de Animes: Aplicação de Padrões</h1>
      {/* aqui eu chamo o Container que cuida de toda a lógica */}
      <AnimeListContainer />
    </div>
  );
}

export default App;