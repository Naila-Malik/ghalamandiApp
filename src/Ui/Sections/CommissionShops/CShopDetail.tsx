import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';
import {formateDate} from '../../../Utils/helper';
import RoundButton from '../../Components/Button/RoundButton';

const CShopDetail = (props: ScreenProps) => {
  let item = props?.route?.params?.item;
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
  // console.log('item====================', item);
  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="Shop Details"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <View style={{flex: 1}}>
        <View style={styles.card}>
          <Image
            source={
              (item?.images ?? []).length > 0
                ? item?.images
                : AppImages.Common.placeholderImg
            }
            style={styles.imgCard}
          />
          <View>
            <Image
              source={
                (item?.images ?? []).length > 0
                  ? item?.images
                  : AppImages.Common.placeholderImg
              }
              style={styles.imgLogo}
            />
          </View>
          <Text style={styles.txt}>{item?.nameShop}</Text>
          <Text style={[styles.txt, {marginVertical: hv(10)}]}>
            F7M4 Multan road, Mustafa Town, Lahore, Punjab. Pakistan
          </Text>
          <View style={styles.btm}>
            <Image
              source={AppImages.Settings.CityIcon}
              style={[styles.icon, {tintColor: AppColors.black.black}]}
            />
            <Text style={[styles.txt2, {marginLeft: normalized(10)}]}>
              {item?.address}
            </Text>
          </View>
        </View>
        <View style={[styles.btm, {justifyContent: 'space-evenly'}]}>
          <View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${item.PNumber}`)}>
                <Image
                  source={AppImages.Common.phoneIcon}
                  style={styles.icon1}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.txt}>Mobile</Text>
          </View>
          <View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `whatsapp://send?text=Hello!I got your number from GhalaMandi App&phone=${item?.PNumber}`,
                  )
                }>
                <Image source={AppImages.Home.whatsApp} style={styles.icon1} />
              </TouchableOpacity>
            </View>
            <Text style={styles.txt}>WhatsApp</Text>
          </View>
          <View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `whatsapp://send?text=Hello!I got your number from GhalaMandi App&phone=${item?.PNumber}`,
                  )
                }>
                <Image
                  source={AppImages.Settings.AddressIcon}
                  style={styles.icon1}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.txt}>Address</Text>
          </View>
        </View>
        <RoundButton
          title="Purchase Rates"
          onPress={() => {}}
          containerStyle={styles.Btn}
          titleStyle={{color: AppColors.white.white}}
        />
        <FlatList
          data={arr}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `@${index}`}
          renderItem={({item}: any) => {
            // console.log('item--------------', item);
            return (
              <View style={styles.card1}>
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
    </View>
  );
};

export default CShopDetail;

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.white.white,
    borderRadius: normalized(20),
    // flex: 1,
    paddingHorizontal: normalized(10),
  },
  imgCard: {
    resizeMode: 'contain',
    width: '100%',
    height: hv(170),
    alignSelf: 'center',
    marginVertical: hv(10),
    backgroundColor: 'yellow',
  },
  imgLogo: {
    resizeMode: 'contain',
    width: normalized(70),
    height: hv(70),
    zIndex: 10,
    marginTop: hv(-50),
    marginBottom: hv(10),
    marginHorizontal: normalized(10),
    borderRadius: normalized(50),
  },

  TxtBG: {
    marginTop: hv(10),
    width: '90%',
    paddingVertical: hv(10),
  },
  txt: {
    fontSize: normalized(16),
    color: AppColors.black.black,
    fontWeight: 'bold',
  },
  txt1: {
    fontSize: normalized(14),
    color: AppColors.black.black,
    marginTop: hv(10),
    fontWeight: '700',
  },
  txt2: {
    fontSize: normalized(12),
    color: AppColors.black.black,
    fontWeight: '400',
  },
  innerText: {
    color: AppColors.green.dark,
    fontSize: normalized(12),
  },
  TxtBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btm: {
    flexDirection: 'row',
    marginHorizontal: normalized(10),
    alignItems: 'center',
    // flex: 1,
    padding: hv(10),
  },
  icon: {
    height: hv(20),
    width: normalized(20),
    resizeMode: 'contain',
  },
  icon1: {
    height: hv(30),
    width: normalized(30),
    resizeMode: 'contain',
    tintColor: AppColors.black.black,
    marginRight: normalized(10),
  },
  btnContainer: {
    width: normalized(60),
    height: hv(60),
    backgroundColor: AppColors.white.white,
    marginHorizontal: normalized(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalized(30),
  },
  Btn: {
    width: '100%',
    backgroundColor: AppColors.green.dark,
    alignItems: 'center',
    marginVertical: hv(10),
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
  card1: {
    flex: 1,
    paddingHorizontal: normalized(10),
    flexDirection: 'row',
  },
});
