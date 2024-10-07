import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import AppHeader from '../../Components/Header/AppHeader';
import {AppStyles} from '../../../Utils/AppStyles';
import {formateDate} from '../../../Utils/helper';
import {Routes} from '../../../Utils/Routes';
import {getCityRate} from '../../../Network/Services/MandiRates';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {setLoader} from '../../../Redux/reducers/AppReducer';
import AppLoader from '../../Components/Loader/AppLoader';

const CityRatesDetail = (props: ScreenProps) => {
  const date = useMemo(() => new Date(), []);
  const {name, id} = props?.route?.params;
  const [cityRate, setCityRate] = useState([]);
  const {isNetConnected, isLoaderStart} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const dispatch = useDispatch();

  const fetchCityRates = async () => {
    let body = {
      id: id,
    };
    try {
      dispatch(setLoader(true));
      let response: any = await getCityRate(isNetConnected, body);
      response?.success ? setCityRate(response?.data?.city) : [];
    } catch (e) {
      console.log('error------> ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };
  useEffect(() => {
    if (id) {
      fetchCityRates();
    }
  }, []);

  return (
    <ImageBackground
      source={AppImages.Common.BackgrounImage}
      style={styles.bgImg}>
      <View style={AppStyles.MainStyle}>
        <AppHeader
          title={name}
          leftIcon
          onLeftIconPress={() => props?.navigation?.goBack()}
        />
        <View style={styles.dateChip}>
          <Text style={styles.date}>{formateDate(date)}</Text>
        </View>
        {isLoaderStart ? (
          <View style={styles.emptyCont}>
            <AppLoader visible={isLoaderStart} />
          </View>
        ) : cityRate?.length == 0 && !isLoaderStart ? (
          <View style={styles.emptyCont}>
            <Text style={styles.emptyTxt}>No Rate List found!</Text>
          </View>
        ) : (
          <FlatList
            data={cityRate}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `@${index}`}
            renderItem={({item}: any) => {
              return (
                <View style={styles.card}>
                  <View style={styles.nameBox}>
                    <Text style={styles.txt}>{item?.crop_name}</Text>
                    <Text style={{}}>{item?.crop_type_name}</Text>
                  </View>
                  <View style={styles.priceBox}>
                    <Text style={styles.txt}>Minimum</Text>
                    <Text style={{}}>{item?.min_price}</Text>
                  </View>
                  <View style={styles.priceBox2}>
                    <Text style={styles.txt}>Maximum</Text>
                    <Text style={{}}>{item?.max_price}</Text>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default CityRatesDetail;

const styles = StyleSheet.create({
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
  txt: {
    fontSize: 16,
    color: AppColors.black.black,
    fontWeight: 'bold',
  },
  card: {
    flex: 1,
    paddingHorizontal: normalized(10),
    flexDirection: 'row',
  },
  nameBox: {
    flex: 1,
    // backgroundColor: 'yellow',
  },
  priceBox: {
    width: normalized(100),
    // backgroundColor: 'green',
  },
  priceBox2: {
    width: normalized(100),
    // backgroundColor: 'orange',
  },
  bgImg: {
    // flex: 1,
    width: '100%',
    height: '100%',
    // opacity: 0.5,
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
