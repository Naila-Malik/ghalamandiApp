import Api from '../Api';
import {ApiResponseHandler} from '../ApiResponseHandler';
import {
  ADD_NEW_RATE,
  CITIES_LIST,
  CITY_RATE,
  FEED_MILL_RATE,
  RATES_BY_CROP,
  SUGAR_MILL_RATE,
} from '../Urls';

export const getCropRate = async <T>(
  internetCheck: boolean,
  body: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = `${RATES_BY_CROP}?crop_id=${body}`;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    body,
  );
  return apiRequest;
};

export const getCitiesList = async <T>(): // internetCheck: true,
Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = CITIES_LIST;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(true, urlForApiCall, method, sendToken);
  return apiRequest;
};

export const getFeedMillRates = async <T>(
  internetCheck: boolean,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = FEED_MILL_RATE;
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

export const getSUgarMillRates = async <T>(
  internetCheck: boolean,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = SUGAR_MILL_RATE;
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

export const getCityRate = async <T>(
  internetCheck: boolean,
  body: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = `${CITY_RATE}?id=${body}`;
  const method = 'GET';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    body,
  );
  return apiRequest;
};

export const addNewRateCityWise = async <T>(
  internetCheck: boolean,
  params: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = ADD_NEW_RATE;
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
