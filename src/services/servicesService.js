import axios from 'axios';

const API_URL = '/api/services';

const servicesService = {
  getAllServices: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/services`);
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw new Error('Error fetching services');
    }
  },
};

export default servicesService;
