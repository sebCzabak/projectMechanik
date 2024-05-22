import axios from 'axios';

const API_URL = 'http://your-backend-url'; // Zastąp 'http://your-backend-url' adresem URL twojego backendu

const appointmentService = {
  checkAvailability: async (date, time) => {
    try {
      const response = await axios.get(`${API_URL}/api/appointments/check?date=${date}&time=${time}`);
      return response.data;
    } catch (error) {
      console.error('Error checking appointment availability:', error);
      throw new Error('Error checking appointment availability');
    }
  },
  makeAppointment: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/api/appointments`, data);
      return response.data;
    } catch (error) {
      console.error('Error making appointment:', error);
      throw new Error('Error making appointment');
    }
  },
};

export default appointmentService;
