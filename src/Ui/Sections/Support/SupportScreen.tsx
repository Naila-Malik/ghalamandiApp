import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenProps, normalized} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';

const SupportScreen = (props: ScreenProps) => {
  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="Support"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <Text>SupportScreen</Text>
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({});
