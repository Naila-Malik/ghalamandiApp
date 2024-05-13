import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenProps, normalized} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';

const MyShopScreen = (props: ScreenProps) => {
  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="My Shops"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
    </View>
  );
};

export default MyShopScreen;

const styles = StyleSheet.create({});
