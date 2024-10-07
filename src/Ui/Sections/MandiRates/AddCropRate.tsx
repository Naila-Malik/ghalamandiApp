import {
  Alert,
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
import {AppRootStore} from '../../../Redux/store/AppStore';
import {addNewRateCityWise} from '../../../Network/Services/MandiRates';
import moment from 'moment';

const AddCropRate = (props: ScreenProps) => {
  let {name, id} = props?.route?.params;
  const dispatch = useDispatch();
  const date = useMemo(() => new Date(), []);
  const {isNetConnected, isLoaderStart} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const [cropTypeDD, setCropTypeDD] = useState([
    {
      id: 0,
      name: '',
    },
  ]);

  const fetchCropTypeDD = async () => {
    dispatch(setLoader(true));
    try {
      let response: any = await getCropTypeDD(isNetConnected, id);
      const transformedArray = response?.data?.map((item: any) => ({
        id: item.id,
        name: item.type_name,
      }));

      setCropTypeDD(transformedArray);
    } catch (e) {
      console.log('error------> ', e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    if (id) {
      fetchCropTypeDD();
    }
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
      // priceDate: new Date(),
      price: 0,
      minPrice: 0,
      maxPrice: 0,
    },
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    // const file = data?.attachments[0];

    let body = {
      crop_id: id,
      categoryType: data?.categoryType.id,
      date: new Date(),
      max_price: data?.maxPrice,
      min_price: data?.minPrice,
    };
    try {
      dispatch(setLoader(true));
      let response: any = await addNewRateCityWise(isNetConnected, body);
      if (response?.success) {
        // props.navigation.navigate(Routes.Products.SalePurchase);
        Alert.alert(`${response?.message}`);
      } else {
        // dispatch(setIsAlertShow({value: true, message: response?.message}));
        Alert.alert(`${response?.message}`);
      }
    } catch (e) {
      console.log('error in add mandi rate ', e);
    }
    // finally {
    //   dispatch(setLoader(false));
    // }
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
        <>
          <Text style={styles.txt}>Price date</Text>
          <View style={styles.inputView}>
            <Text style={[styles.txt, {color: AppColors.grey.grey}]}>{`${moment(
              new Date(),
            ).format('MMM Do YYYY')}`}</Text>
          </View>
        </>
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
    fontWeight: '500',
    textAlign: 'center',
  },
  inputView: {
    borderRadius: 6,
    paddingHorizontal: normalized(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hv(2),
    backgroundColor: AppColors.white.white,
  },
});
