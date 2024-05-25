import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  AppColors,
  AppImages,
  ScreenProps,
  ScreenSize,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';
import CardUI from '../../Components/Card/CardUI';
import {Routes} from '../../../Utils/Routes';
import {LineChart} from 'react-native-chart-kit';

const MandiRatesScreen = (props: ScreenProps) => {
  return (
    <View style={AppStyles.MainStyle}>
      <AppHeader
        title="Mandi Rates"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <View style={styles.body}>
        <CardUI
          label="Today Rates"
          rightImgStyleView={styles.rightImgStyleView}
          onPress={() =>
            props?.navigation.navigate(Routes.MandiRates.MandiTodayRates)
          }
          leftImg={AppImages.MandiRates.todaysRates}
        />
        <CardUI
          label="City wise rates"
          rightImgStyleView={styles.rightImgStyleView}
          onPress={() =>
            props?.navigation.navigate(Routes.MandiRates.CityRates)
          }
          leftImg={AppImages.Settings.CityIcon}
        />
        <CardUI
          label="Feed mills rate"
          rightImgStyleView={styles.rightImgStyleView}
          onPress={() =>
            props?.navigation.navigate(Routes.MandiRates.FeedMillRates)
          }
          leftImg={AppImages.MandiRates.feedMills}
        />
        <CardUI
          label="Sugar mills rate"
          rightImgStyleView={styles.rightImgStyleView}
          onPress={() =>
            props?.navigation.navigate(Routes.MandiRates.SugarMillRates)
          }
          leftImg={AppImages.MandiRates.sugarMills}
        />
        <CardUI
          label="Add crop rates"
          rightImgStyleView={styles.rightImgStyleView}
          onPress={() => props?.navigation.navigate(Routes.MandiRates.ListCrop)}
          leftImg={AppImages.BottomTab.PlusIcon}
          leftImgStyle={{tintColor: AppColors.green.dark}}
        />
        <View style={{marginTop: hv(100)}}>
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={ScreenSize.width}
            height={220}
            chartConfig={{
              backgroundColor: AppColors.grey.greyLighterLvl2,
              backgroundGradientFrom: AppColors.grey.greyLighter,
              backgroundGradientTo: AppColors.grey.greyLighter,
              decimalPlaces: 2, // optional, defaults to 2dp
              // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              color: (opacity = 1) => AppColors.red.dark,
              labelColor: (opacity = 1) => AppColors.grey.greyDark,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default MandiRatesScreen;

const styles = StyleSheet.create({
  body: {
    marginTop: hv(20),
  },
  rightImgStyleView: {
    backgroundColor: AppColors.grey.greyDark,
    borderRadius: normalized(20),
  },
});
