import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const auth_Instance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
  responseType: 'json',
  withCredentials: true,
});

auth_Instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('user_token');
    token ? (config.headers.Authorization = `Bearer ${token}`) : null;
    return config;
  },
  error => {
    return Promise.resolve(error);
  },
);

export const service_Instance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

service_Instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('user_token');
    token ? (config.headers.Authorization = `Bearer ${token}`) : null;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const otp_Instance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 4000,
  withCredentials: true,
  responseType: 'json',
});

otp_Instance.interceptors.request.use(
  async config => {
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
  timeout: 2000,
  withCredentials: true,
  responseType: 'json',
});

export const getServiceList = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

getServiceList.interceptors.request.use(
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

export const saveBookingsInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application',
  },
  responseType: 'json',
});

saveBookingsInstance.interceptors.request.use(
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

export const locationServices = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

locationServices.interceptors.request.use(
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
