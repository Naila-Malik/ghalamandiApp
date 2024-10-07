import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';
import {
  AppColors,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import CustomSearchBar from '../../Components/CustomSearchBar/CustomSearchBar';
import {Routes} from '../../../Utils/Routes';
import {CitiesList} from '../../../Utils/helper';
import {useDispatch, useSelector} from 'react-redux';
import {setLoader} from '../../../Redux/reducers/AppReducer';
import {AppRootStore} from '../../../Redux/store/AppStore';
import AppLoader from '../../Components/Loader/AppLoader';

const CityRates = (props: ScreenProps) => {
  const [searchValue, setSearchValue] = useState();
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();
  const {isNetConnected, isLoaderStart} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );

  const fetchCities = async () => {
    dispatch(setLoader(true));
    const citiesData = await CitiesList();
    if (citiesData) {
      setCities(citiesData);
    }
    dispatch(setLoader(false));
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <View style={AppStyles.MainStyle}>
      <AppHeader
        title="City Rates"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <CustomSearchBar
        placeholder="Search for city wise rates"
        value={searchValue}
        onChangeText={(t: any) => setSearchValue(t)}
      />
      <View style={{marginVertical: hv(10)}} />
      {isLoaderStart ? (
        <View style={styles.emptyCont}>
          <AppLoader visible={isLoaderStart} />
        </View>
      ) : cities?.length == 0 && !isLoaderStart ? (
        <View style={styles.emptyCont}>
          <Text style={styles.emptyTxt}>No City found!</Text>
        </View>
      ) : (
        <FlatList
          data={cities}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `@${index}`}
          renderItem={({item}: any) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate(Routes.MandiRates.CityRatesDetail, {
                    id: item?.id,
                    name: item?.name,
                  });
                }}>
                <Text style={styles.txt}>{item?.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default CityRates;

const styles = StyleSheet.create({
  txt: {
    fontSize: 12,
    color: AppColors.black.black,
    fontWeight: '600',
    marginLeft: normalized(10),
    marginVertical: hv(10),
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
