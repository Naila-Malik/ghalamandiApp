import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';
import {useSelector, useDispatch} from 'react-redux';
import NotificationListComp from './NotificationListComp';
import {AppColors, ScreenProps, normalized} from '../../../Utils/AppConstants';

const NotificationsScreen = (props: ScreenProps) => {
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const dispatch = useDispatch();
  const NotificationList = [{}];
  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="Notifications"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <View
        style={{
          flex: 1,
          marginVertical: normalized(5),
        }}>
        {NotificationList?.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={NotificationList}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item}: any) => {
              return (
                <NotificationListComp
                  item={item}
                  atPress={(obj: any) => {
                    // NotifiNavigationScreen(props?.navigation, obj);
                    {
                    }
                  }}
                />
              );
            }}
            onEndReachedThreshold={0.05}
            // onEndReached={async () => {
            //   if (counter.current < totalPages) {
            //     counter.current = counter.current + 1;
            //     await fetchNotiListing();
            //   }
            // }}
            ListFooterComponent={() => {
              return (
                <View
                  style={{
                    marginBottom: 10,
                  }}>
                  {/* {counter.current < totalPages &&
                  NotificationList?.length > 0 ? (
                    <ActivityIndicator
                      size={'small'}
                      color={AppColors.blue.navy}
                    />
                  ) : null} */}
                </View>
              );
            }}
          />
        ) : selector?.isLoaderStart ? null : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: normalized(18),
                color: AppColors.black.black,
                fontWeight: '500',
              }}>
              Notification not found
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({});
