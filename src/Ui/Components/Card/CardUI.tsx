import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import {
  AppColors,
  AppImages,
  formFieldsHeight,
  hv,
  normalized,
} from '../../../Utils/AppConstants';

interface Props {
  leftImg?: Image;
  leftImgStyle?: ImageStyle;
  label?: String;
  rightImg?: Image;
  rightImgStyle?: ImageStyle;
  rightImgStyleView?: ViewStyle;
  onPress: () => void;
}

const CardUI = (props: Props) => {
  return (
    <TouchableOpacity
      style={[AppStyles.shadowCommon, styles.container]}
      onPress={props?.onPress}>
      <View style={styles.imgCon}>
        <Image
          source={
            props?.leftImg ? props?.leftImg : AppImages.Common.placeholderImg
          }
          style={[styles.leftImg, props?.leftImgStyle]}
        />
      </View>
      <View style={styles.bar} />
      <View
        style={{
          flex: 1,
          marginRight: normalized(50),
        }}>
        <Text style={styles.label}>{props?.label}</Text>
      </View>
      <View style={[styles.rightImgCon, props?.rightImgStyleView]}>
        <Image
          source={
            props?.rightImg ? props.rightImg : AppImages.Common.rightArrow
          }
          style={[styles.leftImg, props?.rightImgStyle]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CardUI;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white.white,
    width: '90%',
    alignSelf: 'center',
    height: formFieldsHeight,
    borderRadius: normalized(7),
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalized(10),
    marginBottom: hv(10),
  },
  imgCon: {
    width: normalized(40),
    alignItems: 'center',
  },
  rightImgCon: {
    width: normalized(30),
    height: hv(30),
    right: 0,
    left: normalized(300),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  leftImg: {
    width: normalized(20),
    height: hv(20),
    resizeMode: 'contain',
  },
  bar: {
    width: normalized(1),
    height: hv(30),
    backgroundColor: AppColors.green.dark,
    marginLeft: normalized(10),
    marginRight: normalized(10),
  },
  label: {
    color: AppColors.black.black,
    fontSize: normalized(14),
  },
});
