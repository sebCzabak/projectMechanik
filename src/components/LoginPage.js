import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(role); // Ustalanie roli użytkownika w kontekście
    if (role === 'mechanic') {
      navigate('/mechanic');
    } else if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'warehouse') {
      navigate('/warehouse');
    } else {
      navigate('/');
    }
  };

  return (
    <Box style={{ padding: '20px' }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
      >
        Logowanie
      </Typography>
      <form
        onSubmit={handleLogin}
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
        <FormControl
          fullWidth
          margin="normal"
        >
          <InputLabel>Rola</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="mechanic">Mechanic</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="warehouse">Warehouse</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
        >
          Zaloguj się
        </Button>
      </form>
      <Typography
        variant="body1"
        gutterBottom
        align="center"
        style={{ marginTop: '20px' }}
      >
        Nie masz konta? <Link to="/register">Zarejestruj się</Link>
      </Typography>
    </Box>
  );
};

export default LoginPage;
