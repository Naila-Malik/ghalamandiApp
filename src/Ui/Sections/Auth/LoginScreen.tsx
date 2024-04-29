import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
  webClientIdSingin,
} from '../../../Utils/AppConstants';
import RoundButton from '../../Components/Button/RoundButton';
import {Routes} from '../../../Utils/Routes';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const LoginScreen = (props: ScreenProps) => {
  return (
    <View style={[AppStyles.MainStyle, {paddingHorizontal: normalized(10)}]}>
      <View style={[AppStyles.centeredCommon, {marginTop: hv(230)}]}>
        <Image
          source={AppImages.Common.LogoImage}
          resizeMode="contain"
          style={styles.icon}
        />
      </View>
      <Text style={styles.title}>Login/Signup </Text>
      <Text style={styles.text}>
        Log in to your existing account of e ghala mandi{' '}
      </Text>
      <RoundButton
        title="Google"
        onPress={() =>
          //  props.navigation.navigate(Routes.home.homePage)}
          {
            GoogleSignin.configure({
              webClientId: webClientIdSingin,
              // iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
              offlineAccess: true,
            });
            GoogleSignin.hasPlayServices()
              .then(hasPlayService => {
                if (hasPlayService) {
                  GoogleSignin.signIn()
                    .then(userInfo => {
                      console.log(JSON.stringify(userInfo));
                    })
                    .catch(e => {
                      console.log('ERROR IS: ' + JSON.stringify(e));
                    });
                }
              })
              .catch(e => {
                console.log('ERROR IS: ' + JSON.stringify(e));
              });
          }
        }
        icon={AppImages.Auth.Gicon}
        iconStyles={{
          width: normalized(20),
          height: hv(20),
          resizeMode: 'contain',
        }}
        containerStyle={{
          backgroundColor: AppColors.red.dark,
          marginTop: hv(20),
          alignItems: 'center',
        }}
        titleStyle={{
          color: AppColors.white.white,
        }}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  icon: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: normalized(14),
    // fontFamily: '',
    fontWeight: 'bold',
    color: AppColors.black.black,
  },
  text: {
    fontSize: normalized(14),
    // fontFamily: '',
    fontWeight: '400',
    color: AppColors.black.black,
  },
});
