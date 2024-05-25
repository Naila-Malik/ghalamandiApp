import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
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

const CityRatesDetail = (props: ScreenProps) => {
  const date = useMemo(() => new Date(), []);
  const {name} = props?.route?.params;
  const arr = [
    {
      name: 'Cotton',
      id: 0,
      min: 6500,
      max: 7500,
      type: 'General',
    },
    // {
    //   name: 'Maze',
    //   id: 1,
    //   min: 6500,
    //   max: 7500,
    // },
  ];
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
        <FlatList
          data={arr}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `@${index}`}
          renderItem={({item}: any) => {
            // console.log('item--------------', item);
            return (
              <View style={styles.card}>
                <View style={styles.nameBox}>
                  <Text style={styles.txt}>{item?.name}</Text>
                  <Text style={{}}>{item?.type}</Text>
                </View>
                <View style={styles.priceBox}>
                  <Text style={styles.txt}>Minimum</Text>
                  <Text style={{}}>{item?.min}</Text>
                </View>
                <View style={styles.priceBox2}>
                  <Text style={styles.txt}>Maximum</Text>
                  <Text style={{}}>{item?.max}</Text>
                </View>
              </View>
            );
          }}
        />
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
});
