import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenProps, normalized} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';

const AboutUsScreen = (props: ScreenProps) => {
  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="About Us"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <Text>AboutUsScreen</Text>
    </View>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({});
