import { callPostApi, callPostRegApi } from '../network';

const url = 'https://kikfix-com.stackstaging.com/api/login';
const regUrl = 'https://kikfix-com.stackstaging.com/api/register'

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
    console.log(error)
  }
}