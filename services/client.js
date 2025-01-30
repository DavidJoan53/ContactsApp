import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PUBLIC_API_URL } from '@env';

const axiosClient = axios.create({
  baseURL: PUBLIC_API_URL,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
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
