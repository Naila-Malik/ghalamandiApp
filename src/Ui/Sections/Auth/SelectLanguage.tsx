import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import AppHeader from '../../Components/Header/AppHeader';
import RoundButton from '../../Components/Button/RoundButton';
import {Routes} from '../../../Utils/Routes';

const SelectLanguage = (props: ScreenProps) => {
  const [selected, setSelected] = useState('Eng');
  return (
    <View style={[AppStyles.MainStyle, styles.container]}>
      <AppHeader title="Select Language" />
      <View style={styles.btmCon}>
        <View>
          <RoundButton
            title="English"
            onPress={() => setSelected('Eng')}
            containerStyle={{
              backgroundColor:
                selected === 'Eng'
                  ? AppColors.green.dark
                  : AppColors.white.white,
            }}
            icon={AppImages.Auth.EngFlag}
            titleStyle={{
              color:
                selected === 'Eng'
                  ? AppColors.white.white
                  : AppColors.black.black,
            }}
            rightImage={selected === 'Eng' ? AppImages.Common.tick : ''}
          />
          <RoundButton
            title="اردو"
            onPress={() => setSelected('Urdu')}
            containerStyle={{
              backgroundColor:
                selected === 'Urdu'
                  ? AppColors.green.dark
                  : AppColors.white.white,
              marginTop: hv(10),
            }}
            icon={AppImages.Auth.pkFlag}
            titleStyle={{
              color:
                selected === 'Urdu'
                  ? AppColors.white.white
                  : AppColors.black.black,
            }}
            rightImage={selected === 'Urdu' ? AppImages.Common.tick : ''}
          />
        </View>
        <RoundButton
          title="Save Changes"
          onPress={() => props.navigation.navigate(Routes.Auth.login)}
          containerStyle={{
            backgroundColor: AppColors.green.dark,
            marginBottom: hv(10),
            alignItems: 'center',
          }}
          titleStyle={{
            color: AppColors.white.white,
          }}
        />
      </View>
    </View>
  );
};

export default SelectLanguage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalized(10),
  },
  btmCon: {
    justifyContent: 'space-between',
    flex: 1,
  },
});
