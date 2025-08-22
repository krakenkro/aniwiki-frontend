import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Typography, Box, Alert } from '@mui/material';
import AnimeCard from '../components/AnimeCard';
import Pagination from '../components/Pagination';
import LoadingSkeleton from '../components/LoadingSkeleton';
import apiService, { AnimeItem } from '../services/api';

const HomePage: React.FC = () => {
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get current page from URL query params or default to 1
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get('page') || '1', 10);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiService.getAnimeList(currentPage);
        setAnimeList(response.data);
        setTotalPages(response.pagination.last_visible_page);
      } catch (err) {
        console.error('Error fetching anime list:', err);
        setError('Failed to fetch anime list. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeList();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    navigate(`/?page=${page}`);
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Explore Anime
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <LoadingSkeleton type="card" count={12} />
      ) : (
        <>
          <Grid container spacing={3}>
            {animeList.map((anime) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={anime.mal_id}>
                <AnimeCard
                  id={anime.mal_id}
                  title={anime.title}
                  image={anime.images.jpg.image_url}
                  score={anime.score}
                  type={anime.type}
                  year={anime.year}
                />
              </Grid>
            ))}
          </Grid>

          {animeList.length === 0 && !loading && (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography variant="h6">No anime found</Typography>
            </Box>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;