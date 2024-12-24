import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography, Box, Button, Grid } from '@mui/material';

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
    <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Media List
      </Typography>
      
      {/* Grid for media items in a row */}
      <Grid container spacing={2} justifyContent="center">
        {mediaList.map((media) => (
          <Grid item key={media._id}>
            <Button
              variant="contained"
              component={Link}
              to={`/video/${media._id}`}
              sx={{
                textDecoration: 'none',
                color: 'white',
                padding: '10px 20px',
                display: 'block',
                minWidth: 200,
                textAlign: 'center',
                '&:hover': { backgroundColor: '#1565c0' },
              }}
            >
              {media.title}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Display the Upload New Media button in a row next to the media items */}
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
