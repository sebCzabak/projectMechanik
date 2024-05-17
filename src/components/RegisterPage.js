import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Rejestracja...');
  };

  return (
    <Box style={{ padding: '20px' }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
      >
        Rejestracja
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Hasło"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Potwierdź hasło"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
        >
          Zarejestruj się
        </Button>
      </form>
      <Typography
        variant="body1"
        gutterBottom
        align="center"
        style={{ marginTop: '20px' }}
      >
        Masz już konto? <Link to="/login">Zaloguj się</Link>
      </Typography>
    </Box>
  );
};

export default RegisterPage;
