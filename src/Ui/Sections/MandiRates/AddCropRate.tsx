import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';
import {
  AppColors,
  Crops,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import {Routes} from '../../../Utils/Routes';
import {id} from 'date-fns/locale';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import {useDocument} from '../../../Hooks/use-document';
import {
  getCropTypeDD,
  addStoreRequest,
} from '../../../Network/Services/HomeApis';
import {setLoader} from '../../../Redux/reducers/AppReducer';
import RoundButton from '../../Components/Button/RoundButton';
import RoundInput from '../../Components/CustomInput/RoundInput';
import CustomDropdown from '../../Components/Dropdown/CustomDropdown';
import FileInput from '../../Components/FileInput/FileInput';

const AddCropRate = (props: ScreenProps) => {
  let name = props?.route?.params?.name;
  let id = props?.route?.params?.id;
  const dispatch = useDispatch();
  const date = useMemo(() => new Date(), []);
  const selector = useSelector((AppState: any) => AppState.AppReducer);
  const [cropTypeDD, setCropTypeDD] = useState([
    {
      id: 0,
      name: '',
    },
  ]);

  const fetchCropTypeDD = async () => {
    dispatch(setLoader(true));
    try {
      let response: any = await getCropTypeDD(selector.isNetConnected, id);
      const transformedArray = response?.data?.map((item: any) => ({
        id: item.id,
        name: item.type_name,
      }));

      setCropTypeDD(transformedArray);
      // console.log('cropTypeDD--------', cropTypeDD);
    } catch (e) {
      console.log('error------> ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    fetchCropTypeDD();
  }, []);

  // const openFile = (attachmentUrl: string) => {
  //   documentViewer.handleOpen(`${}/${attachmentUrl}`);
  // };
  // console.log('id-------------', id);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    // resolver: zodResolver(validationGoalSchema),
    defaultValues: {
      cropId: id,
      categoryType: 0,
      priceDate: new Date(),
      price: 0,
      minPrice: 0,
      maxPrice: 0,
    },
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const file = data?.attachments[0];

    let body = {
      crop_id: id,
      crop_type: data?.categoryType.id || 0,
      price: data?.price || 0,
    };
    try {
      dispatch(setLoader(true));
      let response: any = await addStoreRequest(selector.isNetConnected, body);
      console.log('respose-----------', response);
      if (response?.success) {
        props.navigation.navigate(Routes.Products.SalePurchase);
      } else {
        console.log('i am in else case');
        // dispatch(setIsAlertShow({value: true, message: response?.message}));
      }
    } catch (e) {
      console.log('error in add store ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };
  return (
    <View style={AppStyles.MainStyle}>
      <AppHeader
        title="Add New Rate"
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      <Text style={[styles.txt1, {color: AppColors.red.dark}]}>
        Rates for your city
      </Text>
      <Text style={styles.txt1}>Your current earned points are : 0</Text>
      <View
        style={{paddingHorizontal: normalized(10), flex: 1, marginTop: hv(10)}}>
        <Controller
          control={control}
          name="categoryType"
          render={({field: {value, onChange}}) => (
            <>
              <Text style={styles.txt}>{name} Type</Text>
              <CustomDropdown
                selectValue={value}
                data={cropTypeDD}
                oneSelect={(t: any) => onChange(t)}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="priceDate"
          render={({field: {value, onChange}}) => (
            <>
              <Text style={styles.txt}>Price date</Text>
              <RoundInput
                onChangeText={(t: any) => onChange(t)}
                placeholder={''}
                value={value}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="minPrice"
          render={({field: {value, onChange}}) => (
            <>
              <Text style={styles.txt}>Min Price</Text>
              <RoundInput
                onChangeText={t => onChange(t)}
                placeholder="500"
                value={value}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="maxPrice"
          render={({field: {value, onChange}}) => (
            <>
              <Text style={styles.txt}>Max Price</Text>
              <RoundInput
                onChangeText={t => onChange(t)}
                placeholder="500"
                value={value}
              />
            </>
          )}
        />
      </View>
      <RoundButton
        title="Post Rate"
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
  );
};

export default AddCropRate;

const styles = StyleSheet.create({
  txt: {
    fontSize: 14,
    color: AppColors.black.black,
    marginVertical: hv(10),
    fontWeight: '500',
  },
  txt1: {
    fontSize: 14,
    color: AppColors.black.black,
    // marginVertical: hv(10),
    fontWeight: '500',
    textAlign: 'center',
  },
});
