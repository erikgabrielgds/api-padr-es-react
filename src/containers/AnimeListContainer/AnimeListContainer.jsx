import React, { useState, useEffect } from 'react';
import AnimeItem from '../../components/AnimeItem/AnimeItem'; 
import Card from '../../components/Card/Card'; 
import Button from '../../components/Button/Button'; 

// url da API + limite por página
const API_URL = 'https://api.jikan.moe/v4/anime';
const ANIME_LIMIT = 6; // só pego 6 por página mesmo

const AnimeListContainer = () => {
  // estados principais q vou usar
  const [animes, setAnimes] = useState([]); // onde ficam os animes
  const [loading, setLoading] = useState(true); // controla carregamento
  const [error, setError] = useState(null); // guarda erro caso de problema
  const [page, setPage] = useState(1); // página atual da API
  const [hasMore, setHasMore] = useState(true); // pra saber se ainda tem próxima página

  // função q realmente chama a API
  const fetchAnimes = async (pageNumber, append = false) => {
    try {
      setLoading(true); // começo do loading
      setError(null); // limpa erros anteriores
      
      // faz a requisição na API
      const response = await fetch(`${API_URL}?limit=${ANIME_LIMIT}&page=${pageNumber}`);
      
      if (!response.ok) {
        // se não for status 200+, já erro
        throw new Error(`Erro de rede: status ${response.status}`);
      }
      
      const data = await response.json(); // transforma em json
      
      // separo só o q eu realmente preciso do retorno
      const newAnimes = data.data.map(item => ({
          id: item.mal_id,
          title: item.title,
          imageUrl: item.images?.jpg?.image_url,
          genre: item.genres.map(g => g.name).join(', '),
          year: item.year || 'N/A'
      }));
      
      // se for carregar mais, adiciona no final
      // se for a primeira busca, substitui tudo
      if (append) {
        setAnimes(prevAnimes => [...prevAnimes, ...newAnimes]);
      } else {
        setAnimes(newAnimes);
      }
      
      // aqui eu vejo se a API ainda tem mais páginas
      setHasMore(data.pagination.has_next_page);
      
    } catch (err) {
      console.error("Erro ao buscar a API:", err);
      setError("Não foi possível carregar os dados dos animes."); // msg simples pro usuário
    } finally {
      setLoading(false); // encerra loading de qualquer jeito
    }
  };

  // quando o componente abrir, carrega a primeira página automaticamente
  useEffect(() => {
    fetchAnimes(1, false); // primeira busca
  }, []);

  // função do botão "carregar mais"
  const handleLoadMore = () => {
    const nextPage = page + 1; // soma mais 1 página
    setPage(nextPage); // salva no estado
    fetchAnimes(nextPage, true); // busca mais e adiciona
  };

  // quando clicar em algum anime
  const handleAnimeSelect = (id) => {
    const selectedAnime = animes.find(a => a.id === id); // pega o anime certinho
    alert(`Anime Selecionado (ID: ${id}):\n${selectedAnime.title} (${selectedAnime.year})`);
  };

  // loading inicial
  if (loading && animes.length === 0) {
    return <Card title="Carregando Dados..."><p>Buscando animes na API Jikan...</p></Card>;
  }
  
  // caso dê erro
  if (error) {
    return <Card title="Erro"><p style={{ color: 'red' }}>{error}</p></Card>;
  }

  return (
    <div>

      {/* onde renderizo todos os cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {animes.map(anime => (
          // passo os dados pro componente do card + a função quando clicar
          <AnimeItem key={anime.id} anime={anime} onSelect={handleAnimeSelect} />
        ))}
      </div>
      
      {/* área do botão carregar mais */}
      <div style={{ margin: '30px 0', textAlign: 'center' }}>
        
        {/* só mostra se ainda tem próxima página */}
        {hasMore && (
          <Button onClick={handleLoadMore} disabled={loading}>
            {loading ? 'Carregando Mais...' : `Carregar Mais ${ANIME_LIMIT} Animes (Pág ${page + 1})`}
          </Button>
        )}

        {/* se acabou as páginas, mostra isso */}
        {!hasMore && animes.length > 0 && (
          <p style={{ color: '#555' }}>Todos os animes desta categoria foram carregados.</p>
        )}
      </div>
    </div>
  );
};

export default AnimeListContainer;
