import {FlatList, Image, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';
import {useSelector} from 'react-redux';
import AppLoader from '../../Components/Loader/AppLoader';
import RoundInput from '../../Components/CustomInput/RoundInput';
import {AppRootStore} from '../../../Redux/store/AppStore';

const RealtimeChat = (props: ScreenProps) => {
  const {isNetConnected, isLoaderStart} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const [msg, setMsg] = useState('');
  const {item} = props?.route.params;

  const Arr = [
    // {
    //   name: 'Maher Munir Sb',
    //   price: 480,
    //   quantity: 4.5,
    //   packingType: 'bori',
    //   date: new Date(),
    //   crop: 'Potato',
    //   bids: 0,
    //   dealType: 'Open',
    //   image: '',
    //   PNumber: 923366422267,
    // },
  ];

  // console.log('item----------------', item);
  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title={item?.name}
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
        rightIcon={AppImages.Common.phoneIcon}
        onRightIconPress={() =>
          Linking.openURL(
            `whatsapp://send?text=Hello!I got your number from GhalaMandi App&phone=${item?.PNumber}`,
          )
        }
        rightIconStyles={{tintColor: AppColors.black.black}}
      />
      <View style={styles.body}>
        {isLoaderStart ? (
          <View style={styles.emptyCont}>
            <AppLoader visible={isLoaderStart} />
          </View>
        ) : Arr?.length == 0 && !isLoaderStart ? (
          <View style={styles.emptyCont}>
            <Text style={styles.emptyTxt}>Start chat by sending message</Text>
          </View>
        ) : (
          <FlatList
            data={Arr}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `@${index}`}
            renderItem={({item}: any) => {
              return (
                <View style={{}}>
                  {/* <RoundInput
                    onChangeText={t => setMsg(t)}
                    placeholder="Type Here"
                    value={msg}
                    isLargeHeighted
                    // count
                    // maxLength={100}
                    rightIcon={AppImages.Common.sendChatIcon}
                    onPressRightIcon={() => console.log('send txt')}
                    rightIconStyle={styles.img}
                  /> */}
                </View>
              );
            }}
          />
        )}
      </View>
      <View style={{}}>
        <RoundInput
          onChangeText={t => setMsg(t)}
          placeholder="Type Here"
          value={msg}
          isLargeHeighted
          rightIcon={AppImages.Common.sendChatIcon}
          onPressRightIcon={() => console.log('send txt')}
          rightIconStyle={styles.img}
        />
      </View>
    </View>
  );
};

export default RealtimeChat;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: normalized(10),
    marginTop: hv(20),
    flex: 1,
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
  img: {
    alignItems: 'center',
    justifyContent: 'center',
    width: normalized(40),
  },
});
