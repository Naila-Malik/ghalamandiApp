import React, { useState } from 'react';
import { Image, ImageStyle, Keyboard, SafeAreaView, StatusBar, StyleSheet, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { AppColors, AppFonts, AppImages, isAndroid, normalized } from '../../../Utils/AppConstants';
import { AppStyles } from '../../../Utils/AppStyles';
import HeaderListModal from '../Model/HeaderListModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStore } from '../../../Redux/store/AppStore';
import { setSelectedChild } from '../../../Redux/reducers/AppReducer';
import { useFocusEffect } from '@react-navigation/native';

interface Props {
  title?: string,
  label?: string,
  titleStyle?: TextStyle,
  leftIcon?: any,
  onLeftIconPress?: () => void,
  leftIconStyles?: ImageStyle,
  leftIconBoxStyles?: ViewStyle,
  rightIcon?: any,
  onRightIconPress?: () => void,
  rightIconStyles?: ImageStyle,
  rightIconBoxStyles?: ViewStyle,
  isDropDown?: boolean
  listType?: 'children' | 'school';
  containerStyles?: ViewStyle;
  statusBgColor?: string;
  useLightHeaderColor?: boolean;
  isAppointment?: boolean;
  labelCategory?: string,
  schoolList?: boolean;
}

const AppHeader = (props: Props) => {
  const dispatch = useDispatch();
  const { isNotchDevice, selectedChild } = useSelector((state: AppRootStore) => state.AppReducer);
  const [showListModal, setShowListModal] = useState(false);

  const dropDownTitle = props.listType == 'school' ? props.title : selectedChild?.fullName;
  const dropDownLabel = selectedChild?.school?.schoolName;

  const showDropdownWithSchool = props.listType == 'school' && props.title ? true : false;

  const statusBgColor: any = props.statusBgColor ? props.statusBgColor : AppColors.white.white;
  const statusBarStyle = props.useLightHeaderColor ? 'light-content' : 'dark-content';
  const isMenuIconShown = props.leftIcon == 17;

  useFocusEffect(() => {
    if (isAndroid) {
      StatusBar.setBackgroundColor(statusBgColor)
      StatusBar.setBarStyle(statusBarStyle)
    }
  })

  return (
    <View style={[styles.container, props.containerStyles]}>
      <SafeAreaView />
      <View
        style={styles.rowContainer}>
        {
          props.leftIcon ?
            <TouchableWithoutFeedback onPress={() => {
              props.onLeftIconPress && props.onLeftIconPress();
              isMenuIconShown && Keyboard.dismiss();
            }}>
              <View style={[styles.leftImgBox, props.leftIconBoxStyles]}>
                <Image
                  source={props.leftIcon}
                  resizeMode="contain"
                  style={[styles.leftImg, props.leftIconStyles]}
                />
              </View>
            </TouchableWithoutFeedback> : <View style={{ width: normalized(40) }} />
        }
        {
          props.isDropDown ?
            <View style={styles.dropdownOuterBox}>
              <TouchableWithoutFeedback onPress={() => setShowListModal(true)}>
                <View style={{
                  alignItems: 'center',
                }}>
                  <View style={[AppStyles.horiCommon, { flex: 1 }]}>
                    <Text
                      ellipsizeMode="tail"
                      adjustsFontSizeToFit
                      minimumFontScale={0.7}
                      numberOfLines={1}
                      style={[styles.dropdownTitle, { color: props.useLightHeaderColor ? AppColors.white.white : AppColors.black.black }]}
                    >
                      {dropDownTitle}
                    </Text>
                    {
                      !showDropdownWithSchool &&
                      <Image source={AppImages.Common.DropdownFilled}
                        resizeMode='contain'
                        style={[styles.dropdownImg, { tintColor: props.useLightHeaderColor ? AppColors.white.white : AppColors.black.black }]} />
                    }
                  </View>
                  <View style={[AppStyles.horiCommon, { flex: 1 }]}>
                    <Text
                      ellipsizeMode="tail"
                      adjustsFontSizeToFit
                      minimumFontScale={0.8}
                      numberOfLines={1}
                      style={[styles.dropdownLabel, { color: props.useLightHeaderColor ? AppColors.white.white : AppColors.black.black }]}>
                      {dropDownLabel}
                    </Text>
                    {
                      showDropdownWithSchool &&
                      <Image source={AppImages.Common.DropdownFilled}
                        resizeMode='contain'
                        style={[styles.dropdownImg, { height: normalized(14), width: normalized(14), marginRight: 0, tintColor: props.useLightHeaderColor ? AppColors.white.white : AppColors.black.black }]} />
                    }
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
            :
            props.labelCategory ?
              <View style={styles.titleBox}>
                <View style={styles.labelContainer}>
                  <Text numberOfLines={1} style={[styles.titleText, { color: props.useLightHeaderColor ? AppColors.white.white : AppColors.black.black }, props.titleStyle]}>
                    {props.title}
                  </Text>
                  <Text style={styles.labelText}>{props.labelCategory}</Text>
                </View>
              </View> :
              <Text numberOfLines={1} style={[styles.titleText, {
                color: props.useLightHeaderColor ? AppColors.white.white : AppColors.black.black,
              }, props.titleStyle]}>
                {props.title}
              </Text>
        }

        {props.rightIcon ? (
          <TouchableWithoutFeedback
            onPress={props.onRightIconPress}>
            <View
              style={[
                styles.rightImgBox, props.rightIconBoxStyles]}>
              <Image
                source={props.rightIcon}
                style={[styles.rightImg, props.rightIconStyles]}
                resizeMode="contain"
              />
            </View>
          </TouchableWithoutFeedback>
        ) : <View style={{ width: normalized(40) }} />}
      </View>
      {
        showListModal && props.listType &&
        <HeaderListModal
          listType={props.listType}
          onClose={() => setShowListModal(false)}
          selectedItem={selectedChild}
          setSelectedItem={(singleChild) => dispatch(setSelectedChild(singleChild))}
        />
      }
    </View>
  )
}

export default AppHeader;


const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white.white,
  },
  con: {
    backgroundColor: AppColors.blue.mainBlue,
  },
  rowContainer: {
    ...AppStyles.horiCommon,
    marginHorizontal: normalized(15),
    paddingTop: 10,
    height: 60
  },
  leftImgBox: {
    width: normalized(40),
    height: normalized(40),
    ...AppStyles.centeredCommon,
    backgroundColor: AppColors.blue.lighterBlue,
    borderRadius: normalized(12),
  },
  leftImg: {
    height: '45%',
    width: '45%',
  },
  titleText: {
    color: AppColors.black.black,
    flex: 1,
    textAlign: 'center',
    ...AppStyles.textBold,
    fontSize: normalized(18)
  },
  rightImgBox: {
    width: normalized(40),
    height: normalized(40),
    ...AppStyles.centeredCommon,
    backgroundColor: AppColors.blue.lighterBlue,
    borderRadius: normalized(12),
  },
  rightImg: {
    height: '55%',
    width: '55%'
  },
  dropdownOuterBox: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  titleBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  dropdownTitle: {
    ...AppStyles.textBold,
    fontSize: normalized(18),
    maxWidth: '85%',
  },
  dropdownLabel: {
    ...AppStyles.textRegular,
    fontSize: normalized(13),
  },
  dropdownImg: {
    height: normalized(17),
    width: normalized(17),
    marginLeft: 10,
    marginRight: 10
  },
  labelContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  labelText: {
    fontSize: normalized(13),
    color: AppColors.black.black,
    fontFamily: AppFonts.Synonyms.Regular,
  }
});