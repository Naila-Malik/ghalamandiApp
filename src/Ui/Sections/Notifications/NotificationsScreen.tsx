import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenProps, normalized} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';

const NotificationsScreen = (props: ScreenProps) => {
  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="Notifications"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <Text>NotificationsScreen</Text>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({});
