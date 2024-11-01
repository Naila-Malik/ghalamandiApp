import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {setLoader, setUserData} from '../../../Redux/reducers/AppReducer';
import CommonDataManager from '../../../Utils/CommonManager';
import {loginRequest} from '../../../Network/Services/HomeApis';
import AppLoader from '../../Components/Loader/AppLoader';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import RoundInput from '../../Components/CustomInput/RoundInput';
import {TouchableOpacity} from 'react-native-gesture-handler';

const LoginScreen = (props: ScreenProps) => {
  const {isLoaderStart, isNetConnected} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    let body = {
      email: data?.email,
      password: data?.password,
    };
    try {
      dispatch(setLoader(true));
      let response: any = await loginRequest(isNetConnected, body);
      if (response?.status) {
        await CommonDataManager.getSharedInstance().saveUserData(
          response?.user,
        );
        await CommonDataManager.getSharedInstance().saveUserToken(
          response?.token,
        );
        dispatch(setUserData(response.data));
      } else {
        Alert.alert(`${response?.message}`);
      }
    } catch (e) {
      console.log('error in login ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <View style={[AppStyles.MainStyle, {paddingHorizontal: normalized(10)}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[AppStyles.centeredCommon, {marginTop: hv(10)}]}>
          <Image
            source={AppImages.Common.LogoImage}
            resizeMode="contain"
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>Login</Text>

        {!isLoaderStart ? (
          <KeyboardAvoidingView style={styles.body}>
            <Controller
              control={control}
              name="email"
              render={({field: {value, onChange}}) => (
                <>
                  <Text style={styles.txt}>Email Address</Text>
                  <RoundInput
                    onChangeText={t => onChange(t)}
                    placeholder="email@example.com"
                    value={value}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({field: {value, onChange}}) => (
                <>
                  <Text style={styles.txt}>Password</Text>
                  <RoundInput
                    onChangeText={t => onChange(t)}
                    placeholder=" *********"
                    value={value}
                    isPassword
                  />
                </>
              )}
            />
            <TouchableOpacity onPress={() => {}}>
              <Text style={[styles.txt, {alignSelf: 'flex-end'}]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <RoundButton
              title="Login"
              onPress={handleSubmit(onSubmit)}
              containerStyle={styles.btnStyle}
              titleStyle={{
                color: AppColors.white.white,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                props?.navigation.navigate(Routes?.Auth?.signUp);
              }}>
              <Text
                style={[
                  styles.txt,
                  {
                    alignSelf: 'center',
                    fontStyle: 'italic',
                    textDecorationLine: 'underline',
                    color: 'blue',
                  },
                ]}>
                Do not have an account?{' '}
                <Text style={styles.signup}>Signup</Text>
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        ) : (
          <View style={styles.emptyCont}>
            <AppLoader visible={isLoaderStart} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: hv(30),
  },
  icon: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: normalized(20),
    fontWeight: 'bold',
    color: AppColors.green.dark,
    textAlign: 'center',
  },
  txt: {
    fontSize: normalized(14),
    fontWeight: '400',
    color: AppColors.black.black,
    marginVertical: hv(10),
  },
  emptyCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: normalized(150),
  },
  btnStyle: {
    backgroundColor: AppColors.green.dark,
    margin: hv(10),
    alignItems: 'center',
    marginTop: hv(100),
  },
  signup: {
    fontSize: normalized(18),
    fontWeight: '600',
    color: 'blue',
    marginVertical: hv(10),
  },
});
