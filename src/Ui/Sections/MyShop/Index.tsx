import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getCShopDetail} from '../../../Network/Services/CommissionShops';
import {setLoader} from '../../../Redux/reducers/AppReducer';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {ScreenProps, normalized} from '../../../Utils/AppConstants';
import MyShopDetail from './MyShopDetail';
import CityList from './CityList';
import AppLoader from '../../Components/Loader/AppLoader';
import CShopDetail from '../CommissionShops/CShopDetail';

const Index = (props: ScreenProps) => {
  const [isShopCreated, setIsShopCreated] = useState<boolean | null>(null);
  const [shopDetail, setShopDetil] = useState({});
  const {isNetConnected, isLoaderStart} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const dispatch = useDispatch();

  const fetchMyShopDetail = async () => {
    if (!isNetConnected) {
      console.warn('No network connection');
      return;
    }

    dispatch(setLoader(true));
    try {
      const response = await getCShopDetail(isNetConnected);
      setIsShopCreated(response?.AlreadyCreated ?? null);
      if (isShopCreated === null) {
        setShopDetil(response?.data);
      }
    } catch (e) {
      console.error('Error fetching shop details:', e);
      setIsShopCreated(null);
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchMyShopDetail();
  }, []);

  if (isLoaderStart) {
    return (
      <View style={styles.loaderContainer}>
        <AppLoader visible={isLoaderStart} />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      {isShopCreated === null ? (
        <MyShopDetail
          item={shopDetail}
          navigation={props.navigation}
          route={props.route}
        />
      ) : (
        <CityList navigation={props.navigation} route={props.route} />
      )}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: normalized(150),
  },
});
