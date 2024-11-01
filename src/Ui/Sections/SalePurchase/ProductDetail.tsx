import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
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
import BottomSheet from '../../Components/CustomBottomSheet/BottomSheet';
import {Routes} from '../../../Utils/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {addCropRequest} from '../../../Network/Services/HomeApis';
import {setIsAlertShow, setLoader} from '../../../Redux/reducers/AppReducer';
import {AppRootStore} from '../../../Redux/store/AppStore';
import AppLoader from '../../Components/Loader/AppLoader';
import Carousel from 'react-native-snap-carousel';

const ProductDetail = (props: ScreenProps) => {
  let item = props?.route?.params?.item;
  const [amount, setAmount] = useState<number>();
  const [showModal, setShowModal] = useState(false);
  const carouselRef = useRef();
  const dispatch = useDispatch();
  const {isNetConnected, isLoaderStart} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );

  const handlePress = async () => {
    dispatch(setLoader(true));
    if (!amount || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount to place your bid.');
      return;
    }
    let body = {
      sale_id: item?.id,
      amount: amount,
    };
    try {
      if (amount) {
        let response: any = await addCropRequest(isNetConnected, body);
        if (response?.success) {
          Alert.alert('Bid submitted with amount:', amount?.toString());
          setShowModal(false);
        } else {
        }
        dispatch(setIsAlertShow({value: true, message: response?.message}));
      }
    } catch (e) {
      console.log('error in add store ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const RenderItem = React.memo(({item}: any) => {
    return <Image source={{uri: item?.image}} style={styles.imgCard} />;
  });

  return (
    <View style={AppStyles.MainStyle}>
      <AppHeader
        title={item?.crop_id}
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <View style={{padding: normalized(10), flex: 1}}>
        <View style={styles.card}>
          <View style={styles.imgBG}>
            {item?.images.length > 0 ? (
              <View
                style={{
                  width: normalized(150),
                  height: hv(100),
                }}>
                <Carousel
                  ref={() => carouselRef}
                  // keyExtractor={(imageItem: any) =>
                  //   `@${imageItem.index.toString()}`
                  // }
                  layout={'default'}
                  data={item?.images}
                  renderItem={({item}: any) => <RenderItem item={item} />}
                  sliderWidth={normalized(150)}
                  itemWidth={normalized(150)}
                  autoplay={true}
                  autoplayDelay={500}
                  autoplayInterval={3000}
                  loop={true}
                />
              </View>
            ) : (
              <Image
                source={AppImages.Common.placeholderImg}
                style={styles.imgCard}
              />
            )}
          </View>
          <View style={styles.TxtBG}>
            <View style={styles.TxtBox}>
              <Text style={styles.txt}>
                {item?.crop_id} :{' '}
                <Text style={styles.innerText}> ({item?.crop_type})</Text>{' '}
              </Text>
              <Text style={styles.txt}>
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
        {isLoaderStart ? (
          <View style={styles.emptyCont}>
            <AppLoader visible={isLoaderStart} />
          </View>
        ) : (
          <View style={styles.btnBox}>
            <RoundButton
              title="Chat"
              onPress={() => props.navigation.navigate(Routes.Inbox.InboxHome)}
              containerStyle={styles.Btn}
              titleStyle={{color: AppColors.green.dark}}
            />
            <RoundButton
              title="Place Bid"
              onPress={openModal}
              containerStyle={styles.Btn2}
              titleStyle={{color: AppColors.white.white}}
            />
          </View>
        )}
      </View>
      {showModal && (
        <BottomSheet
          amount={amount}
          setAmount={setAmount}
          onPress={handlePress}
          visible={showModal}
          onClose={closeModal}
        />
      )}
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
    alignItems: 'center',
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
  emptyCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: normalized(150),
  },
});
