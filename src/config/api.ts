// Configuración de la API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://programacion-iii-seccion-3.onrender.com';

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  LOGIN: `${API_BASE_URL}/api/login`,
  REGISTER: `${API_BASE_URL}/api/register`,
  PRODUCTS: `${API_BASE_URL}/api/products`,
};

export default API_ENDPOINTS;