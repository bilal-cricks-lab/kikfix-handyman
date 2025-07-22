import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const SignInInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
  timeout: 2000,
  withCredentials: true,
  responseType: 'json',
});

SignInInstance.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    console.log(error);
  },
);

SignInInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export const SignUpInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
  timeout: 2000,
  responseType: 'json',
});

SignUpInstance.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    console.log(error);
  },
);

SignUpInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export const getServiceCategory = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

getServiceCategory.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('user_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);