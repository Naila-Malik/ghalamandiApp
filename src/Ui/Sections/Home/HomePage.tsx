import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import LogoHeader from '../../Components/Header/LogoHeader';
import {
  AppColors,
  AppImages,
  homeMenuArray,
  hv,
  normalized,
  weatherArray,
} from '../../../Utils/AppConstants';
import Box from '../../Components/Box/Box';
import {TouchableOpacity} from 'react-native-gesture-handler';

const weather = {
  degree: '13.0',
  wind: 15.1,
  humidity: '80%',
  rain: '0.002m',
  cloud: '80%',
};

const HomePage = () => {
  return (
    <View style={AppStyles.MainStyle}>
      <LogoHeader
        title=" آپ کا آن لائن زرعی بازار"
        day="Monday"
        date="26"
        month="فروری"
      />
      <View style={styles.body}>
        <View style={styles.barContainer}>
          <View style={styles.degreeBox}>
            <ImageBackground
              source={AppImages.Home.weatherImg}
              style={styles.Bgimg}>
              <Text style={styles.degreeTxt}>{`${weather.degree} `} </Text>
            </ImageBackground>
          </View>
          <FlatList
            data={weatherArray}
            keyExtractor={item => `@${item.id}`}
            horizontal
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
          <Image source={AppImages.Common.bannerImage} />
        </View>
        <FlatList
          data={homeMenuArray}
          keyExtractor={item => `@${item.id}`}
          numColumns={4}
          columnWrapperStyle={styles.contentContainer}
          renderItem={({item}: any) => {
            return (
              <TouchableOpacity>
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
    fontSize: 30,
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
    marginBottom: hv(30),
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