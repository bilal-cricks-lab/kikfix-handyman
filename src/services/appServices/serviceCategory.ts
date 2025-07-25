import { callGetApi, callGetApiWithToken, callgetSpecificService } from '../network';

export const getServiceCategory = async (url: string) => {
  try {
    const response = await callGetApi(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getServiceList = async (url: string) => {
  try {
    const response = await callGetApiWithToken(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificService = async (url: string) => {
  try {
    const response = await callgetSpecificService(url);
    return response;
  } catch (error) {
    console.log(error);
  }
}