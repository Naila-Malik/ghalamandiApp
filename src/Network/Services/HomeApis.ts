import Api from '../Api';
import {ApiResponseHandler} from '../ApiResponseHandler';
import {
  ADD_PROD_STORE,
  GET_ALL_CROP,
  GET_ALL_PRO,
  GET_CROP_TYPE_DD,
  GET_MY_DEALS,
  GET_PRO_BY_CROP_ID,
  GET_USER_DEALS,
  LOGIN_URL,
  WHEATER_API_URL,
} from '../Urls';

export const loginRequest = async <T>(
  internetCheck: boolean,
  params: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = LOGIN_URL;
  const method = 'POST';
  const sendToken = false;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    params,
  );
  return apiRequest;
};

export const getWheatherReq = async <T>(
  internetCheck: boolean,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = WHEATER_API_URL;
  const method = 'GET';
  const sendToken = false;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    {},
  );
  return apiRequest;
};
export const getAllCrops = async <T>(
  internetCheck: boolean,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = GET_ALL_CROP;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    {},
  );
  return apiRequest;
};

export const getAllPro = async <T>(
  internetCheck: boolean,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = GET_ALL_PRO;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    {},
  );
  return apiRequest;
};

export const getProByCrop = async <T>(
  internetCheck: boolean,
  id: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = `${GET_PRO_BY_CROP_ID}/${id}`;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    {},
  );
  return apiRequest;
};

export const getCropTypeDD = async <T>(
  internetCheck: boolean,
  id: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = `${GET_CROP_TYPE_DD}/${id}`;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    {},
  );
  return apiRequest;
};

export const addStoreRequest = async <T>(
  internetCheck: boolean,
  params: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = ADD_PROD_STORE;
  const method = 'POST';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    params,
  );
  return apiRequest;
};

export const getMyDeals = async <T>(
  internetCheck: boolean,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = GET_MY_DEALS;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    {},
  );
  return apiRequest;
};

export const getUserDeals = async <T>(
  internetCheck: boolean,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = GET_USER_DEALS;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    {},
  );
  return apiRequest;
};
