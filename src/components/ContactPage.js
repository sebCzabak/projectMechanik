import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formularz został wysłany!');
  };

  return (
    <Box style={{ padding: '20px' }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
      >
        Skontaktuj się z nami
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        align="center"
      >
        Zapraszamy do naszego salonu!
        <br />
        Adres: ul. Przykładowa 123, 00-000 Miasto
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '500px', margin: '0 auto' }}
      >
        <TextField
          label="Imię i nazwisko"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Wiadomość"
          multiline
          rows={4}
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
          Wyślij
        </Button>
      </form>
    </Box>
  );
};

export default ContactPage;
