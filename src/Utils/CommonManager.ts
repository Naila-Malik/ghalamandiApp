import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import {ScreenProps, isAndroid} from './AppConstants';
import {AppStrings, AsyncKeyStrings} from './Strings';
import {setAlertObj} from '../Redux/reducers/AppReducer';
import {SocialTypeStrings} from './AppEnums';
import {
  appleLoginRequest,
  facebookLoginRequest,
  getGoogleUserRequest,
} from './Social.d';
// import RNFS, { DownloadProgressCallbackResult } from 'react-native-fs';
// import Share from 'react-native-share';
// import { CameraRoll } from '@react-native-camera-roll/camera-roll';

export default class CommonDataManager {
  static shared: CommonDataManager;
  _currentLanguage = 'en';
  _screenStack: ScreenProps | null = null;
  selector: any = null;
  dispatch: any = null;
  containerDispatcher: any;
  _packageDetails: any;
  static getSharedInstance() {
    if (CommonDataManager.shared == null) {
      CommonDataManager.shared = new CommonDataManager();
    }
    return CommonDataManager.shared;
  }
  setContainerDispatcher = (dispatch: any) => {
    this.containerDispatcher = dispatch;
  };
  getContainerDispatcher = () => {
    return this.containerDispatcher;
  };

  setReduxReducer = (select: any, dispatch: any) => {
    this.selector = select;
    this.dispatch = dispatch;
  };

  isEmailValid = (email: string) => {
    if (!email) {
      return false;
    }
    let validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return validEmailRegex.test(email.trim());
  };
  isPasswordValid = (password: string) => {
    return password?.trim()?.length >= 8;
  };
  isValidUrl = (url: string) => {
    const regex =
      /^((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?|[a-zA-Z]:\\[^\\\/\s]+(\\[^\\\/\s]+)*)$/i;
    return regex.test(url);
  };
  validateUrl = (url: string) => {
    if (url && !url?.toLowerCase()?.includes('http')) {
      return `https://${url}`;
    }
    return url;
  };

  _setScreenStack = (props: ScreenProps) => {
    this._screenStack = props;
  };

  // logoutUser = async () => {
  //   await AsyncStorage.removeItem(AsyncKeyStrings.Auth.userToken);
  //   await AsyncStorage.removeItem(AsyncKeyStrings.Auth.userdata);
  //   this.dispatch(setUserData(null));
  //   this.dispatch(toggleDrawer(false));
  // };

  capitalizeFirstLetter = (str: any) => {
    if (!str) {
      return '';
    }
    let firstChar = str.charAt(0);
    return firstChar.toUpperCase() + str.slice(1);
  };
  resetToScreen = (navigation: any, screenName: string, params?: any) => {
    let routeData: any = {
      name: screenName,
    };
    if (params) {
      routeData.params = params;
    }
    navigation.reset({
      index: 0,
      routes: [routeData],
    });
  };
  getUserData = async () => {
    try {
      let user = await AsyncStorage.getItem(AsyncKeyStrings.Auth.userdata);
      if (user) {
        return JSON.parse(user);
      } else {
        return null;
      }
    } catch (e) {
      console.log('Error ', e);
      return null;
    }
  };
  saveUserData = async (data: any) => {
    try {
      await AsyncStorage.setItem(
        AsyncKeyStrings.Auth.userdata,
        JSON.stringify(data),
      );
    } catch (e) {
      console.log('Error storing userdata', e);
    }
  };
  getUserToken = async () => {
    try {
      let t = await AsyncStorage.getItem(AsyncKeyStrings.Auth.userToken);
      if (t) {
        return t;
      } else {
        return null;
      }
    } catch (e) {
      console.log('Error', e);
      return null;
    }
  };
  saveUserToken = async (token: string) => {
    try {
      await AsyncStorage.setItem(AsyncKeyStrings.Auth.userToken, token);
    } catch (e) {
      console.log('Error storing usertoken', e);
    }
  };

  getRefinedBearerToken = (rawToken: string) => {
    const startIndex = rawToken.indexOf('=');
    const endIndex = rawToken.indexOf(' ');
    return rawToken.substring(startIndex + 1, endIndex - 1);
  };

  // getUpdatedUser = async (internetCheck: boolean, teamId: string | null) => {
  //   const res: any = await getUpdatedUserRequest(internetCheck).finally(() =>
  //     this.dispatch(setFetchUpdatedUser(null)),
  //   );
  //   if (res.success) {
  //     await this.saveUserData(res.data);
  //     this.dispatch(setUserData(res.data));
  //   } else {
  //     console.log('Error fetching user ', res?.message);
  //   }
  // };

  redirectToUrl = async (url: string) => {
    try {
      await Linking.openURL(this.validateUrl(url));
    } catch (e) {
      console.log('Something wrong ', e);
    }
  };

  hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  // saveToCameraRoll = async (uri: string, type: 'photo' | 'video') => {
  //   if (Platform.OS === 'android' && !(await this.hasAndroidPermission())) {
  //     console.log('No writing permission');
  //     return;
  //   }
  //   CameraRoll.save(uri, { type: type, album: 'ClassConnect' }).then(() => {
  //     ToastAndroid.show('File successfully saved to gallery', 2000)
  //   });
  // };
}
