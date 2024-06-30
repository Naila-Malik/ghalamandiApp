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
import {AppRootStore} from '../../../Redux/store/AppStore';
import {useDispatch, useSelector} from 'react-redux';
import AppLoader from '../../Components/Loader/AppLoader';
import {setIsAlertShow, setLoader} from '../../../Redux/reducers/AppReducer';
import {formateDate} from '../../../Utils/helper';
import Share from 'react-native-share';
import {Routes} from '../../../Utils/Routes';
import {
  LikeTimeline,
  getAllTimelines,
} from '../../../Network/Services/TimeLineApis';

const TimeLineScreen = (props: ScreenProps) => {
  const [Arr, setArr] = useState([]);
  const {isNetConnected, isLoaderStart, userData} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const dispatch = useDispatch();

  // const Arr = [
  //   {
  //     id: 1,
  //     name: 'xyz',
  //     date: new Date(),
  //     notes:
  //       'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document ',
  //     likes: 0,
  //     comments: 0,
  //     photo: '',
  //   },
  //   {
  //     id: 2,
  //     name: 'abc',
  //     date: new Date(),
  //     notes:
  //       'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document ',
  //     likes: 0,
  //     comments: 0,
  //     photo: '',
  //   },
  // ];

  const fetchAlTimeLines = async () => {
    dispatch(setLoader(true));
    try {
      let response: any = await getAllTimelines(isNetConnected);
      setArr(response.data);
    } catch (e) {
      console.log('error------> ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const LikeTimeLineReq = async (postId: number) => {
    const body = {
      post_id: postId,
    };
    // dispatch(setLoader(true));
    console.log('body======', body);
    try {
      let response: any = await LikeTimeline(isNetConnected, body);
      console.log('response==============', response);
      dispatch(setIsAlertShow({value: true, message: response?.message}));
    } catch (e) {
      console.log('error------> ', e);
    } finally {
      // dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchAlTimeLines();
  }, []);
  // const Options = async () => {
  const Options = {
    title: 'Share file',
    message: 'Test sharing the app with external link',
    url: 'https://google.com',
  };
  // console.log('userData----------', userData);
  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="TimeLine"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <TouchableOpacity
        style={styles.header}
        onPress={() =>
          props?.navigation.navigate(Routes.Timeline.AddNewTimeLine)
        }>
        {isLoaderStart ? (
          <View style={styles.imgCon}>
            <AppLoader visible={isLoaderStart} />
          </View>
        ) : (
          <View style={styles.imgCon}>
            <Image source={{uri: userData?.photo}} style={styles.img} />
          </View>
        )}
        <Text style={styles.txt}> whats in your mind</Text>
      </TouchableOpacity>
      <View style={styles.body}>
        {isLoaderStart ? (
          <View style={styles.emptyCont}>
            <AppLoader visible={isLoaderStart} />
          </View>
        ) : Arr?.length == 0 && !isLoaderStart ? (
          <View style={styles.emptyCont}>
            <Text style={styles.emptyTxt}>No TimeLine found!</Text>
          </View>
        ) : (
          <FlatList
            data={Arr}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `@${index}`}
            contentContainerStyle={styles.cardContainer}
            renderItem={({item}: any) => {
              // console.log('item-----------', item);
              return (
                <View style={styles.card}>
                  <View style={styles.header}>
                    <Image
                      source={
                        item?.photo
                          ? item?.photo
                          : AppImages.Settings.PersonIcon
                      }
                      style={styles.personIcon}
                    />
                    <View style={styles.headerTxt}>
                      <Text style={styles.txt1}>{item?.user?.name} </Text>
                      <Text style={styles.txt1}>
                        {formateDate(item.created_at)}{' '}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.txt2}>{item.content} </Text>
                  <View style={styles.cardBottom}>
                    <TouchableOpacity
                      onPress={() => {
                        LikeTimeLineReq(item?.id);
                      }}
                      style={styles.bar}>
                      <Image
                        source={AppImages.Common.likeIcon}
                        style={styles.personIcon1}
                      />
                      <Text style={styles.txt1}>{item.likes} likes </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}} style={styles.bar}>
                      <Image
                        source={AppImages.Common.commentIcon}
                        style={styles.personIcon1}
                      />
                      <Text style={styles.txt1}>{item.comments} comments</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.bar}
                      onPress={() => {
                        Share.open(Options)
                          .then(res => {
                            console.log(res);
                          })
                          .catch(err => {
                            err && console.log(err);
                          });
                      }}>
                      <Image
                        source={AppImages.AboutUS.SahreIcon}
                        style={styles.personIcon1}
                      />
                      <Text style={styles.txt1}>Share </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default TimeLineScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginHorizontal: normalized(10),
    height: hv(60),
    backgroundColor: AppColors.white.white,
    paddingHorizontal: normalized(10),
    alignItems: 'center',
    borderRadius: normalized(10),
  },
  img: {
    width: normalized(50),
    height: hv(50),
    resizeMode: 'contain',
    borderRadius: normalized(35),
    // marginRight: normalized(10),
  },
  imgCon: {
    width: normalized(60),
    height: hv(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  personIcon: {
    width: normalized(30),
    height: hv(30),
    resizeMode: 'contain',
    borderRadius: normalized(25),
    marginRight: normalized(10),
  },
  personIcon1: {
    width: normalized(15),
    height: hv(15),
    resizeMode: 'contain',
    // borderRadius: normalized(25),
    marginRight: normalized(10),
  },
  txt: {
    color: AppColors.grey.grey,
    fontSize: normalized(14),
    fontWeight: '500',
    alignSelf: 'center',
    marginVertical: hv(5),
    borderWidth: 1,
    paddingHorizontal: normalized(30),
    paddingVertical: hv(10),
    borderColor: AppColors.grey.grey,
    borderRadius: normalized(25),
  },
  txt2: {
    color: AppColors.grey.grey,
    fontSize: normalized(14),
    fontWeight: '500',
    // alignSelf: 'center',
    marginHorizontal: hv(10),
  },
  txt1: {
    color: AppColors.black.black,
    fontSize: normalized(14),
    fontWeight: '500',
  },
  card: {
    backgroundColor: AppColors.white.white,
    flex: 1,
    marginVertical: hv(10),
    borderRadius: normalized(10),
  },
  body: {
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
  cardContainer: {
    justifyContent: 'space-between',
  },
  headerTxt: {
    marginStart: normalized(10),
  },
  cardBottom: {
    borderTopWidth: 1,
    marginTop: hv(10),
    borderTopColor: AppColors.grey.grey,
    padding: normalized(10),
    flexDirection: 'row',
    marginVertical: hv(10),
    justifyContent: 'space-between',
  },
  bar: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
