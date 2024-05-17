import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminPage from './components/utilities/AdminPage';
import EditPage from './components/utilities/EditPage';
import MechanicPage from './components/utilities/MechanicPage';
import WarehousePage from './components/utilities/WarehousePage';
import { UserProvider } from './components/UserContext';
import NotFoundPage from './components/utilities/NotFoundPage';
import AppointmentPage from './components/AppointmentPage';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <div>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/services"
              element={<ServicesPage />}
            />
            <Route
              path="/contact"
              element={<ContactPage />}
            />
            <Route
              path="/login"
              element={<LoginPage />}
            />
            <Route
              path="/register"
              element={<RegisterPage />}
            />
            <Route
              path="/admin"
              element={<AdminPage />}
            />
            <Route
              path="/admin/edit/:id"
              element={<EditPage />}
            />
            <Route
              path="/mechanic"
              element={<MechanicPage />}
            />
            <Route
              path="/warehouse"
              element={<WarehousePage />}
            />
            <Route
              path="appointment"
              element={<AppointmentPage />}
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />{' '}
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
};

export default App;
