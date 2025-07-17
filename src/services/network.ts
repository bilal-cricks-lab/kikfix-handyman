import { SignInInstance } from './interceptors';
import { AxiosResponse } from 'axios';

export const callPostApi = async <T extends Record<string, any>>(url: string, data: T): Promise<any> => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const response: AxiosResponse = await SignInInstance.post(url, formData);
    return response.data;
  } catch (error: any) {
    console.error('callPostApi error:', error.response?.data || error.message);
    throw error;
  }
};
