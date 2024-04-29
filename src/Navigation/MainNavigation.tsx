import React, {useEffect, useLayoutEffect} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStore} from '../Redux/store/AppStore';
import {NavigationContainer} from '@react-navigation/native';
import {Routes} from '../Utils/Routes';
import SafeArea from 'react-native-safe-area';
import SplashScreen from 'react-native-splash-screen';
import {
  setIsNotchDevice,
  setSafeArea,
  setUserData,
} from '../Redux/reducers/AppReducer';
import CommonDataManager from '../Utils/CommonManager';
import {navigationRef} from './RootNavigation';
import HomePage from '../Ui/Sections/Home/HomePage';
import HomePageNavigation from './HomePageNavigation';
import AuthStack from './AuthNavigation';

const MainStack = createStackNavigator();
const AppStack = () => {
  return (
    <MainStack.Navigator
      initialRouteName={Routes.home.homePage}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}>
      <MainStack.Screen name={Routes.home.homePage} component={HomePage} />
      <MainStack.Screen
        name={Routes.home.homePageNavigation}
        component={HomePageNavigation}
      />
    </MainStack.Navigator>
  );
};
const AppContainer = () => {
  const selector = useSelector((AppState: AppRootStore) => AppState);
  const {safeArea, userData} = selector.AppReducer;
  const dispatch = useDispatch();

  useEffect(() => {
    // getUserDetails();
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  const getUserDetails = async () => {
    try {
      let userDetails =
        await CommonDataManager.getSharedInstance().getUserData();
      dispatch(setUserData(userDetails));
    } catch (e) {
      console.log('Error getting user ', e);
    } finally {
      setTimeout(() => {
        SplashScreen.hide();
      }, 500);
    }
  };

  useLayoutEffect(() => {
    SafeArea.getSafeAreaInsetsForRootView().then(result => {
      if (safeArea.top != result.safeAreaInsets.top) {
        dispatch(
          setSafeArea({
            top: result.safeAreaInsets.top,
            bottom: result.safeAreaInsets.bottom,
          }),
        );
        if (result.safeAreaInsets.top > 30) {
          dispatch(setIsNotchDevice(true));
        }
      }
    });
  }, [selector.AppReducer]);

  console.log('user data--------------', userData);
  return (
    <NavigationContainer ref={navigationRef}>
      {userData ? <AppStack /> : <AuthStack />}
      {/* <AppStack /> */}
    </NavigationContainer>
  );
};
export default AppContainer;
