export const BASE_URL = 'https://eghalamandi.anchorstech.net/api/';

// Home-------> wheatherApi
export const WHEATER_API_URL = BASE_URL + 'get-weather';
// 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=c222fbaf293e84d5e57e54c65ca3a662';

//  Home Urls
export const LOGIN_URL = BASE_URL + 'login-user';
export const SIGNUP_URL = BASE_URL + 'save-user';

// Sale Purchase
export const GET_ALL_CROP = BASE_URL + 'user/crop-categories';
export const GET_ALL_PRO = BASE_URL + 'user/all-sale-purcahse/get';
export const GET_PRO_BY_CROP_ID = BASE_URL + 'user/sale-purcahse/get/crop-id';
export const GET_CROP_TYPE_DD = BASE_URL + 'user/get-crop-type';
export const ADD_PROD_STORE = BASE_URL + 'user/sale-purcahse/store';
export const GET_MY_DEALS = BASE_URL + 'user/my-deals';
export const GET_USER_DEALS = BASE_URL + 'user/bid-deals';
export const ADD_CROP = BASE_URL + 'user/place-bid';

//Timeline Urls
export const GET_All_TIMELINES = BASE_URL + 'user/timeline-get';
export const POST_TIMELINE = BASE_URL + 'user/timeline-post';
export const Like_TIMELINE = BASE_URL + 'user/like-post';
export const GET_COMMENTS = BASE_URL + 'user/see-post-comment/';
export const POST_COMMENTS = BASE_URL + 'user/comment-post';

//Mandi rates
export const RATES_BY_CROP = BASE_URL + 'user/all-mandi-rates';
export const FEED_MILL_RATE = BASE_URL + 'user/feed-mills-rates';
export const SUGAR_MILL_RATE = BASE_URL + 'user/sugar-mills-rates';
export const CITY_RATE = BASE_URL + 'user/mandi-rates/city/';
export const ADD_NEW_RATE = BASE_URL + 'user/store-mandi-rates';

//Commission shops
export const GET_ALL_CSHOPS = BASE_URL + 'user/all-shops';
export const GET_CSHOP_DETAIL = BASE_URL + 'user/get-shop';

//My Shops
export const CREATE_MY_SHOP = BASE_URL + 'user/create-shop';

//list of cities
export const CITIES_LIST = BASE_URL + 'user/all-cities';

//Edit profile
export const EDIT_PROFILE = BASE_URL + 'user/update-profile';

//signout
export const SIGNOUT = BASE_URL + 'user/logout';
