import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { AppStyles } from '../../../Utils/AppStyles';
import { AppColors, AppImages, normalized } from '../../../Utils/AppConstants';
import moment from 'moment';

interface Props {
    currentDate: any,
    onMonthChange: (date: any) => void,
    onYearChange: (date: any) => void,
}

const RenderDateSelections = (props: Props) => {
    const renderArrow = (type: 'left' | 'right', pressed: () => void) => {
        return (
            <TouchableWithoutFeedback onPress={() => pressed()}>
                <View style={styles.singleArrowBox}>
                    <Image source={AppImages.Common[type == 'left' ? 'BackIcon' : 'ArrowForward']} style={styles.singleImg} resizeMode='contain' />
                </View>
            </TouchableWithoutFeedback>
        )
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.singleRowBox}>
                {renderArrow('left', () => props.onMonthChange(moment(props.currentDate).subtract(1, 'month')))}
                <Text style={styles.singleText}>{moment(props.currentDate).format('MMMM')}</Text>
                {renderArrow('right', () => props.onMonthChange(moment(props.currentDate).add(1, 'month')))}
            </View>
            <View style={styles.singleRowBox}>
                {renderArrow('left', () => props.onMonthChange(moment(props.currentDate).subtract(1, 'year')))}
                <Text style={styles.singleText}>{moment(props.currentDate).format('YYYY')}</Text>
                {renderArrow('right', () => props.onMonthChange(moment(props.currentDate).add(1, 'year')))}
            </View>
        </View>
    )
}

export default RenderDateSelections;

const styles = StyleSheet.create({
    mainContainer: {
        ...AppStyles.horiCommon,
        justifyContent: 'space-between',
        paddingTop: 25,
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    singleRowBox: {
        ...AppStyles.horiCommon,
    },
    singleArrowBox: {
        height: 25,
        width: 25,
        ...AppStyles.centeredCommon,
    },
    singleImg: {
        height: 15,
        width: 15,
        tintColor: AppColors.blue.mainBlue
    },
    singleText: {
        color: AppColors.black.black,
        ...AppStyles.textSemiBold,
        fontSize: normalized(16),
        marginHorizontal: normalized(10)
    }
})