import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppColors, AppImages, normalized} from './AppConstants';
import {Platform} from 'react-native';
import {Routes} from './Routes';
// import {store} from '../redux/store/AppStore';
import {setLoader} from '../Redux/reducers/AppReducer';
import {FileExtensions} from './AppTypes';
import {format} from 'date-fns';
import {enUS} from 'date-fns/locale';
import {getCitiesList} from '../Network/Services/MandiRates';

export const capitalizeFirstLetter = (txt = '') => {
  if (txt?.length > 0) {
    const arr = txt.split(' ');
    return arr.length == 0
      ? '-'
      : arr.length == 1
      ? txt.charAt(0).toUpperCase()
      : arr[0].charAt(0).toUpperCase() + arr[1].charAt(0).toUpperCase();
  } else {
    return '';
  }
};

/////// Registration of device for  Notifications

// export const deviceRegistration = async (
//   userId: any,
//   isNetConnected: boolean,
// ) => {
//   try {
//     const fcmToken = await messaging().getToken();
//     const uniqueId = await DeviceInfo.getUniqueId();
//     let body = {
//       device_uuid: uniqueId,
//       device_push_token: fcmToken,
//       device_type: Platform.OS == 'ios' ? 'ios' : 'android',
//       user_id: userId,
//       os_version: '16S.jkhds',
//     };
//     await RegistrationRequest(isNetConnected, body);
//   } catch (e) {
//     console.log('error in device registration ', e);
//   }
// };

// export const logoutFunc = async () => {
//   try {
//     store.dispatch(setLoader(true));
//     // store.dispatch(logOut('logout'));
//     // store.dispatch(setProductInCart([]));
//     store.dispatch(setLoader(false));
//   } catch (e) {
//     console.log('Eror ', e);
//   } finally {
//     store.dispatch(setLoader(false));
//   }
// };

export const getResponiveFontSize = (str: string) => {
  if (!str) {
    return normalized(12);
  }

  return str.length > 45
    ? normalized(10)
    : str.length > 40
    ? normalized(12)
    : str.length < 35
    ? normalized(12)
    : normalized(12);
};

export function getFileExtension(fileName: string | null): string | null {
  if (fileName === null) return null;
  const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
  return extension;
}

export const getFileIcon = (extension: string | null): any => {
  if (extension === FileExtensions.Pdf) return 'file-pdf';
  if (
    extension === FileExtensions.Jpeg ||
    extension === FileExtensions.Jpg ||
    extension === FileExtensions.Png ||
    extension === FileExtensions.Webp
  )
    return 'file-image';
  if (extension === FileExtensions.Doc || extension === FileExtensions.Docx)
    return 'file-word';

  return 'file';
};

export const formateDate = (date: Date | string): string => {
  const apiDate = new Date(date);
  const formattedDate = format(apiDate, 'MMMM d, yyyy', {locale: enUS});
  return formattedDate;
};

export const formatTime = (date: Date | string): string => {
  const apiDate = new Date(date);
  const formattedTime = format(apiDate, 'hh:mm a'); // 'hh:mm a' for 12-hour format
  return formattedTime;
};

export const CitiesList = async () => {
  try {
    let response: any = await getCitiesList();
    if (response?.success) {
      let result = response?.data;
      return result;
    }
  } catch (e) {
    console.log('error------> ', e);
  }
  return null;
};

/////////////
