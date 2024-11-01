import React, {useEffect, useState, useRef} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Pusher from 'pusher-js/react-native';
import {
  AppColors,
  AppImages,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';
import RoundInput from '../../Components/CustomInput/RoundInput';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {getUserChat, sendMsgRequest} from '../../../Network/Services/Inbox';
import {setLoader, setUserChat} from '../../../Redux/reducers/AppReducer';
import moment from 'moment';

const RealtimeChat = (props: ScreenProps) => {
  const {isNetConnected, isLoaderStart, userChat} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const [messages, setMessages] = useState<any>([]); // To store chat messages
  const item = props?.route.params?.item;
  const [deliverStatus, setDeliverStatus] = useState<number | undefined>(
    undefined,
  );
  const dispatch = useDispatch();

  const flatListRef = useRef<FlatList>(null); // FlatList reference

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<any> = async data => {
    if (!data.message.trim()) {
      Alert.alert('Message cannot be empty');
      return;
    }

    let body = {
      message: data?.message,
      receiver_id: item?.receiver_id,
    };

    try {
      let response = await sendMsgRequest(isNetConnected, body);
      if (response?.success) {
        setMessages((prevMessages: any) => [response?.data, ...prevMessages]);
        reset();
        // setDeliverStatus(response?.data?.status);
        dispatch(setUserChat([response?.data, ...userChat]));
        flatListRef?.current?.scrollToEnd({animated: true}); // Scroll to the bottom
      } else {
        Alert.alert(`${response?.message}`);
      }
    } catch (e) {
      console.log('Error sending message: ', e);
    }
  };

  const fetchAllChat = async () => {
    dispatch(setLoader(true));
    let id = item?.receiver_id;
    try {
      let response: any = await getUserChat(isNetConnected, id);
      if (response?.success) {
        setMessages(userChat ?? response?.data);
        flatListRef?.current?.scrollToEnd({animated: false}); // Scroll to the bottom after loading
      }
    } catch (e) {
      console.log('error fetching chat: ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchAllChat();
    const pusher = new Pusher('561d3cddbef4dd4c5886', {
      cluster: 'us3',
    });
    const channel = pusher.subscribe('chat-channel');

    channel.bind('new-message', (data: any) => {
      setMessages((prevMessages: any) => [data, ...prevMessages]);
      flatListRef?.current?.scrollToEnd({animated: true}); // Scroll to the bottom when a new message arrives
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);
  // console.log('user chat==============', userChat);
  const renderItem = ({item}: any) => {
    return (
      <View style={styles.messageContainer}>
        <View
          style={
            item?.alignment === 'left' ? styles.OtherMessage : styles.myMessage
          }>
          <View
            style={{
              flex: 1,
              width: item?.alignment === 'left' ? '90%' : '100%',
            }}>
            <Text
              style={{
                marginStart: normalized(10),
                fontWeight: '600',
                color: AppColors.white.white,
              }}>
              {item?.content}
            </Text>
          </View>
          {Boolean(item?.alignment === 'right') && (
            <View style={styles.tick}>
              <Image
                source={
                  item?.status === '0'
                    ? AppImages.Common.double_black_tick
                    : item?.status === '1'
                    ? AppImages.Common.double_green_tick
                    : AppImages.Common.single_black_tick
                }
                style={styles.icon}
              />
            </View>
          )}
        </View>
        <Text
          style={{
            marginStart: normalized(10),
            color: AppColors.grey.grey,
            textAlign: item?.alignment === 'right' ? 'right' : 'left',
          }}>
          {moment(item?.created_at).fromNow()}
        </Text>
      </View>
    );
  };

  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title={item?.user_name}
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
        rightIcon={AppImages.Common.phoneIcon}
        onRightIconPress={() =>
          Linking.openURL(
            `whatsapp://send?text=Hello! I got your number from GhalaMandi App&phone=${item?.PNumber}`,
          )
        }
        rightIconStyles={{tintColor: AppColors.black.black}}
      />

      <View style={styles.body}>
        {messages.length === 0 ? (
          <View style={styles.emptyCont}>
            <Text style={styles.emptyTxt}>Start chat by sending a message</Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `@${index}`}
            renderItem={renderItem}
            inverted={true}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="message"
          render={({field: {value, onChange}}) => (
            <RoundInput
              onChangeText={onChange}
              placeholder="Type here"
              value={value}
              rightIcon={AppImages.Common.sendChatIcon}
              onPressRightIcon={() => {
                if (value.trim()) {
                  handleSubmit(onSubmit)();
                } else {
                  Alert.alert('Message cannot be empty');
                }
              }}
              rightIconStyle={styles.img}
            />
          )}
        />
      </View>
    </View>
  );
};

export default RealtimeChat;

const styles = StyleSheet.create({
  body: {
    marginTop: hv(10),
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
  img: {
    alignItems: 'center',
    justifyContent: 'center',
    width: normalized(40),
  },
  messageContainer: {
    marginVertical: hv(5),
    padding: normalized(10),
    borderRadius: 10,
  },
  myMessage: {
    fontSize: normalized(14),
    backgroundColor: AppColors.green.dark,
    width: normalized(250),
    alignSelf: 'flex-end',
    flex: 1,
    paddingVertical: hv(10),
    borderTopRightRadius: normalized(10),
    borderTopLeftRadius: normalized(10),
    borderBottomLeftRadius: normalized(10),
    flexDirection: 'row',
  },
  OtherMessage: {
    fontSize: normalized(14),
    backgroundColor: AppColors.grey.greyDark,
    width: normalized(250),
    flex: 1,
    paddingVertical: hv(10),
    borderTopRightRadius: normalized(10),
    borderTopLeftRadius: normalized(10),
    borderBottomRightRadius: normalized(10),
  },
  inputContainer: {
    padding: normalized(10),
  },
  icon: {
    height: hv(10),
    width: normalized(15),
    resizeMode: 'contain',
  },
  tick: {
    height: hv(15),
    width: normalized(15),
    right: 0,
    position: 'absolute',
    margin: normalized(10),
    alignSelf: 'flex-end',
  },
});
