import { getApiUrl } from '../../config/env';
import {
  callGetApiWithToken,
  getLocationServices,
  saveBookingsPost,
} from '../network';

const fixer_dashboard = getApiUrl('/api/fixer-dashboard');
const save_url = getApiUrl('/api/save-booking');
const dashboard_url = getApiUrl('/api/customer-dashboard');

export const fixer_dashboard_information = async () => {
  try {
    const response = await callGetApiWithToken(fixer_dashboard);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getServiceList = async (id: number) => {
  try {
    const ServiceSubCategory = getApiUrl(`/api/get-subcategory?id=${id}`);
    const response = await callGetApiWithToken(ServiceSubCategory);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificService = async (id: number) => {
  try {
    const ServiceList = getApiUrl(`/api/get-service?id=${id}`);
    const response = await callGetApiWithToken(ServiceList);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const ServiceList = async (id: number) => {
  try {
    const ServiceList = getApiUrl(`/api/get-service-detail?id=${id}`);
    const response = await callGetApiWithToken(ServiceList);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const saveBookingsData = async (data: any) => {
  try {
    const response = await saveBookingsPost(save_url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const locationLatLong = async (
  latitude: number | string,
  longitude: number | string,
  service_id: number | string,
  sort_by: any,
) => {
  try {
    const service_list = getApiUrl(
      `/api/get-fixer-list?latitude=${latitude}&longitude=${longitude}&service_id=${service_id}&sort_by=${sort_by}`,
    );
    const response = await getLocationServices(service_list);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const dashboard_data = async () => {
  try {
    const response = await callGetApiWithToken(dashboard_url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const service_booking = async (
) => {
  const service_history = getApiUrl(
    `/api/get-booking-history`,
  );
  try {
    const response = await callGetApiWithToken(service_history);
    return response;
  } catch (error) {
    console.log(error);
  }
};
