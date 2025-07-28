import {
  getOTPInstance,
  getServiceCategory,
  getServiceListInstance,
  getSpecificService,
  SignInInstance,
  SignUpInstance,
} from './interceptors';
import { AxiosResponse } from 'axios';

export const callPostApi = async <T extends Record<string, any>>(
  url: string,
  data: T,
): Promise<any> => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const response: AxiosResponse = await SignInInstance.post(url, formData);
    return response.data;
  } catch (error: any) {
    console.error('callPostApi error:', error.response?.data);
    throw error;
  }
};

export const callPostRegApi = async <T extends Record<string, any>>(
  url: string,
  data: T,
): Promise<any> => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const response: AxiosResponse = await SignUpInstance.post(url, formData);
    return response.data;
  } catch (error: any) {
    // console.error('callPostApi error:', error.response?.data);
    throw error;
  }
};

export const callGetApi = async (url: string): Promise<any> => {
  try {
    const response: AxiosResponse = await getServiceCategory.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const callGetApiWithToken = async (url: string): Promise<any> => {
  try {
    const response: AxiosResponse = await getServiceListInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const callgetSpecificService = async (url: string): Promise<any> => {
  try {
    const response: AxiosResponse = await getSpecificService.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const otpCallPost = async <T extends Record<string, any>>(
  url: string,
  data: T,
): Promise<any> => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const response: AxiosResponse = await getOTPInstance.post(url, formData);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};