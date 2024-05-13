import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ScreenProps, normalized} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';

const CommissionShopsScreen = (props: ScreenProps) => {
  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="Commission Shops"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <Text>CommissionShopsScreen</Text>
    </View>
  );
};

export default CommissionShopsScreen;

const styles = StyleSheet.create({});
