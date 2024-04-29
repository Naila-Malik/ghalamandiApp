import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Routes} from '../Utils/Routes';
import {AppImages, ScreenProps, hv, normalized} from '../Utils/AppConstants';
import {Image, View} from 'react-native';
import {useSelector} from 'react-redux';
import {AppRootStore} from '../Redux/store/AppStore';
import SalePurchaseScreen from '../Ui/Sections/SalePurchase/SalePurchaseScreen';
import MandiRatesScreen from '../Ui/Sections/MandiRates/MandiRatesScreen';
import CommissionShopsScreen from '../Ui/Sections/CommissionShops/CommissionShopsScreen';
import MyShopScreen from '../Ui/Sections/MyShop/MyShopScreen';
import InboxScreen from '../Ui/Sections/Inbox/InboxScreen';
import TimeLineScreen from '../Ui/Sections/TimeLine/TimeLineScreen';
import NotificationsScreen from '../Ui/Sections/Notifications/NotificationsScreen';
import SettingsScreen from '../Ui/Sections/Settings/SettingsScreen';
import SupportScreen from '../Ui/Sections/Support/SupportScreen';
import PremiumServicesScreen from '../Ui/Sections/PremiumService/PremiumServicesScreen';
import AboutUsScreen from '../Ui/Sections/AboutUs/AboutUsScreen';
import AddBidScreen from '../Ui/Sections/SalePurchase/AddBidScreen';
import DealsHistory from '../Ui/Sections/SalePurchase/DealsHistory';
import NewBid from '../Ui/Sections/SalePurchase/NewBid';

const Stack = createStackNavigator();

const HomePageNavigation = (props: ScreenProps) => {
  const {mainMenuId} = useSelector((state: AppRootStore) => state.AppReducer);
  const getCurrentStack = () => {
    if (mainMenuId == 1) {
      return <SalePurchaseStack />;
    } else if (mainMenuId == 2) {
      return <MandiRatesStack />;
    } else if (mainMenuId == 3) {
      return <CommissionShopsStack />;
    } else if (mainMenuId == 4) {
      return <MyShopsStack />;
    } else if (mainMenuId == 5) {
      return <InboxStack />;
    } else if (mainMenuId == 6) {
      return <TimeLineStack />;
    } else if (mainMenuId == 7) {
      return <NotificationsStack />;
    } else if (mainMenuId == 8) {
      return <SettingsStack />;
    } else if (mainMenuId == 9) {
      return <SupportStack />;
    } else if (mainMenuId == 10) {
      return <PremiumServiceStack />;
    } else if (mainMenuId == 11) {
      return <AboutUsStack />;
    } else {
      return null;
    }
  };
  return <View style={{flex: 1}}>{getCurrentStack()}</View>;
};
export default HomePageNavigation;

const SalePurchaseStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.Products.SalePurchase}
        component={SalePurchaseScreen}
      />
      <Stack.Screen name={Routes.Products.addBid} component={AddBidScreen} />
      <Stack.Screen name={Routes.Products.newCrop} component={NewBid} />
      <Stack.Screen
        name={Routes.Products.dealsHistory}
        component={DealsHistory}
      />
    </Stack.Navigator>
  );
};
const MandiRatesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.MandiRates.MandiRatesHome}
        component={MandiRatesScreen}
      />
    </Stack.Navigator>
  );
};
const CommissionShopsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.CShop.CShopHome}
        component={CommissionShopsScreen}
      />
    </Stack.Navigator>
  );
};
const MyShopsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Routes.MyShop.MyShopHome} component={MyShopScreen} />
    </Stack.Navigator>
  );
};
const InboxStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Routes.Inbox.InboxHome} component={InboxScreen} />
    </Stack.Navigator>
  );
};
const TimeLineStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.Timeline.TimelineHome}
        component={TimeLineScreen}
      />
    </Stack.Navigator>
  );
};
const NotificationsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.Notification.NotificationHome}
        component={NotificationsScreen}
      />
    </Stack.Navigator>
  );
};
const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.Settings.SettingHome}
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
};
const SupportStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.Support.SupportHome}
        component={SupportScreen}
      />
    </Stack.Navigator>
  );
};
const PremiumServiceStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.PremiumService.PServicesHome}
        component={PremiumServicesScreen}
      />
    </Stack.Navigator>
  );
};
const AboutUsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Routes.AboutUs.AboutUsHome}
        component={AboutUsScreen}
      />
    </Stack.Navigator>
  );
};