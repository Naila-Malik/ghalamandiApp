import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenProps, normalized} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';

const TimeLineScreen = (props: ScreenProps) => {
  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="TimeLine"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <Text>TimeLineScreen</Text>
    </View>
  );
};

export default TimeLineScreen;

const styles = StyleSheet.create({});
