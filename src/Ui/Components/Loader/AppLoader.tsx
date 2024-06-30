import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {AppColors} from '../../../Utils/AppConstants';

interface Props {
  visible: boolean;
}
const AppLoader = (props: Props) => {
  return (
    <View
      style={{
        // backgroundColor: 'white',
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      }}>
      {props.visible && (
        <ActivityIndicator size="large" color={AppColors.green.dark} />
      )}
    </View>
  );
};

export default AppLoader;
