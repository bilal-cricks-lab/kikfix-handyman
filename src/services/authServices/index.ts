import { callPostApi, callPostRegApi, otpCallPost } from '../network';
import { getApiUrl } from '../../config/env';

const url = getApiUrl('/api/login');
const regUrl = getApiUrl('/api/register');
const otpUrl = getApiUrl('/api/send-otp')

export const Login = async (data: any) => {
  try {
    const response = await callPostApi(url, data);
    console.log(response)
    return response;
  } catch (error) {
    throw error;
  }
};

export const Register = async (data: any) => {
  try {
    const response = await callPostRegApi(regUrl, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export const OTP = async (data: any) => {
  try {
    const response = await otpCallPost(otpUrl, data);
    return response;
  } catch (error) {
    throw error
  }
}