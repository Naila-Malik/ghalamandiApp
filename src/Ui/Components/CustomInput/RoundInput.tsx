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
}

const RoundInput = (props: Props) => {
  return (
    <>
      <View style={[styles.inputView, props.inputContainerStyle]}>
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
      </View>
      {props?.count && (
        <Text style={styles.count}>{props.value.length}/100</Text>
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
    height: formFieldsHeight,
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
});
