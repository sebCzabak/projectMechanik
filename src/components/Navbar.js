// Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          My App
        </Typography>
        <Stack
          direction="row"
          spacing={2}
        >
          <Button
            color="inherit"
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/services"
          >
            Services
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/contact"
          >
            Contact
          </Button>
          {!user && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          )}
          {user && user.role === 'mechanic' && (
            <Button
              color="inherit"
              component={Link}
              to="/mechanic"
            >
              Mechanic Page
            </Button>
          )}
          {user && user.role === 'admin' && (
            <Button
              color="inherit"
              component={Link}
              to="/admin"
            >
              Admin Page
            </Button>
          )}
          {user && user.role === 'warehouse' && (
            <Button
              color="inherit"
              component={Link}
              to="/warehouse"
            >
              Warehouse Page
            </Button>
          )}
          {user && (
            <Button
              color="inherit"
              component={Link}
              to="/appointment"
            >
              Złóż zamówienie
            </Button>
          )}
          {user && (
            <Button
              color="inherit"
              onClick={logout}
            >
              Logout
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
