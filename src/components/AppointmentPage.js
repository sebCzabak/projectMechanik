// AppointmentPage.js
import React, { useState } from 'react';
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

const services = [
  { id: 2, value: 'oil_change', label: 'Wymiana oleju' },
  { id: 1, value: 'check_up', label: 'Przegląd mechaniczny' },
  { id: 3, value: 'brake_repair', label: 'Naprawa hamulców' },
  { id: 4, value: 'tire_change', label: 'wymiana opon' },
];

const AppointmentPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

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
          {services.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
            >
              {option.label}
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
