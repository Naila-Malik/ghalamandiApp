import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
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

const CityList = (props: ScreenProps) => {
  const [cityCode, setCityCode] = useState(0);
  const [searchValue, setSearchValue] = useState();
  const cities = [
    {
      country: 'PK',
      name: 'Abbottabad',
      lat: '34.1463',
      lng: '73.21168',
      code: 0,
    },
    {
      country: 'PK',
      name: 'Adilpur',
      lat: '27.93677',
      lng: '69.31941',
      code: 1,
    },
    {
      country: 'PK',
      name: 'Ahmadpur East',
      lat: '29.14269',
      lng: '71.25771',
      code: 2,
    },
    {
      country: 'PK',
      name: 'Ahmadpur Sial',
      lat: '30.67791',
      lng: '71.74344',
      code: 3,
    },
    {
      country: 'PK',
      name: 'Akora',
      lat: '34.00337',
      lng: '72.12561',
      code: 4,
    },
  ];

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
      <FlatList
        data={cities}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `@${index}`}
        renderItem={({item}: any) => {
          // console.log('item--------------', item);
          return (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate(Routes.MyShop.MyShopHome, {
                  name: item?.name,
                }),
                  setCityCode(item?.code);
              }}>
              <Text style={styles.txt}>{item?.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CityList;

const styles = StyleSheet.create({
  txt: {
    fontSize: 12,
    color: AppColors.black.black,
    fontWeight: '600',
    marginLeft: normalized(10),
    marginVertical: hv(10),
  },
});
