import React, { useEffect, useState } from 'react';
import {
  Box,
  Tab,
  Tabs,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditPage from './EditPage';
import customerService from '../../services/customerService';

const AdminPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await customerService.getAllCustomers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCustomers();
  }, []);

  // Obsługa zmiany zakładki
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  // Funkcja usuwająca użytkownika
  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  // Funkcja do rozpoczęcia edycji użytkownika
  const handleEditUser = (userId) => {
    setEditingUserId(userId);
    navigate(`/admin/edit/${userId}`); // Nawigacja do strony edycji użytkownika
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
      <Tabs
        value={tabValue}
        onChange={handleChangeTab}
      >
        <Tab label="Użytkownicy" />
        <Tab label="Inne" />
      </Tabs>
      <Box hidden={tabValue !== 0}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <TableContainer style={{ maxWidth: '800px', width: '100%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Imię</TableCell>
                <TableCell>Nazwisko</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Akcje</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteUser(user.id)}>Usuń</Button>
                    <Button onClick={() => handleEditUser(user.id)}>Edytuj</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box hidden={tabValue !== 1}></Box>

      {editingUserId && <EditPage users={users} />}
    </div>
  );
};

export default AdminPage;
