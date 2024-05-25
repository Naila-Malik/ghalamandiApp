import {StackScreenProps} from '@react-navigation/stack';
import {Dimensions, Platform, PixelRatio, StatusBar} from 'react-native';
// import moment from 'moment';
import {Routes} from './Routes';
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
export const webClientIdSingin =
  '373999268690-dlrkittko798tuqe0u89rl19csfhrtuc.apps.googleusercontent.com';

export const isAndroid = Platform.OS == 'android';

export const AppImages = {
  Auth: {
    EngFlag: require('../Ui/assets/images/Auth/EngFlag.png'),
    pkFlag: require('../Ui/assets/images/Auth/pkFlag.png'),
    Gicon: require('../Ui/assets/images/Auth/G.png'),
  },
  Common: {
    BackIcon: require('../Ui/assets/images/Common/backIcon.png'),
    tick: require('../Ui/assets/images/Common/tick.png'),
    LogoImage: require('../Ui/assets/images/Common/logo.png'),
    bannerImage: require('../Ui/assets/images/Common/bannerImage.png'),
    wheatGrain: require('../Ui/assets/images/Common/wheat-grains.png'),
    DownArrow: require('../Ui/assets/images/Common/DownArrow.png'),
    rightArrow: require('../Ui/assets/images/Common/rightArrow.png'),
    placeholderImg: require('../Ui/assets/images/Common/placeholder.jpg'),
    attachmentIcon: require('../Ui/assets/images/Common/attachmentIcon.png'),
    crossIcon: require('../Ui/assets/images/Common/cross.png'),
    SearchIcon: require('../Ui/assets/images/Common/SearchIcon.png'),
    BackgrounImage: require('../Ui/assets/images/Common/BackgrounImage.png'),
    menuIcon: require('../Ui/assets/images/Common/menuIcon.jpg'),
    phoneIcon: require('../Ui/assets/images/Common/phoneIcon.png'),
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
    location: require('../Ui/assets/images/ProductsCat/location.png'),
  },
  BottomTab: {
    PlusIcon: require('../Ui/assets/images/BottomTab/Plus.png'),
    CartIcon: require('../Ui/assets/images/BottomTab/cart.png'),
    History: require('../Ui/assets/images/BottomTab/History.png'),
  },
  Crop: {
    potato: require('../Ui/assets/images/Crops/Potato.png'),
    corn: require('../Ui/assets/images/Crops/corn.png'),
    paddy: require('../Ui/assets/images/Crops/paddy.png'),
    mustard: require('../Ui/assets/images/Crops/Mustard.png'),
    cotton: require('../Ui/assets/images/Crops/cotton.png'),
    sesamum: require('../Ui/assets/images/Crops/sesamum.png'),
    sorghum: require('../Ui/assets/images/Crops/sorghum.png'),
    wheat: require('../Ui/assets/images/Crops/wheat.png'),
  },
  Settings: {
    languageIcon: require('../Ui/assets/images/Settings/language.png'),
    AddressIcon: require('../Ui/assets/images/Settings/Address.png'),
    CityIcon: require('../Ui/assets/images/Settings/city.png'),
    LogoutIcon: require('../Ui/assets/images/Settings/Logout.png'),
    PersonIcon: require('../Ui/assets/images/Settings/person.png'),
    StaticsIcon: require('../Ui/assets/images/Settings/statics.png'),
    StatusIcon: require('../Ui/assets/images/Settings/status.png'),
    notifiIcon: require('../Ui/assets/images/Settings/notifi.png'),
  },
  MandiRates: {
    todaysRates: require('../Ui/assets/images/MandiRates/todaysRates.png'),
    feedMills: require('../Ui/assets/images/MandiRates/feedMills.png'),
    sugarMills: require('../Ui/assets/images/MandiRates/sugarMills.png'),
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
    grey: '#C1C1C1',
    greyLighter: '#F2F2F2',
    greyLighterLvl2: '#A19F9F',
    greyDark: '#706D6D',
  },
  green: {
    dark: '#419344',
  },
  red: {
    dark: '#F14436',
  },
  transparentColor: 'rgba(0,0,0,0.5)',
};

// export const convertUtcToLocal = (dateString: any) => {
//   let parsedDate = moment(new Date(dateString)).toDate();
//   return moment(parsedDate).local();
// };

