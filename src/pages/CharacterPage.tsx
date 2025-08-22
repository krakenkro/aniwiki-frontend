import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Alert,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingSkeleton from '../components/LoadingSkeleton';
import apiService, { CharacterItem } from '../services/api';

const CharacterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<CharacterItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const response = await apiService.getCharacterById(parseInt(id, 10));
        setCharacter(response.data);
      } catch (err) {
        console.error('Error fetching character details:', err);
        setError('Failed to fetch character details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
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

  if (!character) {
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
        <Alert severity="warning">Character not found</Alert>
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
              src={character.images.jpg.image_url}
              alt={character.name}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 1,
                mb: 2,
              }}
            />

            <Typography variant="h5" gutterBottom>
              {character.name}
            </Typography>

            {character.name_kanji && (
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {character.name_kanji}
              </Typography>
            )}

            {character.nicknames && character.nicknames.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Nicknames
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {character.nicknames.map((nickname, index) => (
                    <Chip key={index} label={nickname} size="small" />
                  ))}
                </Box>
              </Box>
            )}

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Favorites
              </Typography>
              <Typography variant="body2">
                {character.favorites.toLocaleString()} fans
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Right column - Details and appearances */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              About
            </Typography>
            <Typography variant="body1" paragraph>
              {character.about || 'No information available.'}
            </Typography>
          </Paper>

          {/* Anime appearances */}
          {character.animeography && character.animeography.length > 0 && (
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Anime Appearances
              </Typography>
              <List>
                {character.animeography.map((appearance) => (
                  <ListItem
                    key={appearance.anime.mal_id}
                    component={RouterLink}
                    to={`/anime/${appearance.anime.mal_id}`}
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
                        src={appearance.anime.images.jpg.image_url}
                        alt={appearance.anime.title}
                        sx={{ width: 50, height: 50, mr: 1 }}
                        variant="rounded"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={appearance.anime.title}
                      secondary={`Role: ${appearance.role}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {/* Manga appearances */}
          {character.mangaography && character.mangaography.length > 0 && (
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Manga Appearances
              </Typography>
              <List>
                {character.mangaography.map((appearance) => (
                  <ListItem
                    key={appearance.manga.mal_id}
                    component={RouterLink}
                    to={`/manga/${appearance.manga.mal_id}`}
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
                        src={appearance.manga.images.jpg.image_url}
                        alt={appearance.manga.title}
                        sx={{ width: 50, height: 50, mr: 1 }}
                        variant="rounded"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={appearance.manga.title}
                      secondary={`Role: ${appearance.role}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {/* Voice actors */}
          {character.voices && character.voices.length > 0 && (
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Voice Actors
              </Typography>
              <List>
                {character.voices.map((voice, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={voice.person.images.jpg.image_url}
                        alt={voice.person.name}
                        sx={{ width: 50, height: 50, mr: 1 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={voice.person.name}
                      secondary={`Language: ${voice.language}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CharacterPage;