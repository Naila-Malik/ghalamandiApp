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
import AppHeader from '../../Components/Header/AppHeader';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import CardUI from '../../Components/Card/CardUI';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {logOut} from '../../../Redux/reducers/AppReducer';
import CommonDataManager from '../../../Utils/CommonManager';
import {logoutRequest} from '../../../Network/Services/Setting';
import {Routes} from '../../../Utils/Routes';

const SettingsScreen = (props: ScreenProps) => {
  const {isNetConnected, userData} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const dispatch = useDispatch();

  const userLogout = async () => {
    try {
      let response: any = await logoutRequest(isNetConnected);
      if (response?.success) {
        await CommonDataManager.getSharedInstance().saveUserData(null);
        await CommonDataManager.getSharedInstance().saveUserToken('');
        dispatch(logOut('logout'));
      } else {
        Alert.alert(response?.message);
      }
    } catch (e) {
      console.log('error------> ', e);
    }
  };
  // console.log('dayayayyayayay', userData);
  return (
    <ScrollView>
      <KeyboardAvoidingView style={AppStyles.mainContainer}>
        <AppHeader
          title="Settings"
          leftIcon
          onLeftIconPress={() => props.navigation.goBack()}
        />
        <View style={styles.header}>
          <View style={styles.imgContainer}>
            <Image
              source={AppImages.Common.placeholderImg}
              style={styles.profileImg}
            />
          </View>
          <Text style={styles.title}>{userData?.name}</Text>
          <Text style={styles.txt}> {userData?.role} </Text>
        </View>
        <View style={{flex: 1}}>
          <CardUI
            label="Edit Profile"
            rightImgStyleView={styles.rightImgStyleView}
            onPress={() =>
              props?.navigation.navigate(Routes.Settings.UserProfile)
            }
            leftImg={AppImages.Settings.PersonIcon}
          />
          <CardUI
            label="Statistics "
            rightImgStyleView={styles.rightImgStyleView}
            onPress={() => console.log('btn')}
            leftImg={AppImages.Settings.StaticsIcon}
          />
          <CardUI
            label="Verification Status "
            rightImgStyleView={styles.rightImgStyleView}
            onPress={() => console.log('btn')}
            leftImg={AppImages.Settings.StatusIcon}
          />
          <CardUI
            label="Select Language "
            rightImgStyleView={styles.rightImgStyleView}
            onPress={() => console.log('btn')}
            leftImg={AppImages.Settings.languageIcon}
          />
          <CardUI
            label="My Addresses"
            rightImgStyleView={styles.rightImgStyleView}
            onPress={() => console.log('btn')}
            leftImg={AppImages.Settings.AddressIcon}
          />
          <CardUI
            label="Notification Setting"
            rightImgStyleView={styles.rightImgStyleView}
            onPress={() => console.log('btn')}
            leftImg={AppImages.Settings.notifiIcon}
          />
          <CardUI
            label="Change your City"
            rightImgStyleView={styles.rightImgStyleView}
            onPress={() => console.log('btn')}
            leftImg={AppImages.Settings.CityIcon}
          />
          <CardUI
            label="Logout"
            rightImgStyleView={styles.rightImgStyleView}
            onPress={userLogout}
            leftImg={AppImages.Settings.LogoutIcon}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  rightImgStyleView: {
    backgroundColor: AppColors.grey.greyDark,
    borderRadius: normalized(20),
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
  txt: {
    color: AppColors.black.black,
    fontSize: normalized(12),
    fontWeight: '500',
    alignSelf: 'center',
    marginVertical: hv(5),
  },
});
