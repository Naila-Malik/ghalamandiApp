import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {Routes} from '../../../Utils/Routes';
import BottomTab from '../../Components/CustomBottomTab/BottomTab';
import AppHeader from '../../Components/Header/AppHeader';
import RoundButton from '../../Components/Button/RoundButton';
import {getMyDeals, getUserDeals} from '../../../Network/Services/HomeApis';
import {useSelector, useDispatch} from 'react-redux';
import {setLoader} from '../../../Redux/reducers/AppReducer';
import AppLoader from '../../Components/Loader/AppLoader';
import {AppRootStore} from '../../../Redux/store/AppStore';

const DealsHistory = (props: ScreenProps) => {
  const [selected, setSelected] = useState('MyDeals');
  const {isNetConnected, isLoaderStart} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const dispatch = useDispatch();
  const [Arr, setArr] = useState([]);

  const fetchMyDeals = async () => {
    try {
      dispatch(setLoader(true));
      let response: any = await getMyDeals(isNetConnected);
      setArr(response?.data);
    } catch (e) {
      console.log('error------> ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const fetchUserDeals = async () => {
    try {
      dispatch(setLoader(true));
      let response: any = await getUserDeals(isNetConnected);
      setArr(response?.data);
    } catch (e) {
      console.log('error------> ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    {
      selected === 'MyDeals' ? fetchMyDeals() : fetchUserDeals();
    }
  }, [selected]);
  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="Deals History"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <View style={styles.btmCon}>
        <RoundButton
          title="My Deals"
          onPress={() => setSelected('MyDeals')}
          containerStyle={{
            backgroundColor:
              selected === 'MyDeals'
                ? AppColors.green.dark
                : AppColors.white.white,
            marginHorizontal: normalized(30),
          }}
          titleStyle={{
            color:
              selected === 'MyDeals'
                ? AppColors.white.white
                : AppColors.black.black,
          }}
        />
        <RoundButton
          title="Bid Deals"
          onPress={() => setSelected('BidDeals')}
          containerStyle={{
            backgroundColor:
              selected === 'BidDeals'
                ? AppColors.green.dark
                : AppColors.white.white,
            marginHorizontal: normalized(30),
          }}
          titleStyle={{
            color:
              selected === 'BidDeals'
                ? AppColors.white.white
                : AppColors.black.black,
          }}
        />
      </View>
      <View style={styles.body}>
        {isLoaderStart ? (
          <View style={styles.emptyCont}>
            <AppLoader visible={isLoaderStart} />
          </View>
        ) : Arr?.length == 0 && !isLoaderStart ? (
          <View style={styles.emptyCont}>
            <Text style={styles.emptyTxt}>No Bids found!</Text>
          </View>
        ) : (
          <FlatList
            data={Arr}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `@${index}`}
            contentContainerStyle={styles.cardContainer}
            renderItem={({item}: any) => {
              // console.log('arrrrrrrrrrrrrr==============', item);
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => {
                    props?.navigation.navigate(Routes.Products.productDetail, {
                      item: item,
                    });
                  }}>
                  <View style={styles.bgImagCard}>
                    <Image
                      source={
                        (item?.images ?? []).length > 0
                          ? item?.images
                          : AppImages.Common.placeholderImg
                      }
                      style={styles.bgImg}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.txt}>{item.id}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: normalized(100),
                      }}>
                      <Image
                        source={AppImages.ProductCate.location}
                        style={styles.icon}
                      />
                      <Text numberOfLines={1}>
                        {item?.sales?.stock_location}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.txt2, {color: AppColors.green.dark}]}>
                    {item?.crop_name}
                  </Text>
                  <Text style={styles.txt2}>
                    Qty {item?.sales?.total_qty} {item?.sales?.weight_unit}
                  </Text>
                  <Text style={styles.txt2}>R.s {item?.sales?.price}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default DealsHistory;

const styles = StyleSheet.create({
  btmCon: {
    // justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: AppColors.white.white,
    height: hv(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 12,
    color: AppColors.black.black,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  txt2: {
    fontSize: 12,
    color: AppColors.black.black,
    marginTop: hv(10),
    fontWeight: 'bold',
    lineHeight: hv(12),
  },
  img: {
    height: hv(25),
    width: normalized(25),
    resizeMode: 'contain',
  },
  icon: {
    height: hv(20),
    width: normalized(20),
    resizeMode: 'contain',
  },
  card: {
    width: '45%',
    backgroundColor: AppColors.white.white,
    borderRadius: normalized(10),
    marginHorizontal: normalized(10),
    marginVertical: hv(5),
    paddingHorizontal: normalized(10),
    paddingBottom: hv(10),
  },
  cardContainer: {
    justifyContent: 'space-between',
  },
  body: {
    paddingHorizontal: normalized(10),
    marginTop: hv(20),
    flex: 1,
  },
  bgImg: {
    resizeMode: 'contain',
    width: normalized(100),
    height: hv(100),
    marginVertical: hv(10),
  },
  bgImagCard: {
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  emptyCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: normalized(150),
  },
  emptyTxt: {
    fontSize: normalized(14),
    fontWeight: '400',
    color: AppColors.black.black,
  },
});
