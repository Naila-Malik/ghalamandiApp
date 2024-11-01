import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import LogoHeader from '../../Components/Header/LogoHeader';
import {
  AppColors,
  AppImages,
  ScreenProps,
  homeMenuArray,
  hv,
  normalized,
  weatherArray,
} from '../../../Utils/AppConstants';
import Box from '../../Components/Box/Box';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {setLoader, setMainMenuId} from '../../../Redux/reducers/AppReducer';
import {Routes} from '../../../Utils/Routes';
import {getWheatherReq} from '../../../Network/Services/HomeApis';
import {AppRootStore} from '../../../Redux/store/AppStore';
import moment from 'moment';

const HomePage = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const [degree, setDegree] = useState('');
  const date = new Date();
  const kelvinToCelsius = (kelvin: number) => (kelvin - 273.15).toFixed(1);
  const {isNetConnected} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const [weather, setWheather] = useState(weatherArray);

  const fetchWheatherApi = async () => {
    try {
      let response: any = await getWheatherReq(isNetConnected);
      // setDegree(`${kelvinToCelsius(response.list[0].main.temp)}°C`);
      setDegree(`${response?.data?.current?.temp_c}°C`);
      return {
        wind: response?.data?.current?.wind_kph,
        humidity: response?.data?.current?.humidity,
        rain: response?.data?.current?.precip_in,
        cloud: response?.data?.current?.cloud,
        // wind: response.list[0].wind.speed,
        // humidity: response.list[0].main.humidity,
        // rain: `${(response.list[0]?.pop * 100).toFixed(0)}%`,
        // cloud: response.list[0].clouds.all,
      };
    } catch (e) {
      console.log('error------> ', e);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  const getWeatherData = async () => {
    const dynamicData = await fetchWheatherApi();
    if (dynamicData) {
      const updatedData = weather.map(item => {
        switch (item.title) {
          case 'Wind':
            return {...item, label: dynamicData.wind};
          case 'Humidity':
            return {...item, label: dynamicData.humidity};
          case 'Rain':
            return {...item, label: dynamicData.rain};
          case 'Cloud':
            return {...item, label: dynamicData.cloud};
          default:
            return item;
        }
      });
      setWheather(updatedData);
    }
  };

  return (
    <View style={AppStyles.MainStyle}>
      <LogoHeader
        title=" آپ کا آن لائن زرعی بازار"
        day={date?.toLocaleString('en-US', {weekday: 'long'})}
        date={date.getDate()}
        month={date?.toLocaleString('ur', {month: 'long'})}
      />
      <View style={styles.body}>
        <View style={styles.barContainer}>
          <View style={styles.degreeBox}>
            <ImageBackground
              source={AppImages.Home.weatherImg}
              style={styles.Bgimg}>
              <Text style={styles.degreeTxt}>{degree} </Text>
            </ImageBackground>
          </View>
          <FlatList
            data={weather}
            keyExtractor={item => `@${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}: any) => {
              return (
                <Box
                  title={item.title}
                  label={item.label}
                  img={item.icon}
                  containerStyles={styles.menuBox2}
                />
              );
            }}
          />
        </View>
        <View style={styles.banner}>
          <Image
            source={AppImages.Common.bannerImage}
            style={styles.bannerImageStyle}
          />
        </View>
        <FlatList
          data={homeMenuArray}
          keyExtractor={item => `@${item.id}`}
          numColumns={4}
          columnWrapperStyle={styles.contentContainer}
          renderItem={({item}: any) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  dispatch(setMainMenuId(item.id));
                  props.navigation.navigate(Routes.home.homePageNavigation);
                }}>
                <Box
                  label={item.label}
                  img={item.icon}
                  containerStyles={styles.menuBox}
                />
              </TouchableOpacity>
            );
          }}
        />
        <Text style={styles.title}>
          ہمیں یہ نہیں بھولنا چاہیے کہ زمین کی کھیتی انسان کی سب سے اہم محنت
          ہے۔جب کھیتی شروع ہو جائے گی تو دوسرے فنون اس کی پیروی کریں گے۔کسان،اس
          لیے، تہذیب کے بانی ہیں{' '}
        </Text>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  body: {
    marginHorizontal: normalized(10),
    flex: 1,
    marginVertical: hv(20),
  },
  degreeBox: {
    width: normalized(100),
    height: hv(60),
    ...AppStyles.centeredCommon,
  },
  degreeTxt: {
    ...AppStyles.textMedium,
    fontWeight: 'bold',
    fontSize: normalized(25),
    color: AppColors.black.black,
    textAlign: 'center',
    marginTop: hv(30),
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: hv(10),
    marginBottom: hv(10),
  },
  banner: {
    marginTop: hv(20),
    alignSelf: 'center',
    marginBottom: hv(20),
    height: hv(150),
    width: '100%',
  },
  bannerImageStyle: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: normalized(20),
  },
  bottom: {
    marginTop: hv(20),
  },
  Bgimg: {
    width: normalized(90),
    height: hv(90),
  },
  menuBox2: {
    width: normalized(55),
    height: hv(70),
  },
  menuBox: {
    width: normalized(70),
    height: hv(80),
  },
  contentContainer: {
    padding: normalized(10),
  },
  title: {
    fontWeight: '600',
    fontSize: 10,
    color: AppColors.black.black,
  },
});
