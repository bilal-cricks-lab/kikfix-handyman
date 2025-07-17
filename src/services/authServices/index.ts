import { callPostApi } from '../network';

const url = 'https://kikfix-com.stackstaging.com/api/login';

export const Login = async (data: any) => {
  try {
    const response = await callPostApi(url, data);
    console.log(response)
    return response;
  } catch (error) {
    throw error;
  }
};
