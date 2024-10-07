import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';
import {AppColors, ScreenProps} from '../../../Utils/AppConstants';
import {Table, Row, Rows} from 'react-native-table-component';
import {useSelector, useDispatch} from 'react-redux';
import {getSUgarMillRates} from '../../../Network/Services/MandiRates';
import {setLoader} from '../../../Redux/reducers/AppReducer';
import {AppRootStore} from '../../../Redux/store/AppStore';

const SugarMillRate = (props: ScreenProps) => {
  const {isNetConnected} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const tableHead = ['Name', 'Date', 'Rate'];
  const [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();

  const fetchSugarMillRates = async () => {
    dispatch(setLoader(true));
    try {
      let response: any = await getSUgarMillRates(isNetConnected);
      if (response.success) {
        await setTableData(response?.data);
      }
    } catch (e) {
      console.log('error------> ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchSugarMillRates();
  }, []);

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
