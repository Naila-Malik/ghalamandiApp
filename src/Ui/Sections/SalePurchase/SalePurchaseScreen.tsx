import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AllProductsList,
  AppColors,
  AppImages,
  PotatosList,
  ScreenProps,
  hv,
  normalized,
  // productsCate,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import BottomTab from '../../Components/CustomBottomTab/BottomTab';
import {Routes} from '../../../Utils/Routes';
import {useSelector, useDispatch} from 'react-redux';
import {
  getAllCrops,
  getAllPro,
  getProByCrop,
} from '../../../Network/Services/HomeApis';
import {setLoader} from '../../../Redux/reducers/AppReducer';
import {BASE_URL} from '../../../Network/Urls';
import AppLoader from '../../Components/Loader/AppLoader';
import {AppRootStore} from '../../../Redux/store/AppStore';

const SalePurchaseScreen = (props: ScreenProps) => {
  const [selectedItem, setSelectedItem] = useState('salePurchase');
  const [selectedCate, setSelectedCate] = useState(0);
  const [Arr, setArr] = useState([]);
  const [productsCate, setproductsCate] = useState([]);
  const {isNetConnected, isLoaderStart} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const dispatch = useDispatch();

  const fetchCropApi = async () => {
    // dispatch(setLoader(true));
    try {
      let response: any = await getAllCrops(isNetConnected);
      response?.success ? setproductsCate(response?.data) : [];
    } catch (e) {
      console.log('error------> ', e);
    } finally {
      // dispatch(setLoader(false));
    }
  };

  const fetchAllProApi = async () => {
    dispatch(setLoader(true));
    try {
      let response: any = await getAllPro(isNetConnected);
      setArr(response.data);
    } catch (e) {
      console.log('error------> ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchCropApi();
    {
      selectedCate > 0 ? fetchProBYCrop() : fetchAllProApi();
    }
  }, [selectedCate]);

  const fetchProBYCrop = async () => {
    dispatch(setLoader(true));
    try {
      let response: any = await getProByCrop(isNetConnected, selectedCate);
      setArr(response.data);
      // response?.success ? setproductsCate(response?.data) : [];
    } catch (e) {
      console.log('error------> ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <FlatList
      style={AppStyles.MainStyle}
      data={[0]}
      showsVerticalScrollIndicator={false}
      renderItem={({item}: any) => {
        return (
          <>
            <View style={styles.HeadCon}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.goBack();
                }}>
                <View style={styles.backBtn}>
                  <Image
                    source={AppImages.Common.BackIcon}
                    style={styles.img}
                  />
                </View>
              </TouchableOpacity>
              <View style={{marginTop: hv(10)}}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedCate(0);
                  }}>
                  <View style={styles.backBtn2}>
                    <Image
                      source={AppImages.ProductCate.allIcon}
                      style={styles.img}
                    />
                  </View>
                </TouchableOpacity>
                <Text
                  style={[
                    styles.txt,
                    {
                      // marginH: normalized(5),
                      // alignSelf: 'center',
                      marginLeft: normalized(10),
                    },
                  ]}>
                  All
                </Text>
              </View>
              <View style={styles.container}>
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
                            setSelectedCate(item?.id);
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
              </View>
            </View>
            <View style={styles.body}>
              {isLoaderStart ? (
                <View style={styles.emptyCont}>
                  <AppLoader visible={isLoaderStart} />
                </View>
              ) : Arr?.length == 0 && !isLoaderStart ? (
                <View style={styles.emptyCont}>
                  <Text style={styles.emptyTxt}>No Product found!</Text>
                </View>
              ) : (
                <FlatList
                  data={Arr}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => `@${index}`}
                  contentContainerStyle={styles.cardContainer}
                  renderItem={({item}: any) => {
                    return (
                      <TouchableOpacity
                        style={styles.card}
                        onPress={() => {
                          props?.navigation.navigate(
                            Routes.Products.productDetail,
                            {
                              item: item,
                            },
                          );
                        }}>
                        <View style={styles.bgImagCard}>
                          <Image
                            // source={{uri: `${BASE_URL}` + item?.images[0]?.image}}
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
                          <Text style={styles.txt}>{item.crop_id}</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: normalized(100),
                            }}>
                            <Image
                              source={AppImages.ProductCate.location}
                              style={styles.icon}
                            />
                            <Text numberOfLines={1}>{item.stock_location}</Text>
                          </View>
                        </View>
                        <Text
                          style={[styles.txt2, {color: AppColors.green.dark}]}>
                          {item?.crop_type}
                        </Text>
                        <Text style={styles.txt2}>
                          Qty {item?.total_qty} {item?.weight_unit}
                        </Text>
                        <Text style={styles.txt2}>R.s {item.price}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  // ListFooterComponent={
                  //   <View style={{height: hv(10), backgroundColor: 'yellow'}} />
                  // }
                />
              )}
            </View>
          </>
        );
      }}
    />
  );
};

export default SalePurchaseScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.bgColor,
    ...AppStyles.horiCommon,
    marginHorizontal: normalized(10),
    // paddingTop: 10,
    height: 90,
  },
  HeadCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuBox: {
    width: normalized(55),
    height: normalized(55),
    ...AppStyles.centeredCommon,
    backgroundColor: AppColors.white.white,
    borderRadius: normalized(25),
    marginHorizontal: normalized(7),
  },
  backBtn: {
    width: normalized(45),
    height: normalized(45),
    ...AppStyles.centeredCommon,
    backgroundColor: AppColors.white.white,
    borderRadius: normalized(25),
    marginLeft: normalized(15),
    marginBottom: hv(10),
  },
  backBtn2: {
    width: normalized(45),
    height: normalized(45),
    ...AppStyles.centeredCommon,
    backgroundColor: AppColors.white.white,
    borderRadius: normalized(25),
    marginLeft: normalized(15),
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
