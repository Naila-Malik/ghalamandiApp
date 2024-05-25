import React, {useState} from 'react';
import {View, Image, StyleSheet, ViewStyle, TextInput} from 'react-native';
import {
  AppColors,
  AppImages,
  formFieldsHeight,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';

interface Props {
  value?: string;
  placeholder?: string;
  containerStyle?: ViewStyle;
  onChangeText?: (t: string) => void;
}

const CustomSearchBar = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const toggleFocus = () => {
    setIsFocused(!isFocused);
  };

  return (
    <View style={[styles.inputView, props.containerStyle]}>
      <Image source={AppImages.Common.SearchIcon} style={styles.img} />
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={AppColors.grey.greyLighterLvl2}
        value={props.value}
        onChangeText={props.onChangeText}
        onFocus={() => toggleFocus()}
        onBlur={() => toggleFocus()}
        style={styles.input}
      />
    </View>
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.grey.greyLighter,
    borderRadius: 15,
  },
  inputView: {
    ...AppStyles.horiCommon,
    backgroundColor: AppColors.white.white,
    borderRadius: 15,
    width: '90%',
    alignSelf: 'center',
    height: formFieldsHeight,
    paddingHorizontal: normalized(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    tintColor: AppColors.grey.greyDark,
    alignSelf: 'center',
    marginRight: normalized(10),
    width: normalized(25),
    height: hv(25),
  },
  input: {
    flex: 1,
    fontSize: normalized(15),
    ...AppStyles.textSemiBold,
    height: '100%',
    color: AppColors.black.black,
  },
});
