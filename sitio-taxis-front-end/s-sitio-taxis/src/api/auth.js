
// api/authApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Reemplaza con la URL y el puerto de tu servidor

const authApi = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  signup: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default authApi;
