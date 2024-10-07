import Api from '../Api';
import {ApiResponseHandler} from '../ApiResponseHandler';
import {CREATE_MY_SHOP, GET_ALL_CSHOPS, GET_CSHOP_DETAIL} from '../Urls';

export const getAllCShops = async <T>(
  internetCheck: boolean,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = GET_ALL_CSHOPS;
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

export const MyNewShopRequest = async <T>(
  internetCheck: boolean,
  params: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = CREATE_MY_SHOP;
  console.log('urlForApiCall---------------');
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

export const getCShopDetail = async <T>(
  internetCheck: boolean,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = GET_CSHOP_DETAIL;
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
