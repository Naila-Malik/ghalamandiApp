import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenProps, normalized} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';

const PremiumServicesScreen = (props: ScreenProps) => {
  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="Premium Services"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <Text>PremiumServicesScreen</Text>
    </View>
  );
};

export default PremiumServicesScreen;

const styles = StyleSheet.create({});
