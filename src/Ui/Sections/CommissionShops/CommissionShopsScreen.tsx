import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ScreenProps} from '../../../Utils/AppConstants';

const CommissionShopsScreen = (props: ScreenProps) => {
  return (
    <View>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Text>CommissionShopsScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommissionShopsScreen;

const styles = StyleSheet.create({});
