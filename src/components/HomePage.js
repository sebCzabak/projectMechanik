// HomePage.js
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const HomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
      >
        Welcome to Home Page
      </Typography>
      <Typography variant="body1">This is a simple home page. Feel free to explore our services.</Typography>
    </Box>
  );
};

export default HomePage;
