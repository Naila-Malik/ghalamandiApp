import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {AppColors, hv, normalized} from '../../../Utils/AppConstants';
import RoundInput from '../CustomInput/RoundInput';
import RoundButton from '../Button/RoundButton';

interface Props {
  onPress?: () => void;
}
const BottomSheet = () => {
  const [amount, setAmount] = useState();
  return (
    <View style={styles.container}>
      <View style={styles.TxtBox}>
        <Text style={styles.txt}>Place Bid</Text>
        <Text style={styles.txt1}>
          Please enter your bid amount to participate into the deal.
        </Text>
        <Text style={styles.txt1}>Bid Amount</Text>
      </View>
      <RoundInput
        value={amount}
        placeholder="2500"
        onChangeText={value => setAmount(value)}
      />
      <RoundButton
        title="Submit Bid"
        onPress={() => {}}
        containerStyle={styles.btn}
        titleStyle={styles.txtBtn}
      />
    </View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    // height: hv(150),
    width: '100%',
    backgroundColor: 'yellow',
    // backgroundColor: AppColors.grey.greyLighter,
    bottom: 0,
    position: 'absolute',
    borderTopLeftRadius: normalized(30),
    borderTopRightRadius: normalized(30),
    paddingHorizontal: normalized(10),
    paddingVertical: hv(20),
  },
  txt: {
    fontSize: normalized(16),
    color: AppColors.black.black,
    fontWeight: 'bold',
  },
  txt1: {
    fontSize: normalized(16),
    color: AppColors.black.black,
    fontWeight: '400',
    lineHeight: normalized(30),
  },
  TxtBox: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  btn: {
    backgroundColor: AppColors.green.dark,
    marginVertical: hv(20),
    alignItems: 'center',
  },
  txtBtn: {
    color: AppColors.white.white,
  },
});
