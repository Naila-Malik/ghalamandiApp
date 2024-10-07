import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {getAllCrops} from '../../../Network/Services/HomeApis';
import {setLoader} from '../../../Redux/reducers/AppReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStore} from '../../../Redux/store/AppStore';
import AppLoader from '../../Components/Loader/AppLoader';

const ListCrop = (props: ScreenProps) => {
  const [crops, setCrops] = useState([]);
  const {isNetConnected, isLoaderStart} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const dispatch = useDispatch();
  const fetchCropApi = async () => {
    dispatch(setLoader(true));
    try {
      let response: any = await getAllCrops(isNetConnected);
      response?.success ? setCrops(response?.data) : [];
    } catch (e) {
      console.log('error------> ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchCropApi();
  }, []);

  return (
    <View style={AppStyles.MainStyle}>
      <AppHeader
        title="Add New Rate"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      {isLoaderStart ? (
        <View style={styles.emptyCont}>
          <AppLoader visible={isLoaderStart} />
        </View>
      ) : crops?.length == 0 && !isLoaderStart ? (
        <View style={styles.emptyCont}>
          <Text style={styles.emptyTxt}>No Crops found!</Text>
        </View>
      ) : (
        <FlatList
          data={crops}
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
      )}
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
});
