import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const EditPage = ({ users }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/admin');
  };
  //   const handleSaveChanges = async () => {
  //     try {
  //       // Wysyłamy zaktualizowane dane użytkownika do serwera za pomocą Axiosa
  //       const response = await axios.put(`URL_do_api/${user.id}`, user);

  //       // Sprawdzamy, czy zapytanie zakończyło się sukcesem
  //       if (response.status !== 200) {
  //         throw new Error('Wystąpił błąd podczas aktualizacji danych użytkownika.');
  //       }

  //       // Pobieramy zaktualizowane dane użytkownika z serwera
  //       const updatedUserData = response.data;

  //       // Aktualizujemy stan użytkownika na podstawie danych z serwera
  //       setUser(updatedUserData);

  //       // Przechodzimy z powrotem do strony admina
  //       navigate('/admin');
  //     } catch (error) {
  //       console.error(error.message);
  //       // Obsłużanie błędów, na przykład wyświetlenie komunikatu dla użytkownika
  //     }

  const handleGoBack = () => {
    // Powrót do strony admina bez zapisywania zmian
    navigate('/admin');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <h2>Edytuj użytkownika</h2>
      <form style={{ width: '300px', maxWidth: '80%', marginTop: '20px' }}>
        <TextField
          style={{ marginBottom: '10px' }}
          label="Imię"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          style={{ marginBottom: '10px' }}
          label="Nazwisko"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          style={{ marginBottom: '10px' }}
          label="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          fullWidth
        />
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button
            style={{ width: '45%' }}
            variant="contained"
            onClick={handleSaveChanges}
          >
            Zapisz zmiany
          </Button>
          <Button
            style={{ width: '45%' }}
            variant="contained"
            onClick={handleGoBack}
          >
            Anuluj
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
