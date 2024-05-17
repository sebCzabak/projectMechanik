import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box style={{ padding: '20px' }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
      >
        Strona nie została znaleziona
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        align="center"
      >
        Wróć do <Link to="/">strony głównej</Link>.
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
