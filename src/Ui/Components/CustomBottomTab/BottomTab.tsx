import {
  Image,
  ImageStyle,
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {
  AppColors,
  AppImages,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../../Utils/Routes';

interface Props {
  leftIcon?: any;
  onLeftIconPress?: () => void;
  middleIcon?: any;
  onMiddleIconPress?: () => void;
  rightIcon?: any;
  onRightIconPress?: () => void;
  containerStyles?: ViewStyle;
}

const BottomTab = (props: Props) => {
  const [selectedItem, setSelectedItem] = useState('salePurchase');
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SafeAreaView />
      {props.leftIcon ? (
        <TouchableWithoutFeedback
          onPress={() => {
            // props.onLeftIconPress && props.onLeftIconPress(),
            navigation.navigate(Routes.Products.SalePurchase),
              setSelectedItem('salePurchase');
          }}>
          <View style={styles.ImgBox}>
            <Image
              source={AppImages.BottomTab.CartIcon}
              resizeMode="contain"
              style={[
                styles.Img,
                {
                  tintColor:
                    selectedItem === 'salePurchase'
                      ? AppColors.green.dark
                      : AppColors.grey.greyLighterLvl2,
                },
              ]}
            />
            <Text
              style={[
                styles.txt,
                {
                  color:
                    selectedItem === 'salePurchase'
                      ? AppColors.green.dark
                      : AppColors.grey.greyLighterLvl2,
                },
              ]}>
              Sale Purchase
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View style={{width: normalized(40)}} />
      )}
      {props.middleIcon ? (
        <TouchableWithoutFeedback
          onPress={() => {
            return (
              // props.onMiddleIconPress && props.onMiddleIconPress,
              navigation.navigate(Routes.Products.addBid),
              setSelectedItem('addBid')
            );
          }}>
          <View style={styles.bgBox}>
            <View
              style={[
                styles.middleImgBox,
                {
                  backgroundColor:
                    selectedItem === 'addBid'
                      ? AppColors.green.dark
                      : AppColors.grey.greyLighterLvl2,
                },
              ]}>
              <Image
                source={AppImages.BottomTab.PlusIcon}
                style={styles.Img}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View style={{width: normalized(40)}} />
      )}
      {props.rightIcon ? (
        <TouchableWithoutFeedback
          onPress={() => {
            // props.onRightIconPress,
            navigation.navigate(Routes.Products.dealsHistory),
              setSelectedItem('deals');
          }}>
          <View style={styles.ImgBox}>
            <Image
              source={AppImages.BottomTab.History}
              style={[
                styles.Img,
                {
                  tintColor:
                    selectedItem === 'deals'
                      ? AppColors.green.dark
                      : AppColors.grey.greyLighterLvl2,
                },
              ]}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.txt,
                {
                  color:
                    selectedItem === 'deals'
                      ? AppColors.green.dark
                      : AppColors.grey.greyLighterLvl2,
                },
              ]}>
              Deals history
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View style={{width: normalized(40)}} />
      )}
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    height: hv(60),
    width: '100%',
    bottom: 0,
    position: 'absolute',
    borderTopColor: AppColors.grey.greyLighter,
    borderTopWidth: 1,
    backgroundColor: AppColors.white.white,
    flexDirection: 'row',
    flex: 1,
  },
  Img: {
    height: hv(25),
    width: normalized(25),
    resizeMode: 'contain',
  },
  ImgBox: {
    width: '25%',
    alignItems: 'center',
    paddingTop: hv(5),
  },
  middleImgBox: {
    height: hv(50),
    width: normalized(50),
    borderRadius: normalized(25),
    marginTop: hv(-10),
    ...AppStyles.centeredCommon,
  },
  bgBox: {
    height: hv(80),
    width: '50%',
    borderRadius: normalized(25),
    marginTop: hv(-10),
    backgroundColor: AppColors.white.white,
    alignItems: 'center',
  },
  txt: {
    // ...AppStyles.textMedium,
    fontSize: 12,
    color: AppColors.black.black,
    marginTop: hv(10),
    fontWeight: 'bold',
  },
});
