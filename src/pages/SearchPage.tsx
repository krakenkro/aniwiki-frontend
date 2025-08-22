import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Grid,
  Typography,
  Box,
  Alert,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AnimeCard from '../components/AnimeCard';
import Pagination from '../components/Pagination';
import LoadingSkeleton from '../components/LoadingSkeleton';
import apiService, { AnimeItem, MangaItem } from '../services/api';

type SearchType = 'anime' | 'manga';

const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<(AnimeItem | MangaItem)[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchType, setSearchType] = useState<SearchType>('anime');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const location = useLocation();
  const navigate = useNavigate();

  // Get search parameters from URL
  const queryParams = new URLSearchParams(location.search);
  const queryFromUrl = queryParams.get('q') || '';
  const typeFromUrl = (queryParams.get('type') as SearchType) || 'anime';
  const currentPage = parseInt(queryParams.get('page') || '1', 10);

  // Initialize form values from URL parameters
  useEffect(() => {
    setSearchQuery(queryFromUrl);
    setSearchType(typeFromUrl);
  }, [queryFromUrl, typeFromUrl]);

  // Perform search when URL parameters change
  useEffect(() => {
    const performSearch = async () => {
      if (!queryFromUrl) {
        setSearchResults([]);
        setTotalPages(0);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await apiService.search(queryFromUrl, typeFromUrl, currentPage);
        setSearchResults(response.data);
        setTotalPages(response.pagination.last_visible_page);
      } catch (err) {
        console.error('Error performing search:', err);
        setError('Failed to perform search. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [queryFromUrl, typeFromUrl, currentPage]);

  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value as SearchType);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Update URL with search parameters
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}&type=${searchType}`);
    }
  };

  const handlePageChange = (page: number) => {
    navigate(`/search?q=${encodeURIComponent(queryFromUrl)}&type=${typeFromUrl}&page=${page}`);
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Search
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSearchSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Search for anime, manga, or characters"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="search-type-label">Type</InputLabel>
                <Select
                  labelId="search-type-label"
                  value={searchType}
                  label="Type"
                  onChange={handleSearchTypeChange}
                >
                  <MenuItem value="anime">Anime</MenuItem>
                  <MenuItem value="manga">Manga</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                size="large"
                disabled={!searchQuery.trim()}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {queryFromUrl && (
        <Typography variant="h6" gutterBottom>
          Search results for "{queryFromUrl}" in {typeFromUrl}
        </Typography>
      )}

      {loading ? (
        <LoadingSkeleton type="card" count={12} />
      ) : (
        <>
          {searchResults.length > 0 ? (
            <Grid container spacing={3}>
              {searchResults.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.mal_id}>
                  <AnimeCard
                    id={item.mal_id}
                    title={item.title}
                    image={item.images.jpg.image_url}
                    score={item.score}
                    type={item.type}
                    year={'year' in item ? item.year : undefined}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            queryFromUrl && (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="h6">
                  No results found for "{queryFromUrl}" in {typeFromUrl}
                </Typography>
              </Box>
            )
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

export default SearchPage;