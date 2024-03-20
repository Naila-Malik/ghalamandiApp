import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import {AppImages} from '../../../Utils/AppConstants';
import AppHeader from '../../Components/Header/AppHeader';

const SelectLanguage = () => {
  return (
    <View style={AppStyles.MainStyle}>
      <AppHeader title="Select Language" />
      <Text>SelectLanguage</Text>
    </View>
  );
};

export default SelectLanguage;

const styles = StyleSheet.create({});
