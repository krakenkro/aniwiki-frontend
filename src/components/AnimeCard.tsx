import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
} from '@mui/material';

interface AnimeCardProps {
  id: number;
  title: string;
  image: string;
  score?: number;
  type?: string;
  year?: number;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ id, title, image, score, type, year }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <CardActionArea 
        component={RouterLink} 
        to={`/anime/${id}`}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <CardMedia
          component="img"
          height="240"
          image={image || 'https://via.placeholder.com/225x350?text=No+Image'}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h6" component="div" noWrap title={title}>
            {title}
          </Typography>
          
          <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {score ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={score / 2} precision={0.5} readOnly size="small" />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                  {score.toFixed(1)}
                </Typography>
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No rating
              </Typography>
            )}
            
            <Box>
              {type && (
                <Chip 
                  label={type} 
                  size="small" 
                  sx={{ mr: 0.5, fontSize: '0.7rem' }} 
                />
              )}
              {year && (
                <Chip 
                  label={year} 
                  size="small" 
                  sx={{ fontSize: '0.7rem' }} 
                />
              )}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AnimeCard;