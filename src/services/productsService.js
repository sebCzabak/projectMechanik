import axios from 'axios';

const API_URL = '/api/products';

const productsService = {
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Error fetching products');
    }
  },
};

export default productsService;
