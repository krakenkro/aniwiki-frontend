import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' AniWiki - All data provided by '}
          <Link color="inherit" href="https://jikan.moe/" target="_blank" rel="noopener noreferrer">
            Jikan API
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;