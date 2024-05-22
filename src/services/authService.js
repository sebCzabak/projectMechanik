// services/authService.js
import axios from 'axios';

const API_URL = '/api';

const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Wystąpił błąd podczas rejestracji');
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    // Zakładamy, że w odpowiedzi jest token, który możemy przechowywać w localStorage
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Wystąpił błąd podczas logowania');
  }
};

const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
    localStorage.removeItem('user');
  } catch (error) {
    throw new Error('Wystąpił błąd podczas wylogowywania');
  }
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
