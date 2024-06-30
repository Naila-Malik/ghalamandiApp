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
import CardUI from '../../Components/Card/CardUI';

const AboutUsScreen = (props: ScreenProps) => {
  return (
    <View style={AppStyles.MainStyle}>
      <AppHeader
        title="About Us"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />

      <Text style={styles.txt}>
        {' '}
        E Ghala mandi: Empowering farmers with data-driven insight and
        collaboration. Stay informed with real-time market trends, weather
        forecasts, and connect with a thriving farming community. e ghala
        mandi-Empowering Farmers.{' '}
      </Text>
      <>
        <CardUI
          label="eghalamandi.com"
          rightImgStyleView={styles.rightImgStyleView}
          onPress={() => console.log('btn')}
          leftImg={AppImages.AboutUS.webIcon}
        />
        <CardUI
          label="/eghalamandi "
          rightImgStyleView={styles.rightImgStyleView}
          onPress={() => console.log('btn')}
          leftImg={AppImages.AboutUS.facebookIcon}
        />
        <CardUI
          label="+92-3000479572 "
          rightImgStyleView={styles.rightImgStyleView}
          onPress={() => console.log('btn')}
          leftImg={AppImages.Home.whatsApp}
        />
        <CardUI
          label="@eghalamandi "
          rightImgStyleView={styles.rightImgStyleView}
          onPress={() => console.log('btn')}
          leftImg={AppImages.AboutUS.UtubeIcon}
        />
        <CardUI
          label="/eghalamandi"
          rightImgStyleView={styles.rightImgStyleView}
          onPress={() => console.log('btn')}
          leftImg={AppImages.AboutUS.InstagramIcon}
        />
        <CardUI
          label="@eghalamandi"
          rightImgStyleView={styles.rightImgStyleView}
          onPress={() => console.log('btn')}
          leftImg={AppImages.AboutUS.tiktokIcon}
        />
        <CardUI
          label="Share App"
          rightImgStyleView={styles.rightImgStyleView}
          onPress={() => console.log('btn')}
          leftImg={AppImages.AboutUS.SahreIcon}
        />
      </>
    </View>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  rightImgStyleView: {
    backgroundColor: AppColors.grey.greyDark,
    borderRadius: normalized(20),
  },
  txt: {
    color: AppColors.black.black,
    fontSize: normalized(12),
    fontWeight: '500',
    marginVertical: hv(5),
    textAlign: 'justify',
    padding: normalized(10),
    marginHorizontal: normalized(10),
  },
});
