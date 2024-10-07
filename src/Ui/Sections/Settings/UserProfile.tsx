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
import {name} from 'moment';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {
  AppImages,
  AppColors,
  normalized,
  hv,
  ScreenProps,
} from '../../../Utils/AppConstants';
import RoundButton from '../../Components/Button/RoundButton';
import RoundInput from '../../Components/CustomInput/RoundInput';
import AppLoader from '../../Components/Loader/AppLoader';
import {AppStyles} from '../../../Utils/AppStyles';
import {profileEditRequest} from '../../../Network/Services/Setting';
import {setLoader} from '../../../Redux/reducers/AppReducer';
import {Routes} from '../../../Utils/Routes';
import AppHeader from '../../Components/Header/AppHeader';
import CommonDataManager from '../../../Utils/CommonManager';

const UserProfile = (props: ScreenProps) => {
  const {isNetConnected, isLoaderStart, userData} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      image: '',
      name: '',
      whatsapp: 0,
      mobile: 0,
    },
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    let body = {
      image: null,
      name: data?.name,
      whatsapp: data?.whatsapp,
      mobile: data?.mobile,
    };
    try {
      dispatch(setLoader(true));
      let response: any = await profileEditRequest(isNetConnected, body);
      if (response?.status) {
        await CommonDataManager.getSharedInstance().saveUserData(
          response?.user,
        );
        Alert.alert(`${response?.message}`);
        // props?.navigation.navigate(Routes.Settings.SettingHome);
        props?.navigation.goBack();
      } else {
        Alert.alert(`${response?.message}`);
      }
    } catch (e) {
      console.log('error in updating profile ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <View
      style={[AppStyles.mainContainer, {paddingHorizontal: normalized(10)}]}>
      <AppHeader
        title="Settings"
        leftIcon
        onLeftIconPress={() => props.navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.imgContainer}>
            <Image
              source={AppImages.Common.placeholderImg}
              style={styles.profileImg}
            />
          </View>
          <Text style={styles.title}>{userData?.name}</Text>
          <Text style={[styles.txt, {textAlign: 'center'}]}>
            {' '}
            {userData?.role}{' '}
          </Text>
        </View>
        <KeyboardAvoidingView
          style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
          {isLoaderStart ? (
            <View style={styles.emptyCont}>
              <AppLoader visible={isLoaderStart} />
            </View>
          ) : (
            <>
              <Controller
                control={control}
                name="name"
                render={({field: {value, onChange}}) => (
                  <>
                    <Text style={styles.txt}>Your Name</Text>
                    <RoundInput
                      onChangeText={t => onChange(t)}
                      placeholder="name"
                      value={value}
                      leftIcon={AppImages.Settings.PersonIcon}
                    />
                  </>
                )}
              />
              <Controller
                control={control}
                name="mobile"
                render={({field: {value, onChange}}) => (
                  <>
                    <Text style={styles.txt}>Mobile</Text>
                    <RoundInput
                      onChangeText={t => onChange(t)}
                      placeholder="mobile"
                      value={value}
                      leftIcon={AppImages.Common.phoneIcon}
                    />
                  </>
                )}
              />
              <>
                <Text style={styles.txt}>Email</Text>
                <View style={styles.inputView}>
                  <>
                    <Image source={AppImages.Home.aboutUs} style={styles.img} />
                    <View style={styles.bar} />
                  </>
                  <Text style={[styles.txt, {color: AppColors.black.black}]}>
                    {userData?.email}
                  </Text>
                </View>
              </>
              <Controller
                control={control}
                name="whatsapp"
                render={({field: {value, onChange}}) => (
                  <>
                    <Text style={styles.txt}>WhatsApp</Text>
                    <RoundInput
                      onChangeText={t => onChange(t)}
                      placeholder="whatsapp"
                      value={value}
                      leftIcon={AppImages.Home.whatsApp}
                    />
                  </>
                )}
              />
              <RoundButton
                title="Save"
                onPress={handleSubmit(onSubmit)}
                containerStyle={styles.Btn}
                titleStyle={{color: AppColors.white.white}}
              />
            </>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  card: {
    borderRadius: normalized(20),
    paddingHorizontal: normalized(10),
    height: hv(170),
  },
  header: {
    height: hv(150),
    marginBottom: hv(10),
  },
  imgContainer: {
    width: normalized(90),
    height: hv(90),
    backgroundColor: AppColors.grey.greyLighter,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalized(40),
    borderWidth: 3,
    borderColor: AppColors.white.white,
  },
  profileImg: {
    width: normalized(50),
    height: hv(50),
    resizeMode: 'contain',
  },
  title: {
    color: AppColors.black.black,
    fontSize: normalized(16),
    fontWeight: '700',
    alignSelf: 'center',
    marginVertical: hv(5),
  },
  imgCard: {
    resizeMode: 'contain',
    width: '100%',
    height: hv(170),
    alignSelf: 'center',
    marginVertical: hv(10),
    opacity: normalized(0.5),
  },
  imgLogo: {
    resizeMode: 'contain',
    width: normalized(70),
    height: hv(70),
    zIndex: 10,
    marginTop: hv(-50),
    marginBottom: hv(10),
    marginHorizontal: normalized(10),
    borderRadius: normalized(50),
  },
  Btn: {
    width: '100%',
    backgroundColor: AppColors.green.dark,
    alignItems: 'center',
    marginVertical: hv(50),
  },
  LogoContainer: {
    width: normalized(80),
    height: hv(80),
    marginTop: hv(-150),
    marginHorizontal: normalized(10),
    borderRadius: normalized(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: AppColors.grey.greyLighter,
  },
  txt1: {
    fontSize: normalized(16),
    color: AppColors.grey.grey,
    fontWeight: 'bold',
    marginTop: hv(140),
    marginLeft: normalized(70),
  },
  txt: {
    fontSize: 14,
    color: AppColors.black.black,
    marginVertical: hv(10),
    fontWeight: '500',
  },
  emptyCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: normalized(150),
  },
  inputView: {
    borderRadius: 6,
    paddingHorizontal: normalized(10),
    flexDirection: 'row',
    paddingVertical: hv(2),
    backgroundColor: AppColors.white.white,
  },
  bar: {
    borderWidth: 1,
    width: normalized(1),
    height: hv(30),
    marginHorizontal: normalized(10),
    alignSelf: 'center',
    borderColor: AppColors.grey.grey,
    backgroundColor: AppColors.grey.grey,
  },
  img: {
    tintColor: AppColors.grey.grey,
    resizeMode: 'contain',
    alignSelf: 'center',
    width: normalized(20),
    height: hv(20),
  },
});
