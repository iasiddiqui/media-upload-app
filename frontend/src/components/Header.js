import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => (
  <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Media Upload
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{
            '&:hover': { backgroundColor: '#1565c0' },
            fontWeight: 500,
            textTransform: 'none',
          }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/upload"
          sx={{
            '&:hover': { backgroundColor: '#1565c0' },
            fontWeight: 500,
            textTransform: 'none',
          }}
        >
          Upload
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
