import {
  Image,
  ImageStyle,
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';

interface Props {
  title?: string;
  day?: string;
  date?: string;
  month?: string;
  titleStyle?: TextStyle;
  leftIconStyles?: ImageStyle;
  containerStyles?: ViewStyle;
}

const LogoHeader = (props: Props) => {
  return (
    <View style={[styles.container, props.containerStyles]}>
      <SafeAreaView />
      <View>
        <View style={styles.leftImgBox}>
          <Image
            source={AppImages.Common.LogoImage}
            resizeMode="contain"
            style={[styles.leftImg, props.leftIconStyles]}
          />
        </View>
      </View>
      <Text numberOfLines={1} style={styles.titleText}>
        {props.title}
      </Text>
      <View>
        <View style={styles.rightBox}>
          <Text style={styles.txt}>{props.date}</Text>
          <Text style={styles.txt}>{props.month}</Text>
        </View>
        <Text style={styles.txt}>{props.day}</Text>
      </View>
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.bgColor,
    ...AppStyles.horiCommon,
    marginHorizontal: normalized(15),
    paddingTop: 10,
    height: 60,
  },
  leftImgBox: {
    width: normalized(40),
    height: normalized(40),
    ...AppStyles.centeredCommon,
    backgroundColor: AppColors.bgColor,
    borderRadius: normalized(12),
  },
  leftImg: {
    height: '100%',
    width: '100%',
  },
  titleText: {
    color: AppColors.black.black,
    flex: 1,
    textAlign: 'center',
    fontSize: normalized(18),
    fontWeight: 'bold',
  },
  txt: {
    color: AppColors.black.black,
    ...AppStyles.textBold,
    fontSize: normalized(14),
    fontWeight: 'bold',
  },
  rightBox: {
    width: normalized(50),
    height: normalized(50),
    ...AppStyles.horiCommon,
    backgroundColor: AppColors.bgColor,
    borderRadius: normalized(12),
    justifyContent: 'space-between',
  },
  rightImg: {
    height: '55%',
    width: '55%',
  },
});
