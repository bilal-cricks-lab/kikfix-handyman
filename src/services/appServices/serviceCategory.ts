import { getApiUrl } from '../../config/env';
import { callGetApi, callGetApiWithToken, callGetServiceList, callgetSpecificService, saveBookingsPost } from '../network';

const ServiceCategory = getApiUrl('/api/get-category-list')
const saveUrl = getApiUrl('/api/save-booking')

export const getServiceCategory = async () => {
  try {
    const response = await callGetApi(ServiceCategory);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getServiceList = async (id: number) => {
  try {
    const ServiceSubCategory = getApiUrl(`/api/get-subcategory?id=${id}`)
    const response = await callGetApiWithToken(ServiceSubCategory);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificService = async (id: number) => {
  try {
    const ServiceList = getApiUrl(`/api/get-service?id=${id}`)
    const response = await callgetSpecificService(ServiceList);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const ServiceList = async (id: number) => {
  try {
    const ServiceList = getApiUrl(`/api/get-service-detail?id=${id}`)
    const response = await callGetServiceList(ServiceList);
    return response;
  } catch (error) {
    console.log(error)
  }
}

export const saveBookingsData = async (data: any) => {
  try {
    const response = await saveBookingsPost(saveUrl, data);
    return response;
  } catch (error) {
    throw error;
  }
};