import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import {
  AppColors,
  Crops,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {Routes} from '../../../Utils/Routes';
import BottomTab from '../../Components/CustomBottomTab/BottomTab';

const AddBidScreen = (props: ScreenProps) => {
  return (
    <View style={AppStyles.MainStyle}>
      <Text style={styles.txt2}>Select Crop</Text>
      <FlatList
        data={Crops}
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
                  name: item?.title,
                  navigation: props.navigation,
                });
              }}>
              <Image source={item?.icon} style={styles.bgImg} />

              <Text style={styles.txt}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <BottomTab
        leftIcon
        onLeftIconPress={() =>
          props.navigation.navigate(Routes.Products.SalePurchase)
        }
        rightIcon
        onRightIconPress={() =>
          props.navigation.navigate(Routes.Products.dealsHistory)
        }
        middleIcon
        onMiddleIconPress={() =>
          props.navigation.navigate(Routes.Products.addBid)
        }
      />
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
});
