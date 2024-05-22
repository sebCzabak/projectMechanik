import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import customerService from '../../services/customerService';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await customerService.getCustomer(id);
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await customerService.updateCustomer(user);
      navigate('/admin');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoBack = () => {
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
