import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {AppStyles} from '../../../Utils/AppStyles';
import RoundButton from '../../Components/Button/RoundButton';
import RoundInput from '../../Components/CustomInput/RoundInput';
import AppLoader from '../../Components/Loader/AppLoader';
import {signUpRequest} from '../../../Network/Services/HomeApis';
import {setLoader, setUserData} from '../../../Redux/reducers/AppReducer';
import CommonDataManager from '../../../Utils/CommonManager';

const SignUpScreen = (props: ScreenProps) => {
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
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    let body = {
      email: data?.email,
      name: data?.name,
      password: data?.password,
      password_confirmation: data?.confirmPassword,
    };
    try {
      dispatch(setLoader(true));
      let response: any = await signUpRequest(isNetConnected, body);
      if (response?.status) {
        await CommonDataManager.getSharedInstance().saveUserData(
          response?.data,
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[AppStyles.MainStyle, {paddingHorizontal: normalized(10)}]}>
      <View style={AppStyles.centeredCommon}>
        <Image
          source={AppImages.Common.LogoImage}
          resizeMode="contain"
          style={styles.icon}
        />
      </View>
      <Text style={styles.title}>Sign Up</Text>

      {!isLoaderStart ? (
        <KeyboardAvoidingView style={styles.body}>
          <View>
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
              name="name"
              render={({field: {value, onChange}}) => (
                <>
                  <Text style={styles.txt}>User Name</Text>
                  <RoundInput
                    onChangeText={t => onChange(t)}
                    placeholder="John Doe"
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
            <Controller
              control={control}
              name="confirmPassword"
              render={({field: {value, onChange}}) => (
                <>
                  <Text style={styles.txt}>Confirm Password</Text>
                  <RoundInput
                    onChangeText={t => onChange(t)}
                    placeholder=" *********"
                    value={value}
                    isPassword
                  />
                </>
              )}
            />
          </View>

          <RoundButton
            title="Sign Up"
            onPress={handleSubmit(onSubmit)}
            containerStyle={styles.btnStyle}
            titleStyle={{
              color: AppColors.white.white,
            }}
          />
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.emptyCont}>
          <AppLoader visible={isLoaderStart} />
        </View>
      )}
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: hv(30),
    justifyContent: 'space-between',
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
    marginVertical: hv(50),
  },
});
