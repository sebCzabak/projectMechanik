import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import servicesService from '../services/servicesService';
import { UserContext } from './UserContext';

const AppointmentPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [availableServices, setAvailableServices] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesService.getAllServices();
        setAvailableServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
        // Możesz obsłużyć błąd w odpowiedni sposób, np. wyświetlając komunikat dla użytkownika
      }
    };

    fetchServices();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Składanie zamówienia...');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box p={2}>
      <Typography
        variant="h4"
        gutterBottom
      >
        Złóż zamówienie
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        {user && user.role === 'client' ? (
          <>
            <TextField
              select
              label="Usługa"
              fullWidth
              margin="normal"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              {availableServices.map((option) => (
                <MenuItem
                  key={option.id}
                  value={option.name}
                >
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Data"
              type="date"
              fullWidth
              margin="normal"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              label="Godzina"
              type="time"
              fullWidth
              margin="normal"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </>
        ) : (
          <>
            <TextField
              label="Imię"
              fullWidth
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Nazwisko"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              select
              label="Usługa"
              fullWidth
              margin="normal"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              {availableServices.map((option) => (
                <MenuItem
                  key={option.id}
                  value={option.name}
                >
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Data"
              type="date"
              fullWidth
              margin="normal"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              label="Godzina"
              type="time"
              fullWidth
              margin="normal"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
        >
          Złóż zamówienie
        </Button>
      </form>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Potwierdzenie zamówienia</DialogTitle>
        <DialogContent>
          <Typography>Twoje zamówienie zostało przyjęte. Otrzymasz potwierdzenie na podany adres email.</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="primary"
          >
            Zamknij
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppointmentPage;
