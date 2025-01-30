import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PUBLIC_API_URL } from '@env';

console.log('PUBLIC_API_URL:', PUBLIC_API_URL);

const axiosClient = axios.create({
  baseURL: PUBLIC_API_URL,
});

axiosClient.interceptors.request.use(
  (config) => {
		console.log('After asking for token');
    const token = AsyncStorage.getItem('accessToken');
		console.log('Before asking for token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
