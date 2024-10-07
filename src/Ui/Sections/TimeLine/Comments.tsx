import {FlatList, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {
  normalized,
  AppImages,
  AppColors,
  hv,
  ScreenProps,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import RoundInput from '../../Components/CustomInput/RoundInput';
import AppHeader from '../../Components/Header/AppHeader';
import AppLoader from '../../Components/Loader/AppLoader';
import {
  getComments,
  postNewComment,
} from '../../../Network/Services/TimeLineApis';
import {setIsAlertShow, setLoader} from '../../../Redux/reducers/AppReducer';
import moment from 'moment';

const Comments = (props: ScreenProps) => {
  const [Arr, setArr] = useState([]);
  const {id} = props?.route?.params;
  // const flatListRef = useRef();
  const {isNetConnected, isLoaderStart, userData} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const fetchComments = async (id: number) => {
    const body = {
      post_id: id,
    };
    dispatch(setLoader(true));
    try {
      let response: any = await getComments(isNetConnected, body);
      if (response.success) {
        await setArr(response.data);
      }
    } catch (e) {
      console.log('error------> ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const postCommentReq = async (postId: number) => {
    const body = {
      post_id: postId,
      comment: comment,
    };
    try {
      let response: any = await postNewComment(isNetConnected, body);
      if (response.success) {
        setArr(prevComments => [...prevComments, {comment}]);
        // flatListRef.current.scrollToEnd({animated: true});
      }
      setComment('');
      dispatch(setIsAlertShow({value: true, message: response?.message}));
    } catch (e) {
      console.log('error------> ', e);
    }
  };

  useEffect(() => {
    if (id) {
      fetchComments(id);
    }
  }, []);

  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="Comments"
        leftIcon
        onLeftIconPress={() => props?.navigation.goBack()}
        rightIconStyles={{tintColor: AppColors.black.black}}
      />
      <View style={styles.body}>
        {isLoaderStart ? (
          <View style={styles.emptyCont}>
            <AppLoader visible={isLoaderStart} />
          </View>
        ) : Arr?.length == 0 && !isLoaderStart ? (
          <View style={styles.emptyCont}>
            <Text style={styles.emptyTxt}>No Comments yet</Text>
          </View>
        ) : (
          <FlatList
            // ref={flatListRef}
            data={Arr}
            inverted
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `@${index}`}
            renderItem={({item}: any) => {
              return (
                <View style={styles.container}>
                  <View style={styles.MsgContainer}>
                    <Text style={styles.commentTxt}>{item?.comment}</Text>
                    <Text style={styles.timeTxt}>
                      {moment(item?.created_at).format('MMM Do YY')}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
      <View style={{}}>
        <RoundInput
          onChangeText={t => setComment(t)}
          placeholder="Type Here"
          value={comment}
          isLargeHeighted
          rightIcon={AppImages.Common.sendChatIcon}
          onPressRightIcon={() => postCommentReq(id)}
          rightIconStyle={styles.img}
        />
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: normalized(10),
    marginTop: hv(20),
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    bottom: 0,
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
    width: normalized(50),
    // backgroundColor: 'yellow',
    height: hv(50),
  },
  MsgContainer: {
    backgroundColor: AppColors.white.white,
    borderRadius: normalized(10),
    marginVertical: hv(5),
    padding: normalized(10),
  },
  commentTxt: {},
  timeTxt: {
    textAlign: 'left',
    // marginRight: normalized(20),
  },
});
