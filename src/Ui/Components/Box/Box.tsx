import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import {AppColors, hv, normalized} from '../../../Utils/AppConstants';

interface Props {
  title?: string;
  label?: string;
  img?: any;
  titleStyle?: TextStyle;
  labelStyle?: TextStyle;
  containerStyles?: ViewStyle;
  ImageStyle?: ImageStyle;
}

const Box = (props: Props) => {
  return (
    <View style={[styles.container, props.containerStyles]}>
      <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
      <Image source={props.img} style={[props.ImageStyle, styles.img]} />
      <Text style={[styles.txt, props.labelStyle]}>{props.label}</Text>
    </View>
  );
};

export default Box;

const styles = StyleSheet.create({
  container: {
    ...AppStyles.centeredCommon,
    flex: 1,
    backgroundColor: AppColors.white.white,
    borderRadius: normalized(10),
    marginRight: normalized(10),
  },
  title: {
    // ...AppStyles.textMedium,
    fontWeight: 'bold',
    fontSize: 10,
    color: AppColors.black.black,
  },
  txt: {
    ...AppStyles.textMedium,
    fontSize: 10,
    color: AppColors.black.black,
    marginTop: hv(10),
    textAlign: 'center',
  },
  img: {
    resizeMode: 'contain',
    height: hv(30),
    width: normalized(30),
  },
});
