
// api/authApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Reemplaza con la URL y el puerto de tu servidor

const menuApi = {
  getMenus: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/menus`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  
};

export default menuApi;
