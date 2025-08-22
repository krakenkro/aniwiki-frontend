import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
  Paper,
  Rating,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Alert,
  Button,
  Link,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingSkeleton from '../components/LoadingSkeleton';
import apiService, { AnimeItem, AnimeCharacter } from '../services/api';

const AnimePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<AnimeItem | null>(null);
  const [characters, setCharacters] = useState<AnimeCharacter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch anime details
        const animeResponse = await apiService.getAnimeById(parseInt(id, 10));
        setAnime(animeResponse.data);

        // Fetch anime characters
        const charactersResponse = await apiService.getAnimeCharacters(parseInt(id, 10));
        setCharacters(charactersResponse.data);
      } catch (err) {
        console.error('Error fetching anime details:', err);
        setError('Failed to fetch anime details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (loading) {
    return <LoadingSkeleton type="detail" />;
  }

  if (error) {
    return (
      <Box sx={{ my: 4 }}>
        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Back to Home
        </Button>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!anime) {
    return (
      <Box sx={{ my: 4 }}>
        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Back to Home
        </Button>
        <Alert severity="warning">Anime not found</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        component={RouterLink}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Back to Home
      </Button>

      <Grid container spacing={4}>
        {/* Left column - Image and basic info */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box
              component="img"
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 1,
                mb: 2,
              }}
            />

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Rating
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={anime.score / 2} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {anime.score} ({anime.scored_by.toLocaleString()} votes)
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Information
              </Typography>
              <Typography variant="body2">
                <strong>Type:</strong> {anime.type}
              </Typography>
              <Typography variant="body2">
                <strong>Episodes:</strong> {anime.episodes || 'Unknown'}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong> {anime.status}
              </Typography>
              <Typography variant="body2">
                <strong>Aired:</strong> {anime.aired.string}
              </Typography>
              <Typography variant="body2">
                <strong>Season:</strong>{' '}
                {anime.season && anime.year
                  ? `${anime.season.charAt(0).toUpperCase() + anime.season.slice(1)} ${anime.year}`
                  : 'Unknown'}
              </Typography>
              <Typography variant="body2">
                <strong>Duration:</strong> {anime.duration}
              </Typography>
              <Typography variant="body2">
                <strong>Rating:</strong> {anime.rating}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Studios
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {anime.studios.map((studio) => (
                  <Chip key={studio.mal_id} label={studio.name} size="small" />
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Right column - Details and characters */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {anime.title}
            </Typography>
            {anime.title_english && anime.title_english !== anime.title && (
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {anime.title_english}
              </Typography>
            )}

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Genres
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {anime.genres.map((genre) => (
                  <Chip key={genre.mal_id} label={genre.name} size="small" />
                ))}
                {anime.themes.map((theme) => (
                  <Chip key={theme.mal_id} label={theme.name} size="small" color="primary" />
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" fontWeight="bold">
              Synopsis
            </Typography>
            <Typography variant="body1" paragraph>
              {anime.synopsis || 'No synopsis available.'}
            </Typography>

            {anime.background && (
              <>
                <Typography variant="subtitle1" fontWeight="bold">
                  Background
                </Typography>
                <Typography variant="body1" paragraph>
                  {anime.background}
                </Typography>
              </>
            )}

            {anime.trailer.youtube_id && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Trailer
                </Typography>
                <Box
                  sx={{
                    position: 'relative',
                    paddingBottom: '56.25%', // 16:9 aspect ratio
                    height: 0,
                    overflow: 'hidden',
                    maxWidth: '100%',
                    borderRadius: 1,
                  }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                    title={`${anime.title} trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  ></iframe>
                </Box>
              </Box>
            )}
          </Paper>

          {/* Characters section */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Characters
            </Typography>

            {characters.length > 0 ? (
              <List>
                {characters.slice(0, 10).map((character) => (
                  <ListItem
                    key={character.character.mal_id}
                    component={RouterLink}
                    to={`/character/${character.character.mal_id}`}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={character.character.images.jpg.image_url}
                        alt={character.character.name}
                        sx={{ width: 50, height: 50, mr: 1 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={character.character.name}
                      secondary={`Role: ${character.role}`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1">No character information available.</Typography>
            )}

            {characters.length > 10 && (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Button variant="outlined">View All Characters</Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnimePage;