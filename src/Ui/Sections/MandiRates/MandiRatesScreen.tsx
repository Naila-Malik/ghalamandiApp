import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenProps, normalized} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';

const MandiRatesScreen = (props: ScreenProps) => {
  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="Mandi Rates"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
    </View>
  );
};

export default MandiRatesScreen;

const styles = StyleSheet.create({});
