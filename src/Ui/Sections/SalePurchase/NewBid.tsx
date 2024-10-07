import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppStyles} from '../../../Utils/AppStyles';
import AppHeader from '../../Components/Header/AppHeader';
import {
  AppColors,
  ScreenProps,
  hv,
  normalized,
} from '../../../Utils/AppConstants';
import CustomDropdown from '../../Components/Dropdown/CustomDropdown';
import RoundInput from '../../Components/CustomInput/RoundInput';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import FileInput from '../../Components/FileInput/FileInput';
import RoundButton from '../../Components/Button/RoundButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  addStoreRequest,
  getCropTypeDD,
} from '../../../Network/Services/HomeApis';
import {setLoader} from '../../../Redux/reducers/AppReducer';
import DocumentViewer from '../../Modals/document-viewer';
import {useDocument} from '../../../Hooks/use-document';
import RNFetchBlob from 'rn-fetch-blob';
import {Routes} from '../../../Utils/Routes';
import {AppRootStore} from '../../../Redux/store/AppStore';
import AppLoader from '../../Components/Loader/AppLoader';

const NewBid = (props: ScreenProps) => {
  let name = props?.route?.params?.name;
  let id = props?.route?.params?.id;
  const dispatch = useDispatch();
  const {isNetConnected, isLoaderStart} = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const documentViewer = useDocument<string>();
  const [cropTypeDD, setCropTypeDD] = useState([
    {
      id: 0,
      name: '',
    },
  ]);

  const weightUnit = [
    {
      id: 1,
      name: 'kg',
    },
    {
      id: 2,
      name: 'ltr',
    },
    {
      id: 3,
      name: 'packet',
    },
  ];
  const packing = [
    {
      id: 1,
      name: 'open',
    },
    {
      id: 2,
      name: 'close',
    },
  ];

  const fetchCropTypeDD = async () => {
    dispatch(setLoader(true));
    try {
      let response: any = await getCropTypeDD(isNetConnected, id);
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
      weight: '',
      price: 0,
      quantity: 0,
      packing: '',
      location: '',
      description: '',
      moisture: 0.0,
      attachments: [],
    },
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const file = data?.attachments[0];

    let body = {
      crop_id: id,
      crop_type: data?.categoryType.id || 0,
      total_qty: data.quantity || 0,
      weight_unit: data?.weight.name || '',
      stock_location: data?.location || '',
      moisture_percentage: data?.moisture || 0,
      description: data?.description || '',
      price: data?.price || 0,
      packing: data?.packing.name || '',
      images: data?.attachments?.length
        ? RNFetchBlob.fs
            .readFile(file.fileCopyUri, 'base64')
            .then(fileContent => fileContent)
        : [],
    };
    try {
      console.log('data befor sent===========', body);
      dispatch(setLoader(true));
      let response: any = await addStoreRequest(isNetConnected, body);
      if (response?.success) {
        Alert.alert(`${response?.message}`);
        props.navigation.navigate(Routes.Products.SalePurchase);
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
    <ScrollView style={AppStyles.mainContainer}>
      <AppHeader
        title={name}
        leftIcon
        onLeftIconPress={() => props?.navigation?.goBack()}
      />
      {isLoaderStart ? (
        <View style={styles.emptyCont}>
          <AppLoader visible={isLoaderStart} />
        </View>
      ) : (
        <>
          <View style={{paddingHorizontal: normalized(10)}}>
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
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Controller
                control={control}
                name="quantity"
                render={({field: {value, onChange}}) => (
                  <View style={{width: '48%'}}>
                    <Text style={styles.txt}>Total Qty</Text>
                    <RoundInput
                      onChangeText={t => onChange(t)}
                      placeholder="Total Qty"
                      value={value}
                      keyboardType="numeric"
                    />
                  </View>
                )}
              />
              <Controller
                control={control}
                name="weight"
                render={({field: {value, onChange}}) => (
                  <View style={{width: '48%'}}>
                    <Text style={styles.txt}>Weight unit</Text>
                    <CustomDropdown
                      selectValue={value}
                      data={weightUnit}
                      oneSelect={(t: any) => onChange(t)}
                    />
                  </View>
                )}
              />
            </View>
            <Controller
              control={control}
              name="price"
              render={({field: {value, onChange}}) => (
                <>
                  <Text style={styles.txt}>Price/ kg</Text>
                  <RoundInput
                    onChangeText={t => onChange(t)}
                    placeholder="Price/ Kg"
                    value={value}
                    keyboardType="numeric"
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name="packing"
              render={({field: {value, onChange}}) => (
                <>
                  <Text style={styles.txt}>Packing</Text>
                  <CustomDropdown
                    selectValue={value}
                    data={packing}
                    oneSelect={(t: any) => onChange(t)}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name="location"
              render={({field: {value, onChange}}) => (
                <>
                  <Text style={styles.txt}>Stock Location</Text>
                  <RoundInput
                    onChangeText={t => onChange(t)}
                    placeholder="Stock Location"
                    value={value}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name="moisture"
              render={({field: {value, onChange}}) => (
                <>
                  <Text style={styles.txt}>Moisture percentage</Text>
                  <RoundInput
                    onChangeText={t => onChange(t)}
                    placeholder="Enter Moisture percentage"
                    value={value}
                    keyboardType="numeric"
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({field: {value, onChange}}) => (
                <>
                  <Text style={styles.txt}>Description</Text>
                  <RoundInput
                    onChangeText={t => onChange(t)}
                    placeholder="About your crop"
                    value={value}
                    isLargeHeighted
                    count
                    maxLength={100}
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
          </View>
          <RoundButton
            title="Post"
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
        </>
      )}
      <View
        style={{
          height: hv(20),
        }}
      />
    </ScrollView>
  );
};

export default NewBid;

const styles = StyleSheet.create({
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
