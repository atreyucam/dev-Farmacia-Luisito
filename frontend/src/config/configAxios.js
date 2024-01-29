import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api', // Puedes configurar la URL base aquí
});

export default axiosInstance;