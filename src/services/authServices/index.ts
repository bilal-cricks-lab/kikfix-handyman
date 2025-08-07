import { callPostApi, otpCallPost} from '../network';
import { getApiUrl } from '../../config/env';

const url = getApiUrl('/api/login');
const regUrl = getApiUrl('/api/register');
const otpUrl = getApiUrl('/api/send-otp');
const CodeVerify = getApiUrl('/api/verify-otp')
const passwordReset = getApiUrl('/api/password-send-otp');
const passwordVerify = getApiUrl('/api/password-verify-otp')
const passwordCreation = getApiUrl('/api/password-reset')

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
    const response = await callPostApi(regUrl, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export const OTPSend = async (data: any) => {
  try {
    const response = await otpCallPost(otpUrl, data);
    return response;
  } catch (error) {
    throw error
  }
}

export const OTPVerify = async (data: any) => {
  try {
    const response = await otpCallPost(CodeVerify, data);
    console.log(data, url);
    return response;
  } catch (error) {
    throw error
  }
}

export const password_reset = async (data: any) => {
  try {
    const response = await otpCallPost(passwordReset, data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const verify_otp_password = async (data: any) => {
  try {
    const response = await otpCallPost(passwordVerify, data)
    return response;
  } catch (error) {
    console.log(error)
  }
}

export const create_password = async (data: any) => {
  try {
    const response = await otpCallPost(passwordCreation, data);
    return response;
  } catch (error) {
    console.log(error);
  }
}