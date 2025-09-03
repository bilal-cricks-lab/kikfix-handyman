import { getApiUrl } from '../../config/env';
import {
  callGetApiWithToken,
  callPostApi,
  getLocationServices,
  saveBookingsPost,
  send_post_message,
} from '../network';

const fixer_dashboard = getApiUrl('/api/fixer-dashboard');
const save_url = getApiUrl('/api/save-booking');
const dashboard_url = getApiUrl('/api/customer-dashboard');
const fixer_accept_job = getApiUrl('/api/fixer-accept-job');
const fixer_counter_offer = getApiUrl('/api/counter-offer');
const get_all_chats = getApiUrl('/api/get-all-chats');
const send_messages_url = getApiUrl('/api/send-message');
const fixer_complete_url = getApiUrl(`/api/job-complete-fixer`);


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

export const service_booking = async () => {
  const service_history = getApiUrl(`/api/get-booking-history`);
  try {
    const response = await callGetApiWithToken(service_history);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fixer_accept = async (data: any) => {
  try {
    const response = await callPostApi(fixer_accept_job, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fixer_counter = async (data: any) => {
  try {
    const response = await callPostApi(fixer_counter_offer, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const get_single_booking = async (id: number | string) => {
  const get_single_booking_id = getApiUrl(`/api/get-single-booking?id=${id}`);
  try {
    const response = await callGetApiWithToken(get_single_booking_id);
    return response;
  } catch (error) {
    throw error;
  }
}

export const get_all_chat = async () => {
  try {
    const response = await callGetApiWithToken(get_all_chats);
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_single_chat = async (id: number | string) => {
  const get_single_chat_url = getApiUrl(`/api/get-single-chat/${id}`);
  try {
    const response = await callGetApiWithToken(get_single_chat_url);
    return response;
  } catch (error) {
    throw error;
  }
};

export const send_message = async (data: any) => {
  try {
    const response = await send_post_message(send_messages_url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const job_complete_fixer = async (data: any) => {
  try {
    const response = await callPostApi(fixer_complete_url, data);
    return response;
  } catch (error) {
    console.log(error);
  }
}