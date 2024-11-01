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
import React, {useState} from 'react';
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
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';

const UserProfile = (props: ScreenProps) => {
  const [img, setImg] = useState<string | null>(null);
  const {isNetConnected, isLoaderStart, userData} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const dispatch = useDispatch();

  const handleImageSelection = (image: any) => {
    setImg(image);
    return image;
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      image: '',
      name: '',
      address: '',
      city: '',
      whatsapp: 0,
      mobile: 0,
    },
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      let imageBase64 = null;
      if (data?.image) {
        imageBase64 = await RNFetchBlob.fs.readFile(data.image.path, 'base64');
      }
      let body = {
        image: imageBase64, // Base64-encoded image
        name: data?.name,
        address: data?.address,
        city: data?.city,
        whatsapp: data?.whatsapp,
        mobile: data?.mobile,
      };

      dispatch(setLoader(true));
      let response: any = await profileEditRequest(isNetConnected, body);
      if (response?.status) {
        await CommonDataManager.getSharedInstance().saveUserData(
          response?.user,
        );
        Alert.alert(`${response?.message}`);
        // props?.navigation.goBack();
        dispatch(userData(response?.user));
        await props?.navigation.replace(Routes.Settings.SettingHome);
      } else {
        Alert.alert(`${response?.message}`);
      }
    } catch (e) {
      console.log('Error in updating profile: ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  // console.log('userdata==========', userData);
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
          <Controller
            control={control}
            name="image"
            render={({field: {value, onChange}}) => (
              <>
                <TouchableOpacity
                  onPress={() => {
                    ImagePicker.openPicker({
                      width: 300,
                      height: 400,
                      cropping: true,
                    }).then(image => {
                      const selectedImg = handleImageSelection(image);
                      onChange(selectedImg); // Pass the image to the Controller
                    });
                  }}>
                  <View style={styles.imgContainer}>
                    <Image
                      source={
                        img ? {uri: img?.path} : AppImages.Common.placeholderImg
                      }
                      style={styles.profileImg}
                    />
                  </View>
                  <View style={styles.editIcon}>
                    <Image
                      source={AppImages.Common.editIcon}
                      style={styles.img1}
                    />
                  </View>
                </TouchableOpacity>
              </>
            )}
          />

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
                      keyboardType="numeric"
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
                name="address"
                render={({field: {value, onChange}}) => (
                  <>
                    <Text style={styles.txt}>Address</Text>
                    <RoundInput
                      onChangeText={t => onChange(t)}
                      placeholder="Address"
                      value={value}
                      leftIcon={AppImages.Settings.AddressIcon}
                    />
                  </>
                )}
              />
              <Controller
                control={control}
                name="city"
                render={({field: {value, onChange}}) => (
                  <>
                    <Text style={styles.txt}>City</Text>
                    <RoundInput
                      onChangeText={t => onChange(t)}
                      placeholder="city"
                      value={value}
                      leftIcon={AppImages.Settings.CityIcon}
                    />
                  </>
                )}
              />
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
                      keyboardType="numeric"
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
    height: hv(180),
    paddingTop: hv(10),
    backgroundColor: AppColors.bgColor,
    flex: 1,
  },
  imgContainer: {
    width: normalized(100),
    height: hv(100),
    backgroundColor: AppColors.grey.greyLighter,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalized(47),
    borderWidth: 3,
    borderColor: AppColors.white.white,
  },
  profileImg: {
    width: normalized(95),
    height: hv(95),
    resizeMode: 'cover',
    borderRadius: normalized(47),
  },
  title: {
    color: AppColors.black.black,
    fontSize: normalized(16),
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: hv(10),
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
  img1: {
    resizeMode: 'contain',
    width: normalized(20),
    height: hv(20),
  },
  editIcon: {
    alignSelf: 'center',
    marginTop: hv(-40),
    marginBottom: hv(10),
    marginLeft: normalized(90),
  },
});
