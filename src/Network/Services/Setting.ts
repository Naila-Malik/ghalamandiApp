import Api from '../Api';
import {ApiResponseHandler} from '../ApiResponseHandler';
import {EDIT_PROFILE, SIGNOUT} from '../Urls';

export const logoutRequest = async <T>(
  internetCheck: boolean,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = SIGNOUT;
  const method = 'POST';
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

export const profileEditRequest = async <T>(
  internetCheck: boolean,
  param: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = EDIT_PROFILE;
  const method = 'POST';
  const sendToken = true;
  let apiRequest = await Api(
    internetCheck,
    urlForApiCall,
    method,
    sendToken,
    param,
  );
  return apiRequest;
};
