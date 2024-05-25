import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';
import {
  AppColors,
  ScreenProps,
  ScreenSize,
  hv,
} from '../../../Utils/AppConstants';
import {Table, Row, Rows} from 'react-native-table-component';

const SugarMillRate = (props: ScreenProps) => {
  const tableHead = ['City', 'Minimum', 'Maximum', 'Trend'];
  const tableData = [
    ['Depalpur', '3450', '3450', '4'],
    ['Okara', '3450', '3450', 'd'],
    ['Okara', '3450', '3450', 'd'],
  ];
  return (
    <View style={AppStyles.MainStyle}>
      <AppHeader
        title="Sugar Mill Rates"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <View style={styles.tblContainer}>
        <Table
          borderStyle={{borderWidth: 2, borderColor: AppColors.green.dark}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text1} />
          <Rows data={tableData} textStyle={styles.text} />
        </Table>
      </View>
    </View>
  );
};

export default SugarMillRate;

const styles = StyleSheet.create({
  tblContainer: {flex: 1, padding: 16, paddingTop: 30},
  head: {height: 40, backgroundColor: AppColors.green.dark},
  text1: {margin: 6, color: AppColors.white.white, textAlign: 'center'},
  text: {margin: 6, textAlign: 'center'},
});
