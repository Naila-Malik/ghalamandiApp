import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import {
  AppImages,
  AppColors,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
const NotificationListComp = (props: any) => {
  const calendarFormatString = 'YYYY-MM-DD HH:mm:ss';

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.outerBox}
        onPress={() => {
          props?.atPress(props?.item);
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Image
              source={AppImages.Common.placeholderImg}
              style={styles.imgP}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleTxt}>{props?.item?.title}</Text>
            <Text style={styles.desTxt}>{props?.item?.description}</Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Text
            style={{
              color: AppColors.black.black,
              marginTop: hv(7),
            }}>
            {/* {moment.utc(props?.item?.created_at, calendarFormatString).local().format('h:mm a MM/DD/YYYY')} */}
            12-2-2024
          </Text>
          {/* <View>
          {props?.item?.type == AppStrings.Notifications.AddToTeam ? (
            <TouchableOpacity
              onPress={() => { }}
              activeOpacity={1}
              style={[
                styles.btn,
                {
                  backgroundColor: AppColors.blue.navy,
                },
              ]}>
              <Text
                style={{
                  color: AppColors.white.white,
                  fontFamily: AppFonts.InstrumentCondensedMedium,
                }}>
                Leave Team
              </Text> 
            </TouchableOpacity>
          ) : null} 
          </View> */}
        </View>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.MainStyle.backgroundColor,
  },
  body: {
    flex: 1,
    marginTop: hv(5),
  },
  outerBox: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.white.whiteOp,
    paddingVertical: normalized(10),
    marginBottom: hv(15),
    width: '90%',
    alignSelf: 'center',
  },
  titleContainer: {
    paddingHorizontal: normalized(10),
    width: normalized(280),
  },
  imgP: {
    width: normalized(50),
    height: normalized(50),
    borderRadius: 25,
  },
  titleTxt: {
    fontSize: normalized(14),
    fontWeight: '500',
    color: AppColors.black.black,
  },
  desTxt: {
    fontSize: normalized(14),
    fontWeight: '400',
    color: AppColors.black.black,
  },
  toTxt: {
    fontSize: normalized(14),
    fontWeight: '500',
    color: AppColors.black.black,
    width: normalized(150),
  },
  btnContainer: {
    flexDirection: 'row-reverse',
    flex: 1,
  },
  btn: {
    width: normalized(120),
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  time: {
    marginLeft: normalized(70),
  },
  containerNo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 322,
    height: 275,
    alignSelf: 'center',
  },
  header: {
    //   fontFamily: AppFonts.InstrumentCondensedMedium,
    marginTop: hv(40),
    fontSize: normalized(22),
    fontWeight: '500',
  },
  txt: {
    //   fontFamily: AppFonts.InstrumentCondensedRegular,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginTop: hv(5),
    fontSize: normalized(14),
    color: '#767D90',
  },
});
export default NotificationListComp;
