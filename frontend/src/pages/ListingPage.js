import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography, Box, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';

const ListingPage = () => {
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/media');
        setMediaList(response.data);
      } catch (error) {
        console.error('Error fetching media', error);
      }
    };

    fetchMedia();
  }, []);

  return (
    <Box
      sx={{
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '1200px',  // Fixes the max width of the Box
        width: '100%',      // Ensures the Box is responsive up to the max width
        margin: '0 auto',   // Centers the Box horizontally
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Media List
      </Typography>
      
      {/* Grid for media items in a row */}
      <Grid container spacing={3} justifyContent="center">
        {mediaList.map((media) => (
          <Grid item key={media._id}>
            <Card sx={{ maxWidth: 345 }}>
              <Link to={`/video/${media._id}`} style={{ textDecoration: 'none' }}>
                {/* Media Image */}
                <CardMedia
                  component="img"
                  height="200"
                  image={media.imageUrl} 
                  alt={media.title}
                  sx={{ cursor: 'pointer' }}
                />
                {/* Media Title */}
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {media.title}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Upload New Media Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 3 }}>
        <Link to="/upload" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' },
            }}
          >
            Upload New Media
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default ListingPage;
