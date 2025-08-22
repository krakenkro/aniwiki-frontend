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
  Alert,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingSkeleton from '../components/LoadingSkeleton';
import apiService, { MangaItem } from '../services/api';

const MangaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [manga, setManga] = useState<MangaItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMangaDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const response = await apiService.getMangaById(parseInt(id, 10));
        setManga(response.data);
      } catch (err) {
        console.error('Error fetching manga details:', err);
        setError('Failed to fetch manga details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMangaDetails();
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

  if (!manga) {
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
        <Alert severity="warning">Manga not found</Alert>
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
              src={manga.images.jpg.large_image_url}
              alt={manga.title}
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
                <Rating value={manga.score / 2} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {manga.score} ({manga.scored_by.toLocaleString()} votes)
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Information
              </Typography>
              <Typography variant="body2">
                <strong>Type:</strong> {manga.type}
              </Typography>
              <Typography variant="body2">
                <strong>Volumes:</strong> {manga.volumes || 'Unknown'}
              </Typography>
              <Typography variant="body2">
                <strong>Chapters:</strong> {manga.chapters || 'Unknown'}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong> {manga.status}
              </Typography>
              <Typography variant="body2">
                <strong>Published:</strong> {manga.published.string}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Authors
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {manga.authors.map((author) => (
                  <Chip key={author.mal_id} label={author.name} size="small" />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Serialization
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {manga.serializations.map((serialization) => (
                  <Chip key={serialization.mal_id} label={serialization.name} size="small" />
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Right column - Details */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {manga.title}
            </Typography>
            {manga.title_english && manga.title_english !== manga.title && (
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {manga.title_english}
              </Typography>
            )}

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Genres
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {manga.genres.map((genre) => (
                  <Chip key={genre.mal_id} label={genre.name} size="small" />
                ))}
                {manga.themes.map((theme) => (
                  <Chip key={theme.mal_id} label={theme.name} size="small" color="primary" />
                ))}
                {manga.demographics.map((demographic) => (
                  <Chip key={demographic.mal_id} label={demographic.name} size="small" color="secondary" />
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" fontWeight="bold">
              Synopsis
            </Typography>
            <Typography variant="body1" paragraph>
              {manga.synopsis || 'No synopsis available.'}
            </Typography>

            {manga.background && (
              <>
                <Typography variant="subtitle1" fontWeight="bold">
                  Background
                </Typography>
                <Typography variant="body1" paragraph>
                  {manga.background}
                </Typography>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MangaPage;