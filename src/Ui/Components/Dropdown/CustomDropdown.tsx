import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
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
  data?: any;
  selectValue?: any;
  oneSelect?: any;
}

const CustomDropdown = (props: Props) => {
  const [option, setOption] = useState(false);

  const selectOption = () => {
    setOption(!option);
  };

  const oneSelectItem = (val: any) => {
    setOption(false);
    props?.oneSelect(val);
  };
  // console.log('data-------', props?.data);
  return (
    <View style={{}}>
      <TouchableWithoutFeedback onPress={selectOption}>
        <View style={styles.inputView}>
          <Text style={{color: AppColors.black.black}}>
            {!!props.selectValue ? props.selectValue.name : 'Choose Option'}
          </Text>
          <Image source={AppImages.Common.DownArrow} style={styles.img} />
        </View>
      </TouchableWithoutFeedback>
      {option && (
        <View style={styles.openDropDown}>
          {props?.data?.map((val: any, i: number) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => oneSelectItem(val)}
                style={styles.optionName}
                key={i}>
                <Text
                  style={{
                    color: AppColors.grey.greyLighterLvl2,
                    lineHeight: hv(28),
                    fontSize: 16,
                  }}>
                  {val?.name}
                </Text>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  inputView: {
    ...AppStyles.horiCommon,
    height: formFieldsHeight,
    borderRadius: 5,
    paddingHorizontal: normalized(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppColors.white.white,
  },
  img: {
    tintColor: AppColors.black.black,
    alignSelf: 'center',
  },
  openDropDown: {
    backgroundColor: AppColors.white.white,
    padding: 10,
    marginVertical: 5,
  },
  optionName: {
    margin: 5,
    padding: 10,
    borderRadius: 4,
    marginVertical: hv(5),
  },
});
