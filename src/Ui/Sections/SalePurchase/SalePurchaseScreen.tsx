import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  AllProductsList,
  AppColors,
  AppImages,
  PotatosList,
  ScreenProps,
  hv,
  normalized,
  productsCate,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import BottomTab from '../../Components/CustomBottomTab/BottomTab';
import {Routes} from '../../../Utils/Routes';

const SalePurchaseScreen = (props: ScreenProps) => {
  const [selectedItem, setSelectedItem] = useState('salePurchase');
  const [selectedCate, setSelectedCate] = useState('All');

  const Arr =
    selectedCate === 'All'
      ? AllProductsList
      : selectedCate === 'Potato'
      ? PotatosList
      : [];

  return (
    <View style={AppStyles.MainStyle}>
      <View style={styles.container}>
        <FlatList
          data={productsCate}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `@${item.id}`}
          renderItem={({item}: any) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    // props.navigation.navigate(item.nav),
                    setSelectedCate(item.type);
                  }}>
                  <View style={styles.menuBox}>
                    <Image source={item?.icon} style={styles.img} />
                  </View>
                </TouchableOpacity>
                <Text style={styles.txt}>{item?.title}</Text>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.body}>
        <FlatList
          data={Arr}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `@${item.id}`}
          contentContainerStyle={styles.cardContainer}
          renderItem={({item}: any) => {
            return (
              <TouchableOpacity style={styles.card}>
                <View style={styles.bgImagCard}>
                  <Image source={item?.img} style={styles.bgImg} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.txt}>{item.name}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={AppImages.ProductCate.location}
                      style={styles.icon}
                    />
                    <Text>{item.distance}</Text>
                  </View>
                </View>
                <Text style={[styles.txt2, {color: AppColors.green.dark}]}>
                  {item.category}
                </Text>
                <Text style={styles.txt2}>Qty {item.Qty}</Text>
                <Text style={styles.txt2}>{item.price}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <BottomTab
        leftIcon
        onLeftIconPress={() => {
          setSelectedItem('salePurchase'),
            props.navigation.navigate(Routes.Products.SalePurchase);
        }}
        rightIcon
        onRightIconPress={() => {
          setSelectedItem('deals'),
            props.navigation.navigate(Routes.Products.dealsHistory);
        }}
        middleIcon
        onMiddleIconPress={() => {
          setSelectedItem('addBid'),
            props.navigation.navigate(Routes.Products.addBid);
        }}
      />
    </View>
  );
};

export default SalePurchaseScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.bgColor,
    ...AppStyles.horiCommon,
    marginHorizontal: normalized(15),
    paddingTop: 10,
    height: 90,
  },
  menuBox: {
    width: normalized(45),
    height: normalized(45),
    ...AppStyles.centeredCommon,
    backgroundColor: AppColors.white.white,
    borderRadius: normalized(25),
    marginHorizontal: normalized(7),
  },
  txt: {
    // ...AppStyles.textMedium,
    fontSize: 12,
    color: AppColors.black.black,
    marginTop: hv(10),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  txt2: {
    // ...AppStyles.textMedium,
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
  },
  bgImagCard: {
    height: hv(120),
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
});
