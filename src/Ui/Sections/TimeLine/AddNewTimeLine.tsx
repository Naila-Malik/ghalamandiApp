import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  AppColors,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import RNFetchBlob from 'rn-fetch-blob';
import {setLoader} from '../../../Redux/reducers/AppReducer';
import RoundInput from '../../Components/CustomInput/RoundInput';
import {useDispatch, useSelector} from 'react-redux';
import RoundButton from '../../Components/Button/RoundButton';
import FileInput from '../../Components/FileInput/FileInput';
import {AppRootStore} from '../../../Redux/store/AppStore';
import {postTimelineRequest} from '../../../Network/Services/TimeLineApis';
import {Routes} from '../../../Utils/Routes';
import AppLoader from '../../Components/Loader/AppLoader';

const AddNewTimeLine = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const {isNetConnected, isLoaderStart} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    // resolver: zodResolver(validationGoalSchema),
    defaultValues: {
      description: '',
      attachments: [],
    },
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const file = data?.attachments[0];
    let body = {
      text: data?.description,
      file: data?.attachments?.length
        ? RNFetchBlob.fs
            .readFile(file.fileCopyUri, 'base64') // Read file as base64
            .then(fileContent => fileContent)
        : [],
    };
    try {
      dispatch(setLoader(true));
      let response: any = await postTimelineRequest(isNetConnected, body);
      if (response?.success) {
        Alert.alert(`${response?.message}`);
        props.navigation.navigate(Routes.Timeline.TimelineHome);
      } else {
        Alert.alert(`${response?.message}`);
      }
    } catch (e) {
      console.log('error in add store ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <View style={[AppStyles.MainStyle, {padding: normalized(10)}]}>
      <AppHeader
        title="Share your idea"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      {isLoaderStart ? (
        <View style={styles.emptyCont}>
          <AppLoader visible={isLoaderStart} />
        </View>
      ) : (
        <View style={styles.body}>
          <Controller
            control={control}
            name="description"
            render={({field: {value, onChange}}) => (
              <>
                <Text style={styles.txt}>Description</Text>
                <RoundInput
                  onChangeText={t => onChange(t)}
                  placeholder="Write your thoughts"
                  value={value}
                  isLargeHeighted
                  count
                  maxLength={250}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="attachments"
            render={({field: {value, onChange}}) => (
              <FileInput value={value} onChange={onChange} />
            )}
          />

          <RoundButton
            title="Add to timeline"
            onPress={handleSubmit(onSubmit)}
            containerStyle={{
              backgroundColor: AppColors.green.dark,
              margin: hv(10),
              alignItems: 'center',
            }}
            titleStyle={{
              color: AppColors.white.white,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default AddNewTimeLine;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  txt: {
    fontSize: 14,
    color: AppColors.black.black,
    marginVertical: hv(10),
    fontWeight: '500',
  },
  emptyCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: normalized(150),
  },
});
