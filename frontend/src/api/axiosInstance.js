import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:import.meta.env.VITE_API_BASE_URL, // ✅ Your backend URL
  withCredentials: true,                 // Optional if you're using cookies (otherwise remove this line)
});

// ✅ Attach Authorization token with every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;




