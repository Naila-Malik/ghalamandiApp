import {StackScreenProps} from '@react-navigation/stack';
import {Dimensions, Platform, PixelRatio, StatusBar} from 'react-native';
import moment from 'moment';
export const platformVersion = Platform.Version;
export type ScreenProps = StackScreenProps<any, any>;
export const ScreenSize = Dimensions.get('screen');
const templateWidth = 375;
const templateHeight = 812;
const widthRatio = ScreenSize.width / templateWidth;
const heightRatio = ScreenSize.height / templateHeight;
export const normalized = (value: number) =>
  PixelRatio.roundToNearestPixel(value * widthRatio);
export const hv = (value: number) =>
  PixelRatio.roundToNearestPixel(value * heightRatio);
export const horizontalScreenWithMargin = ScreenSize.width - normalized(48);
export const formFieldsHeight =
  Platform.OS == 'android' ? normalized(45) : normalized(50);
export const isSmallDevice = ScreenSize.height < 700 ? true : false;
export const maxDescriptionLength = 60;
export const maxImageSizeInBytes = 10 * 1024 * 1024; // 10MB

export const isAndroid = Platform.OS == 'android';

export const AppImages = {
  Auth: {
    // LogoImage: require('../Ui/assets/images/Auth/Logo.png'),
  },
  Common: {
    BackIcon: require('../Ui/assets/images/Common/backIcon.png'),
  },
  Messages: {
    // ArchivedIcon: require('../Ui/assets/images/Messages/ArchiveBox.png'),
    // SendMsgIcon: require('../Ui/assets/images/Messages/Send.png'),
  },
  Settings: {
    // CameraIcon: require('../Ui/assets/images/Settings/Camera.png'),
    // LinkIcon: require('../Ui/assets/images/Settings/Link.png'),
  },
};

export const AppFonts = {
  Synonyms: {
    Regular: 'Synonym-Regular',
    Medium: 'Synonym-Medium',
    SemiBold: 'Synonym-Semibold',
    Bold: 'Synonym-Bold',
    Light: 'Synonym-Light',
    ExtraLight: 'Synonym-Extralight',
  },
  Pally: {
    Regular: 'Pally-Regular',
    Medium: 'Pally-Medium',
    Bold: 'Pally-Bold',
  },
  Sans: {
    Light: 'UnitedSansReg-Light',
    Medium: 'UnitedSansReg-Medium',
    Black: 'UnitedSansReg-Black',
    Bold: 'UnitedSansReg-Bold',
    Heavy: 'UnitedSansReg-Heavy',
  },
};

export const AppColors = {
  dark: {},
  white: {
    white: '#ffffff',
    whiteOp: '#E8E8E8',
  },
  black: {
    black: '#1E293B',
    lighter: '#475569',
    deepBlack: '#000000',
  },
  grey: {
    grey: '#6B7280',
    greyLight: '#E5E7EB',
    lighter: '#F1F5F9',
    lighterLvl2: '#94A3B8',
    borderGrey: '#E2E8F0',
    grey_dim: '#F6F7FB',
    gre_dimLvl2: '#64748B',
    greyLightest: '#F8FAFC',
    otpGrey: '#4B5563',
    dotGrey: '#9CA3AF',
  },
};

export const convertUtcToLocal = (dateString: any) => {
  let parsedDate = moment(new Date(dateString)).toDate();
  return moment(parsedDate).local();
};

export const calculateWindowHeight = () => {
  const windowHeight = Dimensions.get('window').height;
  let statusHeight = StatusBar?.currentHeight ? StatusBar.currentHeight : 0;
  let diff = Dimensions.get('screen').height - windowHeight;
  const isPoco = Platform?.constants?.Brand?.toLowerCase() == 'poco';
  const isRedmi = Platform?.constants?.Brand?.toLowerCase() == 'redmi';

  if (diff <= 50 && !isPoco && !isRedmi) {
    return windowHeight - (diff - statusHeight - 3);
  }
  return windowHeight;
};

export const isYouTubeVideo = (url: string) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
  return youtubeRegex.test(url);
};
