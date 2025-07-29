import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ENV, isDevelopment } from '../../config/env';
import { Store } from '../../redux/Store/store';
import { setError } from '../../redux/Reducers/errorslice';
import { Alert } from 'react-native';

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
    Store.dispatch(
      setError({
        error: error.response?.data,
      }),
    );
    return Promise.reject(error);
  },
);

export const SignUpInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
  timeout: 4000,
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
  },
);

export const getServiceListInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

getServiceListInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('user_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const getSpecificService = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

getSpecificService.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('user_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const getOTPInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

getOTPInstance.interceptors.request.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);

export const verifyOTPInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json', // ✅ JSON not multipart
  },
  timeout: 2000,
  withCredentials: true,
  responseType: 'json',
});

verifyOTPInstance.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const getServiceList = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json'
})

getServiceList.interceptors.request.use(
  async config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
);