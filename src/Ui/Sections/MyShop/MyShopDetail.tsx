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
import {ScreenProps} from 'react-native-screens';
import {
  normalized,
  AppImages,
  hv,
  AppColors,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import RoundButton from '../../Components/Button/RoundButton';
import AppHeader from '../../Components/Header/AppHeader';

type ShopDetailProps = ScreenProps & {
  item: any;
};

const MyShopDetail: React.FC<ShopDetailProps> = ({item, navigation, route}) => {
  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="Shop Details"
        leftIcon
        onLeftIconPress={() => navigation?.goBack()}
      />
      <View style={{flex: 1}}>
        <View style={styles.card}>
          <View style={styles.imgCradCon}>
            <Image
              source={
                item?.bg_image
                  ? {uri: item?.bg_image}
                  : AppImages.Common.placeholderImg
              }
              style={styles.bgImg}
            />
          </View>
          <View style={styles.imgLogoCOn}>
            <Image
              source={
                item?.avatar
                  ? {uri: item?.avatar}
                  : AppImages.Common.placeholderImg
              }
              style={styles.avatarImg}
            />
          </View>
          <Text style={styles.txt}>{item?.nameShop}</Text>
          <Text style={[styles.txt, {marginVertical: hv(10)}]}>
            {item?.about}
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
        <View
          style={[
            styles.btm,
            {justifyContent: 'space-evenly', marginTop: hv(10)},
          ]}>
          <View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${item?.mobile_no}`)}>
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
                    `whatsapp://send?text=Hello!I got your number from GhalaMandi App&phone=${item?.whatsapp_no}`,
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
                onPress={() => Linking.openURL(`https://www.google.com/maps`)}>
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
          // data={arr}
          data={item?.buy_crops}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `@${index}`}
          renderItem={({item}: any) => {
            return (
              <View style={styles.card1}>
                <View style={styles.nameBox}>
                  <Text style={styles.txt}>{item?.crop?.name}</Text>
                  <Text style={{}}>{item?.crop_type?.type_name}</Text>
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
      </View>
    </View>
  );
};

export default MyShopDetail;

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.white.white,
    borderRadius: normalized(20),
    paddingHorizontal: normalized(10),
  },
  imgCradCon: {
    width: '100%',
    height: hv(170),
    alignSelf: 'center',
    marginVertical: hv(10),
    borderWidth: 1.5,
    borderColor: AppColors.grey.greyLighter,
  },
  bgImg: {
    resizeMode: 'contain',
    width: '100%',
    height: hv(170),
  },
  imgLogoCOn: {
    borderWidth: 1.5,
    borderColor: AppColors.white.whiteOp,
    width: normalized(70),
    height: hv(70),
    zIndex: 10,
    marginTop: hv(-50),
    marginBottom: hv(10),
    marginHorizontal: normalized(10),
    borderRadius: normalized(50),
  },
  avatarImg: {
    resizeMode: 'contain',
    width: normalized(70),
    height: hv(70),
    borderRadius: normalized(35),
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
    marginVertical: hv(20),
  },
  nameBox: {
    flex: 1,
  },
  priceBox: {
    width: normalized(100),
  },
  priceBox2: {
    width: normalized(100),
  },
  card1: {
    flex: 1,
    paddingHorizontal: normalized(10),
    flexDirection: 'row',
  },
});
