import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
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

const NewBid = (props: ScreenProps) => {
  let navigation = props?.route?.params?.navigation;
  let name = props?.route?.params?.name;

  const data = [
    {
      id: 1,
      name: 'user',
    },
    {
      id: 2,
      name: 'Admin',
    },
    {
      id: 3,
      name: 'employee',
    },
  ];

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    // resolver: zodResolver(validationGoalSchema),
    defaultValues: {
      categoryType: '',
      weight: 0,
      price: 0,
      quantity: '',
      packing: '',
      location: '',
      description: '',
      moisture: 0.0,
      // attachments: FileListType,
      attachments: '',
    },
  });

  const onSubmit: SubmitHandler<any> = async () =>
    // data: GoalAssigneeForm,
    console.log('pppppp', data);
  {
    // navigation.replace("apply-business-expense");
  }

  return (
    <ScrollView style={AppStyles.mainContainer}>
      <AppHeader
        title={name}
        leftIcon
        onLeftIconPress={() => navigation?.goBack()}
      />
      <View style={{paddingHorizontal: normalized(10)}}>
        <Controller
          control={control}
          name="categoryType"
          render={({field: {value, onChange}}) => (
            <>
              <Text style={styles.txt}>{name} Type</Text>
              <CustomDropdown
                selectValue={value}
                data={data}
                oneSelect={t => onChange(t)}
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
                  data={data}
                  oneSelect={t => onChange(t)}
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
                data={data}
                oneSelect={t => onChange(t)}
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
            // <FileInput value={value} onChange={onChange} />
            <FileInput />
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
});
