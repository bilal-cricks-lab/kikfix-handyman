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
        console.log(error)
    }
)

SignInInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);