import axios from 'axios';

const API_URL = '/api/customer';

const getAllCustomers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getCustomer = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const updateCustomer = async (customer) => {
  const response = await axios.put(API_URL, customer);
  return response.data;
};

export default {
  getAllCustomers,
  getCustomer,
  updateCustomer,
};
