import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';
import {useSelector, useDispatch} from 'react-redux';
import {getMyDeals, getUserDeals} from '../../../Network/Services/HomeApis';
import {setLoader} from '../../../Redux/reducers/AppReducer';
import {Routes} from '../../../Utils/Routes';
import RoundButton from '../../Components/Button/RoundButton';
import AppLoader from '../../Components/Loader/AppLoader';
import {formateDate} from '../../../Utils/helper';
import {AppRootStore} from '../../../Redux/store/AppStore';

const InboxScreen = (props: ScreenProps) => {
  const [selected, setSelected] = useState('MyDeals');
  const {isNetConnected, isLoaderStart} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const dispatch = useDispatch();
  // const [Arr, setArr] = useState([]);
  const Arr = [
    {
      name: 'Maher Munir Sb',
      price: 480,
      quantity: 4.5,
      packingType: 'bori',
      date: new Date(),
      crop: 'Potato',
      bids: 0,
      dealType: 'Open',
      image: '',
      PNumber: 923366422267,
    },
  ];

  const fetchMyDeals = async () => {
    try {
      dispatch(setLoader(true));
      let response: any = await getMyDeals(isNetConnected);
      console.log('response-------my-------', response);
      // setArr(response.data);
    } catch (e) {
      console.log('error------> ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const fetchUserDeals = async () => {
    try {
      dispatch(setLoader(true));
      let response: any = await getUserDeals(isNetConnected);
      console.log('response--------user------', response.data);
      // setArr(response.data);
    } catch (e) {
      console.log('error------> ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    {
      selected === 'MyDeals' ? fetchMyDeals() : fetchUserDeals();
    }
  }, [selected]);

  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="Inbox"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <View style={styles.btmCon}>
        <RoundButton
          title="My Deals"
          onPress={() => setSelected('MyDeals')}
          containerStyle={{
            backgroundColor:
              selected === 'MyDeals'
                ? AppColors.green.dark
                : AppColors.white.white,
            marginHorizontal: normalized(30),
          }}
          titleStyle={{
            color:
              selected === 'MyDeals'
                ? AppColors.white.white
                : AppColors.black.black,
          }}
        />
        <RoundButton
          title="Bid Deals"
          onPress={() => setSelected('BidDeals')}
          containerStyle={{
            backgroundColor:
              selected === 'BidDeals'
                ? AppColors.green.dark
                : AppColors.white.white,
            marginHorizontal: normalized(30),
          }}
          titleStyle={{
            color:
              selected === 'BidDeals'
                ? AppColors.white.white
                : AppColors.black.black,
          }}
        />
      </View>
      <View style={styles.body}>
        {isLoaderStart ? (
          <View style={styles.emptyCont}>
            <AppLoader visible={isLoaderStart} />
          </View>
        ) : Arr?.length == 0 && !isLoaderStart ? (
          <View style={styles.emptyCont}>
            <Text style={styles.emptyTxt}>No Product found!</Text>
          </View>
        ) : (
          <FlatList
            data={Arr}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `@${index}`}
            renderItem={({item}: any) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => {
                    props?.navigation.navigate(Routes.Inbox.RealtimeChat, {
                      item: item,
                    });
                  }}>
                  <Image
                    source={
                      (item?.images ?? []).length > 0
                        ? item?.images
                        : AppImages.Common.placeholderImg
                    }
                    style={styles.bgImg}
                  />
                  <View style={styles.bodyHorizontal}>
                    <Text style={styles.txt}>{item.name}</Text>
                    <Text style={styles.txt2}>
                      R.s {item.quantity} k/ {item.price} {item.packingType}
                    </Text>
                    <Text style={styles.txt2}>
                      {item.crop} - Bids : {item.bids}
                    </Text>
                  </View>
                  <View style={styles.bodyHorizontal1}>
                    <Text style={styles.txt2}>02 : 55 AM</Text>
                    <Text style={styles.txt2}>{formateDate(item.date)}</Text>
                    <Text style={styles.txt2}>Deal : {item.dealType}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({
  btmCon: {
    // justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: AppColors.white.white,
    height: hv(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 12,
    color: AppColors.black.black,
    // textAlign: 'center',
    fontWeight: 'bold',
  },
  txt2: {
    fontSize: 12,
    color: AppColors.black.black,
    // marginTop: hv(10),
    fontWeight: '400',
    // lineHeight: hv(12),
  },
  card: {
    backgroundColor: AppColors.white.white,
    borderRadius: normalized(10),
    marginVertical: hv(5),
    padding: normalized(10),
    flexDirection: 'row',
  },
  body: {
    paddingHorizontal: normalized(10),
    marginTop: hv(20),
  },
  bgImg: {
    resizeMode: 'contain',
    width: normalized(50),
    height: hv(50),
    // marginVertical: hv(10),
    borderRadius: normalized(25),
  },
  emptyCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: normalized(150),
  },
  emptyTxt: {
    fontSize: normalized(14),
    fontWeight: '400',
    color: AppColors.black.black,
  },
  bodyHorizontal: {
    flex: 1,
    marginStart: normalized(10),
  },
  bodyHorizontal1: {
    width: normalized(80),
  },
});
