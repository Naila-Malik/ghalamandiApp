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
import {useDispatch, useSelector} from 'react-redux';
import {
  setAlertObj,
  setLoader,
  setUserData,
} from '../../../Redux/reducers/AppReducer';
import CommonDataManager from '../../../Utils/CommonManager';
import {loginRequest} from '../../../Network/Services/HomeApis';
import {ApiResponseHandler} from '../../../Network/ApiResponseHandler';
import {AppStrings} from '../../../Utils/Strings';

const LoginScreen = (props: ScreenProps) => {
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const dispatch = useDispatch();

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
        onPress={() => {
          GoogleSignin.configure({
            webClientId: webClientIdSingin,
            // iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
            offlineAccess: true,
          });
          GoogleSignin.hasPlayServices()
            .then(hasPlayService => {
              if (hasPlayService) {
                GoogleSignin.signIn()
                  .then(async userInfo => {
                    try {
                      dispatch(setLoader(true));
                      let response: ApiResponseHandler<any> =
                        await loginRequest(selector.isNetConnected, userInfo);
                      if (response?.success) {
                        await CommonDataManager.getSharedInstance().saveUserData(
                          userInfo.user,
                        );
                        await CommonDataManager.getSharedInstance().saveUserToken(
                          response?.token,
                        );

                        dispatch(setUserData(response.data));
                      } else {
                        dispatch(
                          setAlertObj({
                            title: AppStrings.Network.errorTitle,
                            message:
                              response?.statusCode == 400 ||
                              response?.statusCode == 401
                                ? AppStrings.Validation.incorrectOtpError
                                : response.message,
                          }),
                        );
                      }
                    } catch (e) {
                      console.log('error in registration process ', e);
                    } finally {
                      dispatch(setLoader(false));
                    }
                  })
                  .catch(e => {
                    console.log('ERROR IS after signin: ' + JSON.stringify(e));
                  });
              }
            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
        }}
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
