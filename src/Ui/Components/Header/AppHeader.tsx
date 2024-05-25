import React from 'react';
import {
  Image,
  ImageStyle,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {
  AppColors,
  AppFonts,
  AppImages,
  isAndroid,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import {useFocusEffect} from '@react-navigation/native';

interface Props {
  title?: string;
  titleStyle?: TextStyle;
  leftIcon?: any;
  onLeftIconPress?: () => void;
  leftIconStyles?: ImageStyle;
  rightIcon?: any;
  onRightIconPress?: () => void;
  rightIconStyles?: ImageStyle;
  containerStyles?: ViewStyle;
  statusBgColor?: string;
  useLightHeaderColor?: boolean;
}

const AppHeader = (props: Props) => {
  const statusBgColor: any = props.statusBgColor
    ? props.statusBgColor
    : AppColors.white.white;
  const statusBarStyle = props.useLightHeaderColor
    ? 'light-content'
    : 'dark-content';

  useFocusEffect(() => {
    if (isAndroid) {
      StatusBar.setBackgroundColor(statusBgColor);
      StatusBar.setBarStyle(statusBarStyle);
    }
  });

  return (
    <View style={[styles.container, props.containerStyles]}>
      <SafeAreaView />
      {props.leftIcon ? (
        <TouchableWithoutFeedback
          onPress={() => {
            props.onLeftIconPress && props.onLeftIconPress();
          }}>
          <View style={styles.leftImgBox}>
            <Image
              source={AppImages.Common.BackIcon}
              resizeMode="contain"
              style={[styles.leftImg, props.leftIconStyles]}
            />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View style={{width: normalized(40)}} />
      )}
      <Text
        numberOfLines={1}
        style={[
          styles.titleText,
          {
            color: props.useLightHeaderColor
              ? AppColors.white.white
              : AppColors.black.black,
          },
          props.titleStyle,
        ]}>
        {props.title}
      </Text>
      {props.rightIcon ? (
        <TouchableWithoutFeedback onPress={props.onRightIconPress}>
          <View style={styles.rightImgBox}>
            <Image
              source={props.rightIcon}
              style={[styles.rightImg, props.rightIconStyles]}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View style={{width: normalized(40)}} />
      )}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.bgColor,
    ...AppStyles.horiCommon,
    marginHorizontal: normalized(15),
    // paddingTop: 10,
    height: 60,
  },
  leftImgBox: {
    width: normalized(40),
    height: normalized(40),
    ...AppStyles.centeredCommon,
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
    fontSize: normalized(18),
    fontWeight: '700',
  },
  rightImgBox: {
    width: normalized(40),
    height: normalized(40),
    ...AppStyles.centeredCommon,
    backgroundColor: AppColors.white.white,
    borderRadius: normalized(12),
  },
  rightImg: {
    height: '55%',
    width: '55%',
  },
});
