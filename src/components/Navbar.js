import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Sprawdzenie, czy użytkownik jest zalogowany na podstawie obecności tokenu w localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          style={{ flexGrow: 1 }}
        >
          Moja Aplikacja
        </Typography>
        {isLoggedIn ? (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/admin"
            >
              Admin
            </Button>
            <Button
              color="inherit"
              onClick={handleLogout}
            >
              Wyloguj
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/login"
            >
              Zaloguj się
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/register"
            >
              Zarejestruj się
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
