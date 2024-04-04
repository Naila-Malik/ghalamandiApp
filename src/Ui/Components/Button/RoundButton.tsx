import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  View,
  Image,
  ImageStyle,
  TextStyle,
} from 'react-native';
import {
  AppFonts,
  formFieldsHeight,
  normalized,
} from '../../../Utils/AppConstants';
import {AppStyles} from '../../../Utils/AppStyles';

interface Props {
  title: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  isLighter?: boolean;
  icon?: any;
  iconStyles?: ImageStyle;
  rightImage?: any;
  rightImageStyles?: ImageStyle;
  titleStyle?: TextStyle;
}

const RoundButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={1}
      style={[styles.mainContainer, props.containerStyle]}>
      <View style={styles.innerContainer}>
        <View style={AppStyles.horiCommon}>
          {props.icon && (
            <Image
              source={props.icon}
              resizeMode="contain"
              style={[styles.icon, props.iconStyles]}
            />
          )}

          <Text style={[styles.title, props?.titleStyle]}>{props.title}</Text>
        </View>
        {props.rightImage && (
          <Image
            source={props.rightImage}
            resizeMode="contain"
            style={[styles.rightImage, props.rightImageStyles]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  mainContainer: {
    height: formFieldsHeight + 5,
    justifyContent: 'center',
    paddingHorizontal: normalized(10),
    borderRadius: 10,
  },
  title: {
    fontSize: normalized(16),
    fontFamily: AppFonts.Synonyms.SemiBold,
  },
  icon: {
    height: 22,
    width: 22,
    marginRight: normalized(10),
    marginBottom: 5,
  },
  rightImage: {
    height: 22,
    width: 22,
    marginLeft: normalized(10),
    marginBottom: 5,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
