import React from 'react';
import { Grid, Skeleton, Card, CardContent, CardActionArea, Box } from '@mui/material';

interface LoadingSkeletonProps {
  count?: number;
  type?: 'card' | 'detail' | 'list';
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 12, type = 'card' }) => {
  if (type === 'detail') {
    return (
      <Box sx={{ width: '100%' }}>
        <Skeleton variant="rectangular" width="100%" height={400} sx={{ mb: 2 }} />
        <Skeleton variant="text" height={60} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Skeleton variant="rectangular" width={80} height={32} />
          <Skeleton variant="rectangular" width={80} height={32} />
          <Skeleton variant="rectangular" width={80} height={32} />
        </Box>
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Box>
    );
  }

  if (type === 'list') {
    return (
      <Box sx={{ width: '100%' }}>
        {Array.from(new Array(count)).map((_, index) => (
          <Box key={index} sx={{ display: 'flex', my: 2 }}>
            <Skeleton variant="rectangular" width={100} height={140} sx={{ mr: 2 }} />
            <Box sx={{ width: '100%' }}>
              <Skeleton variant="text" height={40} width="80%" sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} width="60%" sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} width="40%" />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  // Default card skeleton
  return (
    <Grid container spacing={3}>
      {Array.from(new Array(count)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card>
            <CardActionArea>
              <Skeleton variant="rectangular" height={240} />
              <CardContent>
                <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Skeleton variant="text" width="40%" />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Skeleton variant="rectangular" width={40} height={24} />
                    <Skeleton variant="rectangular" width={40} height={24} />
                  </Box>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LoadingSkeleton;