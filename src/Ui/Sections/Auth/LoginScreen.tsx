import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import RoundButton from '../../Components/Button/RoundButton';
import {Routes} from '../../../Utils/Routes';

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
        onPress={() => props.navigation.navigate(Routes.home.homePage)}
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
