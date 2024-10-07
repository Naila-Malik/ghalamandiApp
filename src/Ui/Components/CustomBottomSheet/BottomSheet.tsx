import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Easing,
  Dimensions,
} from 'react-native';
import {AppColors, hv, normalized} from '../../../Utils/AppConstants';
import RoundButton from '../Button/RoundButton';
import RoundInput from '../CustomInput/RoundInput';

const {height} = Dimensions.get('window');

interface Props {
  onPress?: () => void;
  amount?: number;
  setAmount?: (amount: number) => void;
  visible: boolean; // New prop to control the visibility
  onClose: () => void; // New prop to handle closing
}

const BottomSheet = ({amount, setAmount, onPress, visible, onClose}: Props) => {
  const translateY = useRef(new Animated.Value(height)).current; // Initial position off-screen

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0, // Slide up to visible
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height, // Slide down to hidden
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.dimBackground]} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.bottomSheet, {transform: [{translateY}]}]}>
        <View style={styles.TxtBox}>
          <Text style={styles.txt}>Place Bid</Text>
          <Text style={styles.txt1}>
            Please enter your bid amount to participate in the deal.
          </Text>
          <Text style={styles.txt1}>Bid Amount</Text>
        </View>
        <TouchableWithoutFeedback onPress={onPress}>
          <>
            <RoundInput
              value={amount}
              placeholder="2500"
              onChangeText={text => setAmount && setAmount(Number(text))}
            />
            <RoundButton
              title="Submit Bid"
              onPress={onPress}
              containerStyle={styles.button}
              titleStyle={styles.buttonText}
            />
          </>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  dimBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: height * 0.5, // Modal height
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  button: {
    backgroundColor: AppColors.green.dark,
    marginVertical: hv(20),
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
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
    justifyContent: 'space-between',
  },
});

export default BottomSheet;
