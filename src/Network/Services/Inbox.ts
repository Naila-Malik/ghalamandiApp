import Api from '../Api';
import {ApiResponseHandler} from '../ApiResponseHandler';
import {RECEIVE_MSG, SEND_MSG} from '../Urls';

export const sendMsgRequest = async <T>(
  internetCheck: boolean,
  param: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = SEND_MSG;
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

export const getUserChat = async <T>(
  internetCheck: boolean,
  id: number,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = `${RECEIVE_MSG}/${id}`;
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
