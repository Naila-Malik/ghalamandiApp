import {
  Image,
  ImageStyle,
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../../Utils/Routes';
// import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import DealsHistory from '../../Sections/SalePurchase/DealsHistory';
import {
  BidStack,
  SalePurchaseStack,
} from '../../../Navigation/HomePageNavigation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator
      // tabBar={props => <BottomTab {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={Routes.Products.SalePurchase}
        component={SalePurchaseStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.ImgBox}>
              <Image
                source={AppImages.BottomTab.CartIcon}
                resizeMode="contain"
                style={[
                  styles.Img,
                  {
                    tintColor: focused
                      ? AppColors.green.dark
                      : AppColors.grey.greyLighterLvl2,
                  },
                ]}
              />
              <Text
                style={[
                  styles.txt,
                  {
                    color: focused
                      ? AppColors.green.dark
                      : AppColors.grey.greyLighterLvl2,
                  },
                ]}>
                Sale Purchase
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={Routes.Products.addBid}
        component={BidStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.bgBox}>
              <View style={styles.imgBG}>
                <View
                  style={[
                    styles.middleImgBox,
                    {
                      backgroundColor: focused
                        ? AppColors.green.dark
                        : AppColors.grey.greyLighterLvl2,
                    },
                  ]}>
                  <Image
                    source={AppImages.BottomTab.PlusIcon}
                    style={styles.Img}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name={Routes.Products.dealsHistory}
        component={DealsHistory}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.ImgBox}>
              <Image
                source={AppImages.BottomTab.History}
                style={[
                  styles.Img,
                  {
                    tintColor: focused
                      ? AppColors.green.dark
                      : AppColors.grey.greyLighterLvl2,
                  },
                ]}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.txt,
                  {
                    color: focused
                      ? AppColors.green.dark
                      : AppColors.grey.greyLighterLvl2,
                  },
                ]}>
                Deals history
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  Img: {
    height: hv(25),
    width: normalized(25),
    resizeMode: 'contain',
  },
  ImgBox: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: hv(5),
  },
  middleImgBox: {
    height: hv(60),
    width: normalized(60),
    borderRadius: normalized(30),
    // marginTop: hv(10),
    ...AppStyles.centeredCommon,
  },
  bgBox: {
    height: hv(80),
    width: '50%',
    borderRadius: normalized(25),
    marginTop: hv(-10),
    alignItems: 'center',
  },
  imgBG: {
    height: hv(70),
    width: normalized(70),
    borderRadius: normalized(50),
    // marginTop: hv(-20),
    ...AppStyles.centeredCommon,
    backgroundColor: AppColors.white.white,
    // backgroundColor: 'yellow',
  },
  txt: {
    fontSize: 12,
    color: AppColors.black.black,
    fontWeight: 'bold',
  },
});
