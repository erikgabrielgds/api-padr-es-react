// src/containers/AnimeListContainer/AnimeListContainer.jsx
import React, { useState, useEffect } from 'react';
import AnimeItem from '../../components/AnimeItem/AnimeItem'; 
import Card from '../../components/Card/Card'; 
import Button from '../../components/Button/Button'; 

// Constantes de paginação
const API_URL = 'https://api.jikan.moe/v4/anime';
const ANIME_LIMIT = 6; // Limita a 6 cards por busca

const AnimeListContainer = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Controla a página atual
  const [hasMore, setHasMore] = useState(true); // Indica se há mais dados a buscar

  // Função centralizada de busca
  const fetchAnimes = async (pageNumber, append = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}?limit=${ANIME_LIMIT}&page=${pageNumber}`);
      
      if (!response.ok) {
        throw new Error(`Erro de rede: status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Mapeamento de Dados Jikan
      const newAnimes = data.data.map(item => ({
          id: item.mal_id,
          title: item.title,
          imageUrl: item.images?.jpg?.image_url,
          genre: item.genres.map(g => g.name).join(', '),
          year: item.year || 'N/A'
      }));
      
      if (append) {
        // Se for "Carregar Mais", anexa à lista existente
        setAnimes(prevAnimes => [...prevAnimes, ...newAnimes]);
      } else {
        // Se for a primeira carga, substitui a lista
        setAnimes(newAnimes);
      }
      
      // Verifica se há mais páginas a serem carregadas
      setHasMore(data.pagination.has_next_page);
      
    } catch (err) {
      console.error("Erro ao buscar a API:", err);
      setError("Não foi possível carregar os dados dos animes.");
    } finally {
      setLoading(false);
    }
  };

  // 1. Efeito inicial (Carrega a primeira página)
  useEffect(() => {
    fetchAnimes(1, false);
  }, []);

  // 2. Lógica para "Carregar Mais"
  const handleLoadMore = () => {
    // Esta é a função que será chamada pelo botão Presentational
    const nextPage = page + 1;
    setPage(nextPage);
    fetchAnimes(nextPage, true); // O 'true' indica para anexar os dados
  };

  // Lógica de Callback para interação do usuário
  const handleAnimeSelect = (id) => {
    const selectedAnime = animes.find(a => a.id === id);
    alert(`Anime Selecionado (ID: ${id}):\n${selectedAnime.title} (${selectedAnime.year})`);
  };

  // Renderização
  if (loading && animes.length === 0) {
    return <Card title="Carregando Dados..."><p>Buscando animes na API Jikan...</p></Card>;
  }
  
  if (error) {
    // Se houver erro, apenas exibe a mensagem (sem o botão de atualizar)
    return <Card title="Erro"><p style={{ color: 'red' }}>{error}</p></Card>;
  }

  return (
    <div>
      {/* Botão de Atualizar Lista removido. A lista inicial carrega no useEffect. */}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {animes.map(anime => (
          // Passa os dados e a função de callback (props) para o componente Presentational
          <AnimeItem key={anime.id} anime={anime} onSelect={handleAnimeSelect} />
        ))}
      </div>
      
      {/* Botão de Paginação (Carregar Mais) */}
      <div style={{ margin: '30px 0', textAlign: 'center' }}>
        {hasMore && (
          <Button onClick={handleLoadMore} disabled={loading}>
            {/* O Presenter Button recebe a lógica do Container */}
            {loading ? 'Carregando Mais...' : `Carregar Mais ${ANIME_LIMIT} Animes (Pág ${page + 1})`}
          </Button>
        )}
        {!hasMore && animes.length > 0 && (
          <p style={{ color: '#555' }}>Todos os animes desta categoria foram carregados.</p>
        )}
      </div>
    </div>
  );
};

export default AnimeListContainer;