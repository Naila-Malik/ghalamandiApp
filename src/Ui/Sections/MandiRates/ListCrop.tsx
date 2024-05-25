import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';
import {
  AppColors,
  Crops,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {Routes} from '../../../Utils/Routes';

const ListCrop = (props: ScreenProps) => {
  return (
    <View style={AppStyles.MainStyle}>
      <AppHeader
        title="Add New Rate"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <FlatList
        data={Crops}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `@${index}`}
        contentContainerStyle={styles.cardContainer}
        renderItem={({item}: any) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                props.navigation.navigate(Routes.MandiRates.AddNewRates, {
                  name: item?.title,
                  id: item?.id,
                });
              }}>
              <Image source={item?.icon} style={styles.bgImg} />

              <Text style={styles.txt}>{item?.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ListCrop;

const styles = StyleSheet.create({
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
  txt: {
    fontSize: 14,
    color: AppColors.black.black,
    marginVertical: hv(10),
    textAlign: 'center',
    fontWeight: '500',
  },
});
