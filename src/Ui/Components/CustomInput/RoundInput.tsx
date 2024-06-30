import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardTypeOptions,
  ViewStyle,
  Platform,
  LayoutAnimation,
  ImageStyle,
  TouchableOpacity,
} from 'react-native';
import {
  AppColors,
  AppImages,
  formFieldsHeight,
  hv,
  normalized,
  ScreenSize,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';

interface Props {
  value?: any;
  onChangeText: (text: string) => void;
  placeholder?: string;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  disabled?: boolean;
  isError?: boolean;
  autoCapitalize?: 'characters' | 'words' | 'sentences' | 'none';
  showError?: string | null;
  showErrorIcon?: boolean;
  isLargeHeighted?: boolean;
  count?: boolean;
  leftIcon?: ImageStyle;
  rightIcon?: ImageStyle;
  rightIconStyle?: ViewStyle;
  onPressRightIcon?: () => void;
}

const RoundInput = (props: Props) => {
  return (
    <>
      <View
        style={[
          styles.inputView,
          props.inputContainerStyle,
          {height: props?.maxLength ? hv(100) : formFieldsHeight},
        ]}>
        {props?.leftIcon && (
          <>
            <Image
              source={
                props?.leftIcon
                  ? props.leftIcon
                  : AppImages.Common.placeholderImg
              }
              style={styles.img}
            />
            <View style={styles.bar} />
          </>
        )}
        <TextInput
          placeholder={props.placeholder ? props.placeholder : ''}
          placeholderTextColor={AppColors.grey.grey}
          value={props.value}
          onChangeText={e => {
            props.onChangeText(e);
          }}
          style={styles.input}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
          editable={props.disabled ? false : true}
          autoCapitalize={
            props.autoCapitalize ? props.autoCapitalize : 'sentences'
          }
          maxLength={props.maxLength}
          multiline={props.isLargeHeighted ? true : false}
        />
        {props?.rightIcon && (
          <TouchableOpacity
            style={props?.rightIconStyle}
            onPress={props?.onPressRightIcon}>
            <Image
              source={
                props?.rightIcon
                  ? props.rightIcon
                  : AppImages.Common.placeholderImg
              }
              style={styles.img1}
            />
          </TouchableOpacity>
        )}
      </View>
      {props?.count && (
        <Text style={styles.count}>
          {props.value.length}/{props?.maxLength}
        </Text>
      )}
    </>
  );
};

export default RoundInput;

const styles = StyleSheet.create({
  inputView: {
    borderRadius: 6,
    paddingHorizontal: normalized(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // height: formFieldsHeight,
    paddingVertical: hv(2),
    backgroundColor: AppColors.white.white,
  },
  input: {
    flex: 1,
    fontSize: normalized(15),
    ...AppStyles.textRegular,
    height: '100%',
    color: AppColors.black.black,
  },
  count: {
    color: AppColors.grey.greyLighterLvl2,
    alignSelf: 'flex-end',
    fontSize: normalized(10),
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
    height: hv(25),
    // backgroundColor: AppColors.grey.grey,
  },
});
