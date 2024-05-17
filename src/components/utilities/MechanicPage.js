import React, { useState } from 'react';
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const MechanicPage = () => {
  const [pendingOrders, setPendingOrders] = useState([
    { id: 1, description: 'Wymiana oleju', parts: 'olej napędowy', status: 'pending' },
    { id: 2, description: 'Naprawa hamulców', parts: ['tarczę hamulcowe', 'klocki hamulcowe'], status: 'pending' },
  ]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleAcceptOrder = (orderId) => {
    const orderToAccept = pendingOrders.find((order) => order.id === orderId);
    if (orderToAccept) {
      const updatedPendingOrders = pendingOrders.filter((order) => order.id !== orderId);
      setPendingOrders(updatedPendingOrders);
      orderToAccept.status = 'accepted';
      setAcceptedOrders((prevOrders) => [...prevOrders, orderToAccept]);
    }
  };

  const handleRequestParts = (orderId) => {
    const updatedAcceptedOrders = acceptedOrders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: 'Parts Requested' };
      }
      return order;
    });
    setAcceptedOrders(updatedAcceptedOrders);
    setSelectedOrder(orderId);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
    setIsDialogOpen(false);
  };

  const handleStartService = () => {
    const updatedAcceptedOrders = acceptedOrders.map((order) => {
      if (order.id === selectedOrder) {
        return { ...order, status: 'Service in Progress' };
      }
      return order;
    });
    setAcceptedOrders(updatedAcceptedOrders);
    setIsDialogOpen(false);
  };

  const handleViewPartsDetails = (orderId) => {
    setSelectedOrder(orderId);
    setIsDialogOpen(true);
  };

  return (
    <Box>
      <h2>Pending Orders</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.description}</TableCell>
                <TableCell>
                  {order.status === 'pending' && <Button onClick={() => handleAcceptOrder(order.id)}>Accept</Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h2>Accepted Orders</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {acceptedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.description}</TableCell>
                <TableCell>
                  <span style={{ color: order.status === 'Parts Requested' ? 'orange' : 'inherit' }}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  {order.status === 'accepted' && (
                    <>
                      <Button onClick={() => handleRequestParts(order.id)}>Request Parts</Button>
                      <Button onClick={() => handleViewPartsDetails(order.id)}>View Details</Button>
                    </>
                  )}
                  {order.status === 'Parts Requested' && (
                    <Button onClick={() => setSelectedService(order.id)}>Start Service</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Parts Request Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <p>
                <strong>Order ID:</strong> {selectedOrder}
              </p>
              {acceptedOrders.map((order) => {
                if (order.id === selectedOrder) {
                  return (
                    <p key={order.id}>
                      <strong>Potrzebne części:</strong>{' '}
                      {Array.isArray(order.parts) ? order.parts.join(', ') : order.parts}
                      <br />
                      <strong>Zamawiający:</strong> mechanic1
                      <br />
                      <strong>Data i czas:</strong> {new Date().toLocaleString('pl-PL')}
                    </p>
                  );
                }
                return null;
              })}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          {selectedService && <Button onClick={handleStartService}>Start Service</Button>}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MechanicPage;
