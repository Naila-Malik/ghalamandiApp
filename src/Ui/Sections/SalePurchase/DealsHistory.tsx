import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import {ScreenProps} from '../../../Utils/AppConstants';
import {Routes} from '../../../Utils/Routes';
import BottomTab from '../../Components/CustomBottomTab/BottomTab';

const DealsHistory = (props: ScreenProps) => {
  return (
    <View style={AppStyles.mainContainer}>
      <Text>DealsHistory</Text>
      <BottomTab
        leftIcon
        onLeftIconPress={() =>
          props.navigation.navigate(Routes.Products.SalePurchase)
        }
        rightIcon
        onRightIconPress={() =>
          props.navigation.navigate(Routes.Products.dealsHistory)
        }
        middleIcon
        onMiddleIconPress={() =>
          props.navigation.navigate(Routes.Products.addBid)
        }
      />
    </View>
  );
};

export default DealsHistory;

const styles = StyleSheet.create({});
