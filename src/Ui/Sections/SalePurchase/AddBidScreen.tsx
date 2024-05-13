import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import {
  AppColors,
  // Crops,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {Routes} from '../../../Utils/Routes';
import BottomTab from '../../Components/CustomBottomTab/BottomTab';
import {getAllCrops} from '../../../Network/Services/HomeApis';
import {setIsAlertShow, setLoader} from '../../../Redux/reducers/AppReducer';
import {useDispatch, useSelector} from 'react-redux';
import AppLoader from '../../Components/Loader/AppLoader';

const AddBidScreen = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const [productsCate, setproductsCate] = useState([]);

  const fetchCropApi = async () => {
    dispatch(setLoader(true));
    try {
      let response: any = await getAllCrops(selector.isNetConnected);
      response?.success ? setproductsCate(response?.data) : [];
      {
        selector?.isLoaderStart ? <AppLoader /> : null;
      }
      // dispatch(setIsAlertShow({value: true, message: response?.message}));
    } catch (e) {
      console.log('error------> ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchCropApi();
  }, []);
  // console.log('productsCate---------------', productsCate);
  return (
    <View style={AppStyles.MainStyle}>
      <Text style={styles.txt2}>Select Crop</Text>
      {productsCate?.length == 0 && !selector?.isLoaderStart ? (
        <View style={styles.emptyCont}>
          <Text style={styles.emptyTxt}>No Category found!</Text>
        </View>
      ) : (
        <FlatList
          data={productsCate}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `@${item.id}`}
          contentContainerStyle={styles.cardContainer}
          renderItem={({item}: any) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  props.navigation.navigate(Routes.Products.newCrop, {
                    name: item?.name,
                    id: item?.id,
                  });
                }}>
                <Image source={item?.avatar} style={styles.bgImg} />

                <Text style={styles.txt}>{item?.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default AddBidScreen;

const styles = StyleSheet.create({
  txt: {
    fontSize: 14,
    color: AppColors.black.black,
    marginVertical: hv(10),
    textAlign: 'center',
    fontWeight: '500',
  },
  txt2: {
    fontSize: 16,
    color: AppColors.black.black,
    marginVertical: hv(10),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    width: '45%',
    backgroundColor: AppColors.white.white,
    borderRadius: normalized(10),
    marginHorizontal: normalized(10),
    marginVertical: hv(5),
    paddingHorizontal: normalized(10),
  },
  bgImg: {
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: hv(10),
  },
  cardContainer: {
    justifyContent: 'space-between',
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
