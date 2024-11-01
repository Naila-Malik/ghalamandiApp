import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';
import RoundButton from '../../Components/Button/RoundButton';
import ImagePicker from 'react-native-image-crop-picker';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import RoundInput from '../../Components/CustomInput/RoundInput';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {useDispatch, useSelector} from 'react-redux';
import {MyNewShopRequest} from '../../../Network/Services/CommissionShops';
import {setLoader} from '../../../Redux/reducers/AppReducer';
import AppLoader from '../../Components/Loader/AppLoader';
import {Routes} from '../../../Utils/Routes';
import RNFetchBlob from 'rn-fetch-blob';

const MyShopScreen = (props: ScreenProps) => {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [iconImage, setIconImage] = useState<string | null>(null);
  const {name, id} = props?.route?.params;
  const {isNetConnected, isLoaderStart} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const dispatch = useDispatch();
  const handleImageSelection = (image: any) => {
    // setImg(image);
    return image;
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      bgImage: '',
      iconImage: '',
      name: '',
      address: '',
      about: '',
      shopNo: 0,
      PNumber: 0,
    },
  });

  const convertToBase64 = async (imagePath: string) => {
    return await RNFetchBlob.fs.readFile(imagePath, 'base64');
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      dispatch(setLoader(true));
      const bgImageBase64 = bgImage ? await convertToBase64(bgImage) : null;
      const iconImageBase64 = iconImage
        ? await convertToBase64(iconImage)
        : null;

      const body = {
        bg_image: bgImageBase64,
        avatar: iconImageBase64,
        shop_name: data?.name,
        shop_address: data?.address,
        about: data?.about,
        shop_no: data?.shopNo,
        mobile_no: data?.PNumber,
        city: id,
        buy_crops: ['6', '7'],
        whatsapp_no: data?.PNumber,
      };

      // console.log('Data before sending:', body);
      const response: any = await MyNewShopRequest(isNetConnected, body);
      // console.log('response================', response);
      if (response?.success) {
        Alert.alert(`${response?.message}`);
        props?.navigation.navigate(Routes.home.homePage);
      } else {
        Alert.alert(`${response?.message}`);
      }
    } catch (error) {
      console.log('Error in creating shop:', error);
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="Register Commission Shop"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
        titleStyle={{fontSize: normalized(16)}}
      />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => {
              ImagePicker.openPicker({
                width: 400,
                height: 300,
                cropping: true,
              }).then(image => {
                setBgImage(image?.path); // Set background image path
              });
            }}>
            <ImageBackground
              source={
                bgImage ? {uri: bgImage} : AppImages.Common.uploadImageIcon
              }
              style={styles.imgCard}>
              <Text style={styles.txt1}>Upload Background Image</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.LogoContainer}
            onPress={() => {
              ImagePicker.openPicker({
                width: 250,
                height: 250,
                cropping: true,
              }).then(image => {
                setIconImage(image?.path); // Set icon image path
              });
            }}>
            <Image
              source={
                iconImage ? {uri: iconImage} : AppImages.Common.iconUpload
              }
              style={styles.imgLogo}
            />
          </TouchableOpacity>
        </View>
        {isLoaderStart ? (
          <View style={styles.emptyCont}>
            <AppLoader visible={isLoaderStart} />
          </View>
        ) : (
          <KeyboardAvoidingView>
            <Controller
              control={control}
              name="name"
              render={({field: {value, onChange}}) => (
                <>
                  <Text style={styles.txt}>Shop Name</Text>
                  <RoundInput
                    onChangeText={t => onChange(t)}
                    placeholder="Shop Name"
                    value={value}
                    leftIcon={AppImages.Settings.PersonIcon}
                  />
                </>
              )}
            />
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
              name="about"
              render={({field: {value, onChange}}) => (
                <>
                  <Text style={styles.txt}>About</Text>
                  <RoundInput
                    onChangeText={t => onChange(t)}
                    placeholder="About"
                    value={value}
                    leftIcon={AppImages.Settings.notifiIcon}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name="shopNo"
              render={({field: {value, onChange}}) => (
                <>
                  <Text style={styles.txt}>Shop #</Text>
                  <RoundInput
                    onChangeText={t => onChange(t)}
                    placeholder="Shop #"
                    value={value}
                    leftIcon={AppImages.Settings.StaticsIcon}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name="PNumber"
              render={({field: {value, onChange}}) => (
                <>
                  <Text style={styles.txt}>Mobile #</Text>
                  <RoundInput
                    onChangeText={t => onChange(t)}
                    placeholder="Mobile #"
                    value={value}
                    leftIcon={AppImages.Common.phoneIcon}
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
          </KeyboardAvoidingView>
        )}
      </ScrollView>
    </View>
  );
};

export default MyShopScreen;

const styles = StyleSheet.create({
  card: {
    borderRadius: normalized(20),
    paddingHorizontal: normalized(10),
    height: hv(170),
  },
  imgCard: {
    resizeMode: 'contain',
    width: '100%',
    height: hv(170),
    alignSelf: 'center',
    marginVertical: hv(10),
    // opacity: normalized(0.5),
  },
  imgLogo: {
    resizeMode: 'contain',
    width: normalized(90),
    height: hv(90),
    borderRadius: normalized(50),
  },
  Btn: {
    width: '100%',
    backgroundColor: AppColors.green.dark,
    alignItems: 'center',
    marginVertical: hv(10),
  },
  LogoContainer: {
    width: normalized(90),
    height: hv(90),
    marginTop: hv(-150),
    marginHorizontal: normalized(10),
    borderRadius: normalized(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    zIndex: 10,
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
});
