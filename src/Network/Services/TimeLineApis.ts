import Api from '../Api';
import {ApiResponseHandler} from '../ApiResponseHandler';
import {
  GET_All_TIMELINES,
  GET_COMMENTS,
  Like_TIMELINE,
  POST_COMMENTS,
  POST_TIMELINE,
} from '../Urls';

export const getAllTimelines = async <T>(
  internetCheck: boolean,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = GET_All_TIMELINES;
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

export const postTimelineRequest = async <T>(
  internetCheck: boolean,
  params: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = POST_TIMELINE;
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

export const LikeTimeline = async <T>(
  internetCheck: boolean,
  params: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = Like_TIMELINE;
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

export const getComments = async <T>(
  internetCheck: boolean,
  body: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = `${GET_COMMENTS}?post_id=${body}`;
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

export const postNewComment = async <T>(
  internetCheck: boolean,
  params: any,
): Promise<ApiResponseHandler<T>> => {
  const urlForApiCall = POST_COMMENTS;
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
