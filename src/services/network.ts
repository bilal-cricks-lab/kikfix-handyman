import {
  getOTPInstance,
  locationServices,
  saveBookingsInstance,
  auth_Instance,
  otp_Instance,
  service_Instance,
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

    const response: AxiosResponse = await auth_Instance.post(url, formData);
    return response.data;
  } catch (error: any) {
    console.error('callPostApi error:', error.response?.data);
    throw error;
  }
};


export const callGetApiWithToken = async (url: string): Promise<any> => {
  try {
    const response: AxiosResponse = await service_Instance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const otpCallPost = async <T extends Record<string, any>>(
  url: string,
  data: T,
): Promise<any> => {
  try {
    const response: AxiosResponse = await otp_Instance.post(url, data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const saveBookingsPost = async <T extends Record<string, any>>(
  url: string,
  data: T,
): Promise<any> => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const response: AxiosResponse = await saveBookingsInstance.post(url, formData);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getLocationServices = async(url: string): Promise<any>=> {
   try {
    const response: AxiosResponse = await locationServices.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}