import React from 'react';
import Card from '../Card/Card';
import Button from '../Button/Button';

// esse componente aqui só mostra o anime, tudo já vem pronto do Container
const AnimeItem = ({ anime, onSelect }) => {
  return (
    <div style={{ flex: '0 0 300px', margin: '10px' }}>
      <Card title={anime.title}>
        
        {/* imagem já vem da API direto, só jogo aqui */}
        <img 
          src={anime.imageUrl} 
          alt={anime.title} 
          style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px' }}
        />
        
        {/* infos básicas do anime */}
        <p style={{ fontSize: '14px', color: '#666', margin: '5px 0' }}>Gênero: {anime.genre}</p>
        <p style={{ fontSize: '14px', color: '#666', margin: '5px 0' }}>Ano: {anime.year}</p>
        
        {/* botão pra clicar e mandar o id pro Container fazer a lógica */}
        <Button onClick={() => onSelect(anime.id)}>
          Ver Detalhes (Lógica no Container)
        </Button>
      </Card>
    </div>
  );
};

export default AnimeItem;
