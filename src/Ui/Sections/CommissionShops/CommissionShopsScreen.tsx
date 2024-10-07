import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';
import {Routes} from '../../../Utils/Routes';
import {useSelector, useDispatch} from 'react-redux';
import {getAllCShops} from '../../../Network/Services/CommissionShops';
import {setLoader} from '../../../Redux/reducers/AppReducer';
import {AppRootStore} from '../../../Redux/store/AppStore';
import AppLoader from '../../Components/Loader/AppLoader';

const CommissionShopsScreen = (props: ScreenProps) => {
  const [Arr, setArr] = useState([]);
  const {isNetConnected, isLoaderStart, userData} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const dispatch = useDispatch();

  const fetchAlCommissionShops = async () => {
    dispatch(setLoader(true));
    try {
      let response: any = await getAllCShops(isNetConnected);
      setArr(response.data);
    } catch (e) {
      console.log('error------> ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchAlCommissionShops();
  }, []);

  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="Commission Shops"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      {isLoaderStart ? (
        <View style={styles.emptyCont}>
          <AppLoader visible={isLoaderStart} />
        </View>
      ) : Arr?.length == 0 && !isLoaderStart ? (
        <View style={styles.emptyCont}>
          <Text style={styles.emptyTxt}>No Shop found!</Text>
        </View>
      ) : (
        <FlatList
          data={Arr}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `@${index}`}
          contentContainerStyle={styles.cardContainer}
          renderItem={({item}: any) => {
            // console.log('befor adaadaa==========', item);
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  props?.navigation.navigate(Routes.CShop.CShopDetail, {
                    item: item,
                  });
                }}>
                <View style={styles.iconContainer}>
                  <Image
                    source={
                      (item?.images ?? []).length > 0
                        ? item?.images
                        : AppImages.Common.placeholderImg
                    }
                    style={styles.bgImg}
                  />
                  <Text style={[styles.txt, {marginLeft: normalized(10)}]}>
                    {item?.shop_name}
                  </Text>
                  <Image
                    source={AppImages.Common.menuIcon}
                    style={styles.menuIcon}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: hv(10),
                  }}>
                  <Text style={[styles.txt2, {textAlign: 'justify', flex: 1}]}>
                    {item?.about}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: normalized(70),
                      marginHorizontal: normalized(10),
                    }}>
                    <Image
                      source={AppImages.ProductCate.location}
                      style={styles.icon}
                    />
                    <Text numberOfLines={1}>{item?.distance}</Text>
                  </View>
                </View>
                <View
                  style={[
                    AppStyles.horiCommon,
                    {justifyContent: 'space-between'},
                  ]}>
                  <View style={styles.btm}>
                    <Image
                      source={AppImages.Settings.CityIcon}
                      style={[styles.icon, {tintColor: AppColors.black.black}]}
                    />
                    <Text style={[styles.txt2, {marginLeft: normalized(10)}]}>
                      {item?.address}
                    </Text>
                  </View>
                  <View style={styles.btm}>
                    <TouchableOpacity
                      onPress={() => Linking.openURL(`tel:${item.mobile_no}`)}>
                      <Image
                        source={AppImages.Common.phoneIcon}
                        style={styles.icon1}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          `whatsapp://send?text=Hello!I got your number from GhalaMandi App&phone=${item?.whatsapp_no}`,
                        )
                      }>
                      <Image
                        source={AppImages.Home.whatsApp}
                        style={[styles.icon, {tintColor: AppColors.green.dark}]}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default CommissionShopsScreen;

const styles = StyleSheet.create({
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
  icon1: {
    height: hv(25),
    width: normalized(25),
    resizeMode: 'contain',
    tintColor: AppColors.green.dark,
    marginRight: normalized(10),
  },
  card: {
    backgroundColor: AppColors.white.white,
    borderRadius: normalized(10),
    marginHorizontal: normalized(10),
    marginVertical: hv(5),
    padding: normalized(10),
    // paddingBottom: hv(10),
    flex: 1,
  },
  cardContainer: {
    justifyContent: 'space-between',
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
    fontWeight: '500',
    lineHeight: hv(12),
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bgImg: {
    resizeMode: 'contain',
    width: normalized(60),
    height: hv(60),
    borderRadius: normalized(35),
  },
  menuIcon: {
    width: normalized(20),
    height: hv(20),
    resizeMode: 'contain',
    position: 'absolute',
    right: normalized(5),
  },
  btm: {
    flexDirection: 'row',
    marginHorizontal: normalized(10),
    alignItems: 'center',
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
