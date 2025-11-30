// src/components/AnimeItem/AnimeItem.jsx
import React from 'react';
import Card from '../Card/Card';
import Button from '../Button/Button';

// O Presenter espera receber os campos já mapeados pelo Container
const AnimeItem = ({ anime, onSelect }) => {
  return (
    <div style={{ flex: '0 0 300px', margin: '10px' }}>
      <Card title={anime.title}>
        
        {/* Agora esta URL virá diretamente da API Jikan */}
        <img 
          src={anime.imageUrl} 
          alt={anime.title} 
          style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px' }}
        />
        
        <p style={{ fontSize: '14px', color: '#666', margin: '5px 0' }}>Gênero: {anime.genre}</p>
        <p style={{ fontSize: '14px', color: '#666', margin: '5px 0' }}>Ano: {anime.year}</p>
        
        <Button onClick={() => onSelect(anime.id)}>
          Ver Detalhes (Lógica no Container)
        </Button>
      </Card>
    </div>
  );
};

export default AnimeItem;