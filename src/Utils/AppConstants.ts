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
    EngFlag: require('../Ui/assets/images/Auth/EngFlag.png'),
    pkFlag: require('../Ui/assets/images/Auth/pkFlag.png'),
  },
  Common: {
    BackIcon: require('../Ui/assets/images/Common/backIcon.png'),
    tick: require('../Ui/assets/images/Common/tick.png'),
    LogoImage: require('../Ui/assets/images/Common/logo.png'),
    bannerImage: require('../Ui/assets/images/Common/bannerImage.png'),
  },
  Home: {
    windIcon: require('../Ui/assets/images/Home/wind.png'),
    weatherImg: require('../Ui/assets/images/Home/weatherImg.png'),
    humidityIcon: require('../Ui/assets/images/Home/humidity.png'),
    rainIcon: require('../Ui/assets/images/Home/rain.png'),
    cloudIcon: require('../Ui/assets/images/Home/cloud.png'),
    salePurIcon: require('../Ui/assets/images/Home/salePur.png'),
    ratesIcon: require('../Ui/assets/images/Home/rates.png'),
    shopsIcon: require('../Ui/assets/images/Home/shops.png'),
    inboxIcon: require('../Ui/assets/images/Home/inbox.png'),
    timeLineIcon: require('../Ui/assets/images/Home/timeLine.png'),
    bellIcon: require('../Ui/assets/images/Home/bell.png'),
    whatsApp: require('../Ui/assets/images/Home/whatsApp.png'),
    support: require('../Ui/assets/images/Home/support.png'),
    settings: require('../Ui/assets/images/Home/settings.png'),
    aboutUs: require('../Ui/assets/images/Home/aboutUs.png'),
    commission: require('../Ui/assets/images/Home/commision.png'),
  },
  ProductCate: {
    allIcon: require('../Ui/assets/images/ProductsCat/All.png'),
    cotton: require('../Ui/assets/images/ProductsCat/cotton.png'),
    maiz: require('../Ui/assets/images/ProductsCat/Maiz.png'),
    mustard: require('../Ui/assets/images/ProductsCat/mustard.png'),
    paddy: require('../Ui/assets/images/ProductsCat/paddy.png'),
    potato: require('../Ui/assets/images/ProductsCat/potato.png'),
    sesamum: require('../Ui/assets/images/ProductsCat/sesamum.png'),
    sorghum: require('../Ui/assets/images/ProductsCat/Sorghum.png'),
    wheat: require('../Ui/assets/images/ProductsCat/wheat.png'),
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
  bgColor: '#F1F5F6',
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
  green: {
    dark: '#419344',
  },
  red: {
    dark: '#F14436',
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

export const weatherArray = [
  {
    id: 1,
    label: '151.1kph',
    title: 'Wind',
    icon: AppImages.Home.windIcon,
  },
  {
    id: 2,
    label: '80%',
    title: 'Humidity',
    icon: AppImages.Home.humidityIcon,
  },
  {
    id: 3,
    label: '0.002mm',
    title: 'Rain',
    icon: AppImages.Home.rainIcon,
  },
  {
    id: 4,
    label: '80%',
    title: 'Cloud',
    icon: AppImages.Home.cloudIcon,
  },
];

export const homeMenuArray = [
  {
    id: 1,
    label: 'Sale Purchase',
    icon: AppImages.Home.salePurIcon,
  },
  {
    id: 2,
    label: 'Mandi Rates',
    icon: AppImages.Home.ratesIcon,
  },
  {
    id: 3,
    label: 'Commission Shops',
    icon: AppImages.Home.commission,
  },
  {
    id: 4,
    label: 'My Shop',
    icon: AppImages.Home.shopsIcon,
  },
  {
    id: 5,
    label: 'Inbox',
    icon: AppImages.Home.inboxIcon,
  },
  {
    id: 6,
    label: 'Timeline',
    icon: AppImages.Home.timeLineIcon,
  },
  {
    id: 7,
    label: 'Notifications',
    icon: AppImages.Home.bellIcon,
  },
  {
    id: 8,
    label: 'settings',
    icon: AppImages.Home.settings,
  },
  {
    id: 9,
    label: 'Support',
    icon: AppImages.Home.support,
  },
  {
    id: 10,
    label: 'Premium Services ',
    icon: AppImages.Home.whatsApp,
  },
  {
    id: 11,
    label: 'About Us ',
    icon: AppImages.Home.aboutUs,
  },
];

export const productsCate = [
  {
    id: 1,
    title: 'Back',
    icon: AppImages.Common.BackIcon,
  },
  {
    id: 2,
    title: 'All',
    icon: AppImages.ProductCate.allIcon,
  },
  {
    id: 3,
    title: 'Potato',
    icon: AppImages.ProductCate.potato,
  },
  {
    id: 4,
    title: 'Maize',
    icon: AppImages.ProductCate.maiz,
  },
  {
    id: 5,
    title: 'Paddy',
    icon: AppImages.ProductCate.paddy,
  },
  {
    id: 6,
    title: 'Mustard',
    icon: AppImages.ProductCate.mustard,
  },
  {
    id: 7,
    title: 'Cotton',
    icon: AppImages.ProductCate.cotton,
  },
  {
    id: 8,
    title: 'Sesamum',
    icon: AppImages.ProductCate.sesamum,
  },
  {
    id: 9,
    title: 'Sorghum',
    icon: AppImages.ProductCate.sorghum,
  },
  {
    id: 10,
    title: 'Wheat',
    icon: AppImages.ProductCate.wheat,
  },
];
