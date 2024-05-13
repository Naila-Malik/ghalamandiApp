import {Image, StyleSheet, Text, View} from 'react-native';
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

const ProductDetail = (props: ScreenProps) => {
  let item = props?.route?.params?.item;
  // console.log('item----------', item);
  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title={item?.crop_id}
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <View style={styles.card}>
        <View style={styles.imgBG}>
          <Image
            source={
              (item?.images ?? []).length > 0
                ? item?.images
                : AppImages.Common.placeholderImg
            }
            style={styles.imgCard}
          />
        </View>
        <View style={styles.TxtBG}>
          <View style={styles.TxtBox}>
            <Text style={styles.txt}>
              {item?.crop_id} :{' '}
              <Text style={styles.innerText}> ({item?.crop_type})</Text>{' '}
            </Text>
            <Text style={styles.txt1}>
              Date :{' '}
              <Text style={styles.txt2}>{formateDate(item?.created_at)}</Text>{' '}
            </Text>
          </View>
          <View style={styles.TxtBox}>
            <Text style={styles.txt1}>
              Demand :{' '}
              <Text style={styles.txt2}>
                {' '}
                {item?.price}/ {item?.weight_unit}
              </Text>{' '}
            </Text>
            <Text style={styles.txt1}>
              Packing : <Text style={styles.txt2}>{item?.packing}</Text>{' '}
            </Text>
          </View>
          <View style={[styles.TxtBox, {marginTop: hv(10)}]}>
            <Text style={styles.txt2}>
              Misture :{' '}
              <Text style={styles.txt2}> {item?.moisture_percentage}%</Text>{' '}
            </Text>
            <Text style={styles.txt2}>
              QTY :{' '}
              <Text style={styles.txt2}>
                {item?.total_qty}
                {item?.weight_unit}
              </Text>{' '}
            </Text>
          </View>
        </View>
      </View>
      <Text style={[styles.txt, {margin: hv(10)}]}>
        {item?.stock_location}{' '}
      </Text>
      <View style={styles.btnBox}>
        <RoundButton
          title="Chat"
          onPress={() => {}}
          containerStyle={styles.Btn}
          titleStyle={{color: AppColors.green.dark}}
        />
        <RoundButton
          title="Place Bid"
          onPress={() => {}}
          containerStyle={styles.Btn2}
          titleStyle={{color: AppColors.white.white}}
        />
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    backgroundColor: AppColors.white.white,
    borderRadius: normalized(20),
  },
  imgCard: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  imgBG: {
    // flex: 1,
    width: '100%',
    height: hv(170),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalized(20),
    marginTop: hv(10),
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
  },
  btnBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 10,
    position: 'absolute',
    paddingHorizontal: normalized(10),
    width: '100%',
    alignSelf: 'center',
  },
  Btn: {
    width: '48%',
    borderColor: AppColors.green.dark,
    borderWidth: 2,
    alignItems: 'center',
  },
  Btn2: {
    width: '48%',
    backgroundColor: AppColors.green.dark,
    alignItems: 'center',
  },
});
