import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenProps, normalized} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';

const InboxScreen = (props: ScreenProps) => {
  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="Inbox"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <Text>InboxScreen</Text>
    </View>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({});
