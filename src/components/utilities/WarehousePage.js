import React, { useState, useEffect } from 'react';
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
import productsService from '../../services/productsService';

const WarehousePage = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Olej silnikowy', quantity: 10 },
    { id: 2, name: 'Klocki hamulcowe', quantity: 5 },
  ]);

  const [pendingParts, setPendingParts] = useState([
    { id: 1, serviceName: 'Wymiana oleju', partName: 'Olej silnikowy', quantity: 2 },
    { id: 2, serviceName: 'Naprawa hamulców', partName: 'Klocki hamulcowe', quantity: 1 },
  ]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  const [completedJobs, setCompletedJobs] = useState([]);

  const [showDocument, setShowDocument] = useState(false);

  const [selectedDocument, setSelectedDocument] = useState(null);

  const handlePartUsed = (partId) => {
    // Aktualizuj stan magazynu
    const updatedInventory = inventory.map((item) => {
      if (item.id === partId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setInventory(updatedInventory);

    // Aktualizuj stan oczekujących części
    const updatedPendingParts = pendingParts.map((part) => {
      if (part.id === partId) {
        return { ...part, quantity: part.quantity - 1 };
      }
      return part;
    });
    setPendingParts(updatedPendingParts);

    // Sprawdź, czy wszystkie części zostały wykorzystane
    const allPartsUsed = updatedPendingParts.every((part) => part.quantity === 0);
    if (allPartsUsed) {
      setShowDocument(true);
      // Dodaj aktualne zlecenie do listy zakończonych zleceń
      setCompletedJobs([...completedJobs, ...updatedPendingParts]);
    }
  };

  const handleJobCompleted = (jobId) => {
    const completedJob = pendingParts.find((job) => job.id === jobId);
    setCompletedJobs([...completedJobs, completedJob]);
    const updatedPendingJobs = pendingParts.filter((job) => job.id !== jobId);
    setPendingParts(updatedPendingJobs);
  };

  const handleCloseDocument = () => {
    setShowDocument(false);
  };
  const handlePreviewDocument = (orderId) => {
    const selectedOrder = completedJobs.find((job) => job.id === orderId);
    setSelectedDocument(selectedOrder);
    setShowDocument(true);
  };

  return (
    <Box>
      <h2>Stan magazynowy</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nazwa</TableCell>
              <TableCell>Ilość</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h2>Oczekujące części do usług</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Usługa</TableCell>
              <TableCell>Część</TableCell>
              <TableCell>Ilość</TableCell>
              <TableCell>Akcja</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingParts.map((part) => (
              <TableRow key={part.id}>
                <TableCell>{part.id}</TableCell>
                <TableCell>{part.serviceName}</TableCell>
                <TableCell>{part.partName}</TableCell>
                <TableCell>
                  {part.quantity === 0 ? <span style={{ color: 'green' }}>Wydane</span> : part.quantity}
                </TableCell>
                <TableCell>
                  {part.quantity > 0 && <Button onClick={() => handlePartUsed(part.id)}>Wykorzystaj</Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h2>Wydane części</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID zamówienia</TableCell>
              <TableCell>Usługa</TableCell>
              <TableCell>Część</TableCell>
              <TableCell>Ilość</TableCell>
              <TableCell>Akcja</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completedJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.id}</TableCell>
                <TableCell>{job.serviceName}</TableCell>
                <TableCell>{job.partName}</TableCell>
                <TableCell>Wydane</TableCell>
                <TableCell>
                  <Button onClick={() => handlePreviewDocument(job.id)}>Podgląd</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal z dokumentem wydania części */}
      <Dialog
        open={showDocument}
        onClose={handleCloseDocument}
      >
        <DialogTitle>Dokument wydania części</DialogTitle>
        <DialogContent>
          {selectedDocument && (
            <div>
              <p>Numer zamówienia: {selectedDocument.id}</p>
              <p>Usługa: {selectedDocument.serviceName}</p>
              <p>Część: {selectedDocument.partName}</p>
              <p>Ilość: {selectedDocument.quantity}</p>
              <p>Data wydania: {new Date().toLocaleString('pl-PL')}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDocument}
            variant="contained"
          >
            Zamknij
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WarehousePage;
