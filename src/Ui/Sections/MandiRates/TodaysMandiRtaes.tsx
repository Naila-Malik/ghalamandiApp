import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAllCrops} from '../../../Network/Services/HomeApis';
import {setLoader} from '../../../Redux/reducers/AppReducer';
import {AppStyles} from '../../../Utils/AppStyles';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import AppHeader from '../../Components/Header/AppHeader';
import {formateDate} from '../../../Utils/helper';
import {Table, Row, Rows} from 'react-native-table-component';
import AppLoader from '../../Components/Loader/AppLoader';
import {AppRootStore} from '../../../Redux/store/AppStore';

export default function TodaysMandiRtaes(props: ScreenProps) {
  const [productsCate, setproductsCate] = useState([]);
  const {isNetConnected, isLoaderStart} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const dispatch = useDispatch();
  const date = useMemo(() => new Date(), []);
  const tableHead = ['City', 'Minimum', 'Maximum', 'Trend'];
  const tableData = [
    ['Depalpur', '3450', '3450', '4'],
    ['Okara', '3450', '3450', 'd'],
    ['Okara', '3450', '3450', 'd'],
  ];
  const fetchCropApi = async () => {
    dispatch(setLoader(true));
    try {
      let response: any = await getAllCrops(selector.isNetConnected);
      response?.success ? setproductsCate(response?.data) : setproductsCate([]);
    } catch (e) {
      console.log('error------> ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchCropApi();
  }, []);

  return (
    <View style={AppStyles.MainStyle}>
      <AppHeader
        title="Mandi Rates"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <View style={styles.container}>
        {isLoaderStart ? (
          <View style={styles.emptyCont}>
            <AppLoader visible={isLoaderStart} />
          </View>
        ) : productsCate?.length == 0 && !isLoaderStart ? (
          <View style={styles.emptyCont}>
            <Text style={styles.emptyTxt}>No Category found!</Text>
          </View>
        ) : (
          <FlatList
            data={productsCate}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `@${index}`}
            renderItem={({item}: any) => {
              // console.log('item--------------', item);
              return (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      // props.navigation.navigate(item.nav),
                      // setSelectedCate(item?.id);
                    }}>
                    <View style={styles.menuBox}>
                      <Image
                        // source={{uri: item?.avatar}}
                        source={{
                          uri: item?.avatar
                            ? item?.avatar
                            : AppImages.Common.placeholderImg,
                        }}
                        style={styles.img}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.txt,
                      {
                        marginHorizontal: normalized(5),
                      },
                    ]}>
                    {item?.name}
                  </Text>
                </View>
              );
            }}
          />
        )}
      </View>
      <View style={styles.dateChip}>
        <Text style={styles.date}>{formateDate(date)}</Text>
      </View>
      <View style={styles.tblContainer}>
        <Table
          borderStyle={{borderWidth: 2, borderColor: AppColors.green.dark}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text1} />
          <Rows data={tableData} textStyle={styles.text} />
        </Table>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.bgColor,
    ...AppStyles.horiCommon,
    marginHorizontal: normalized(10),
    // paddingTop: 10,
    height: 90,
  },
  menuBox: {
    width: normalized(55),
    height: normalized(55),
    ...AppStyles.centeredCommon,
    backgroundColor: AppColors.white.white,
    borderRadius: normalized(25),
    marginHorizontal: normalized(7),
  },
  txt: {
    fontSize: 12,
    color: AppColors.black.black,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  img: {
    height: hv(25),
    width: normalized(25),
    resizeMode: 'contain',
  },
  dateChip: {
    backgroundColor: AppColors.green.dark,
    alignSelf: 'center',
    width: normalized(170),
    height: hv(30),
    marginVertical: hv(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalized(15),
  },
  date: {
    color: AppColors.white.white,
  },
  tblContainer: {flex: 1, padding: 16, paddingTop: 30},
  head: {height: 40, backgroundColor: AppColors.green.dark},
  text1: {margin: 6, color: AppColors.white.white, textAlign: 'center'},
  text: {margin: 6, textAlign: 'center'},
  emptyCont: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: normalized(150),
  },
  emptyTxt: {
    fontSize: normalized(14),
    fontWeight: '400',
    color: AppColors.black.black,
  },
});