// export const calculateWindowHeight = () => {
//   const windowHeight = Dimensions.get('window').height;
//   let statusHeight = StatusBar?.currentHeight ? StatusBar.currentHeight : 0;
//   let diff = Dimensions.get('screen').height - windowHeight;
//   const isPoco = Platform?.constants?.Brand?.toLowerCase() == 'poco';
//   const isRedmi = Platform?.constants?.Brand?.toLowerCase() == 'redmi';

//   if (diff <= 50 && !isPoco && !isRedmi) {
//     return windowHeight - (diff - statusHeight - 3);
//   }
//   return windowHeight;
// };

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
    nav: Routes.home.homePage,
    type: '',
  },
  {
    id: 2,
    title: 'All',
    icon: AppImages.ProductCate.allIcon,
    type: 'All',
  },
  {
    id: 3,
    title: 'Potato',
    icon: AppImages.ProductCate.potato,
    type: 'Potato',
  },
  {
    id: 4,
    title: 'Maize',
    icon: AppImages.ProductCate.maiz,
    type: 'Maize',
  },
  {
    id: 5,
    title: 'Paddy',
    icon: AppImages.ProductCate.paddy,
    type: 'Paddy',
  },
  {
    id: 6,
    title: 'Mustard',
    icon: AppImages.ProductCate.mustard,
    type: 'Mustard',
  },
  {
    id: 7,
    title: 'Cotton',
    icon: AppImages.ProductCate.cotton,
    type: 'Cotton',
  },
  {
    id: 8,
    title: 'Sesamum',
    icon: AppImages.ProductCate.sesamum,
    type: 'Sesamum',
  },
  {
    id: 9,
    title: 'Sorghum',
    icon: AppImages.ProductCate.sorghum,
    type: 'Sorghum',
  },
  {
    id: 10,
    title: 'Wheat',
    icon: AppImages.ProductCate.wheat,
    type: 'Wheat',
  },
];

export const AllProductsList = [
  {
    id: 1,
    name: 'Wheat',
    distance: '18.5 km',
    category: 'General',
    Qty: '10000 kg',
    price: 'RS 40000',
    img: AppImages.Common.wheatGrain,
  },
  {
    id: 2,
    name: 'Wheat',
    distance: '18.5 km',
    category: 'General',
    Qty: '10000 kg',
    price: 'RS 40000',
    img: AppImages.Common.wheatGrain,
  },
  {
    id: 3,
    name: 'Wheat',
    distance: '18.5 km',
    category: 'General',
    Qty: '10000 kg',
    price: 'RS 40000',
    img: AppImages.Common.wheatGrain,
  },
  {
    id: 4,
    name: 'Wheat',
    distance: '18.5 km',
    category: 'General',
    Qty: '10000 kg',
    price: 'RS 40000',
    img: AppImages.Common.wheatGrain,
  },
];
export const PotatosList = [
  {
    id: 1,
    name: 'Wheat',
    distance: '18.5 km',
    category: 'General',
    Qty: '10000 kg',
    price: 'RS 40000',
    img: AppImages.Crop.potato,
  },
  {
    id: 2,
    name: 'Wheat',
    distance: '18.5 km',
    category: 'General',
    Qty: '10000 kg',
    price: 'RS 40000',
    img: AppImages.Crop.potato,
  },
  {
    id: 3,
    name: 'Wheat',
    distance: '18.5 km',
    category: 'General',
    Qty: '10000 kg',
    price: 'RS 40000',
    img: AppImages.Crop.potato,
  },
  {
    id: 4,
    name: 'Wheat',
    distance: '18.5 km',
    category: 'General',
    Qty: '10000 kg',
    price: 'RS 40000',
    img: AppImages.Crop.potato,
  },
];
export const Crops = [
  {
    id: 1,
    title: 'Potato',
    icon: AppImages.Crop.potato,
  },
  {
    id: 2,
    title: 'Maize',
    icon: AppImages.Crop.corn,
  },
  {
    id: 3,
    title: 'Paddy',
    icon: AppImages.Crop.paddy,
  },
  {
    id: 4,
    title: 'Mustard',
    icon: AppImages.Crop.mustard,
  },
  {
    id: 5,
    title: 'Cotton',
    icon: AppImages.Crop.cotton,
  },
  {
    id: 6,
    title: 'Sesamum',
    icon: AppImages.Crop.sesamum,
  },
  {
    id: 7,
    title: 'Sorghum',
    icon: AppImages.Crop.sesamum,
  },
  {
    id: 8,
    title: 'Wheat',
    icon: AppImages.Crop.wheat,
  },
];
