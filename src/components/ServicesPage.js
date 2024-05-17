import React from 'react';
import { Box, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const ServicesPage = () => {
  const services = [
    { id: 1, name: 'Przegląd mechaniczny', description: 'Pełen przegląd stanu technicznego samochodu', price: '$100' },
    { id: 2, name: 'Wymiana oleju', description: 'Wymiana oleju silnikowego z filtrem', price: '$50' },
    { id: 3, name: 'Naprawa hamulców', description: 'Naprawa i wymiana elementów układu hamulcowego', price: '$150' },
    { id: 4, name: 'Wymiana opon', description: 'Wymiana opon z wyważeniem kół', price: '$80' },
  ];

  return (
    <Box style={{ padding: '20px' }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
      >
        Nasze Usługi
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nazwa</TableCell>
              <TableCell>Opis</TableCell>
              <TableCell>Cena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.id}</TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>{service.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ServicesPage;
