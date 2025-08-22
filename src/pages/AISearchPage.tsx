import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid, Paper
} from '@mui/material';
import apiService, { AnimeItem } from '../services/api';
import SearchIcon from "@mui/icons-material/Search";
import AnimeCard from "../components/AnimeCard";

const AISearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [interpretedQuery, setInterpretedQuery] = useState<string | null>(null);
  const [results, setResults] = useState<AnimeItem[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.aiSearch(query);
      setInterpretedQuery(response.interpretedQuery);
      setResults(response.results);
    } catch (err) {
      setError('Failed to perform AI search. Please try again later.');
      console.error('AI Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h4" component="h1" gutterBottom>
        AI Anime Search
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSearch} >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                  label="Describe the anime you're looking for..."
                  variant="outlined"
                  fullWidth
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="An anime in which Chibik teaches a schoolboy to be the head of the mafia"
                  className="bg-white"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
                  size="large"
                  disabled={loading || !query.trim()}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {interpretedQuery && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
          <Typography variant="subtitle1" component="h3" className="font-medium">
            AI understood your request as:
          </Typography>
          <Typography variant="body1" component="h3" className="mt-1">
            {interpretedQuery}
          </Typography>
        </div>
      )}
      
      {results.length > 0 && (
        <div>
          <Typography variant="h5" component="h2" className="mb-4" gutterBottom>
            Results
          </Typography>

          <Grid container spacing={3}>
            {results.map((anime) => (
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
        </div>
      )}
    </div>
  );
};

export default AISearchPage;