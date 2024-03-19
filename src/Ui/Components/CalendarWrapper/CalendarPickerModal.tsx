import React, { useEffect, useState } from 'react';
import CommonModal from '../Model/CommonModal';
import { Calendar } from 'react-native-calendars';
import { AppColors, AppFonts, hv, isAndroid, normalized } from '../../../Utils/AppConstants';
import { AppHorizontalMargin, AppStyles } from '../../../Utils/AppStyles';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import RoundButton from '../Button/RoundButton';
import RenderDateSelections from './RenderDateSelections';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { AppRootStore } from '../../../Redux/store/AppStore';

interface Props {
    onClose: () => void;
    onProceedClick: (date: any) => void;
    onCurrentDaySelect: () => void;
    selectedDay: any;
    minDate?: any;
    existingEventsList?: any,
}

const calendarFormatString = 'YYYY-MM-DD';

const CalendarPickerModal = (props: Props) => {
    const { isNotchDevice } = useSelector((state: AppRootStore) => state.AppReducer)
    const [selectedDate, setSelectedDate] = useState(props.selectedDay || moment());
    const [markedList, setMarkedList] = useState({
        ...props.existingEventsList,
        [moment().format(calendarFormatString)]: { selected: true, marked: true, selectedColor: AppColors.yellow.selectedDayYellow }
    });
    const selectedMarkedObj = {
        [moment(selectedDate).format(calendarFormatString)]: { selected: true, marked: true, selectedColor: AppColors.blue.mainBlue }
    }
    const [currentDate, setCurrentDate] = useState(new Date());
    const formateDate = (dt: any) => {
        return moment(dt).format(calendarFormatString)
    }
    const isSameDay = moment(selectedDate).format(calendarFormatString) == moment().format(calendarFormatString)

    const isSunday = (date: any) => {
        return moment(date).day() === 0;
    };

    const generateSundaysList = () => {
        const curDate = moment(currentDate);
        const currentMonth = curDate.format('YYYY-MM');
        const disabledSundays: any = {};
        const daysInMonth = moment(currentMonth, 'YYYY-MM').daysInMonth();

        const dateFormatString = 'YYYY-MM-DD';

        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${currentMonth}-${day.toString().padStart(2, '0')}`;
            const isBeforeToday = props.minDate && moment(date).isBefore(moment(props.minDate, dateFormatString));
            if (isSunday(date) || isBeforeToday) {
                disabledSundays[date] = { disabled: true, disableTouchEvent: true };
            }
        }
        setMarkedList({
            ...markedList,
            ...disabledSundays,
        })
    }

    useEffect(() => {
        generateSundaysList();
    }, [currentDate])

    return (
        <CommonModal
            onClose={props.onClose}
            isArrowShown={true}
        >
            <View style={styles.headerRow}>
                <Text style={styles.headerSelectedDate}>{moment(selectedDate).format('DD MMM YYYY')} </Text>

                <TouchableWithoutFeedback onPress={props.onCurrentDaySelect} disabled={isSameDay ? true : false}>
                    <View style={[styles.todayBox, { opacity: isSameDay ? 0 : 1 }]}>
                        <Text style={styles.todayText}>Today</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.mainContainer}>
                <Calendar
                    current={formateDate(currentDate)}
                    key={formateDate(currentDate)}
                    markingType={'multi-dot'}
                    hideArrows
                    headerStyle={{
                    }}
                    renderHeader={() => { }}
                    onDayPress={(day) => {
                        setSelectedDate(moment(day.dateString, calendarFormatString));
                    }}
                    theme={{
                        selectedDayTextColor: AppColors.white.white,
                        textDayStyle: styles.commonDayStyles,
                        textDisabledColor: AppColors.grey.lighterLvl2,
                        textDayHeaderFontFamily: AppFonts.Synonyms.Regular,
                        textDayHeaderFontSize: normalized(12),
                        dayTextColor: AppColors.grey.lighterLvl2,
                        textDayFontFamily: AppFonts.Synonyms.Regular,
                        textSectionTitleColor: AppColors.grey.lighterLvl2,
                        textDayHeaderFontWeight: '600',
                        textMonthFontSize: normalized(24),
                        arrowColor: "rgba(119, 136, 153, 1)",
                    }}
                    markedDates={{
                        ...markedList,
                        ...selectedMarkedObj
                    }}
                    disableAllTouchEventsForDisabledDays
                />
                <RenderDateSelections
                    onMonthChange={(dt) => {
                        if (props.minDate && moment(dt).isBefore(moment(props.minDate))) {
                            console.log('Past date! Should not proceed')
                            return;
                        }
                        setCurrentDate(dt);
                    }}
                    onYearChange={setCurrentDate}
                    currentDate={currentDate}
                />
            </View>
            <RoundButton title='Proceed'
                onPress={() => props.onProceedClick(selectedDate)}
                containerStyle={{
                    ...styles.bottomBtn,
                    marginBottom: isAndroid || !isNotchDevice ? 20 : 0
                }} />
        </CommonModal>
    )
}

export default CalendarPickerModal;

const styles = StyleSheet.create({
    mainContainer: {
        borderWidth: 1,
        borderColor: AppColors.grey.borderGrey,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingBottom: 20,
        paddingTop: 25,
        marginHorizontal: AppHorizontalMargin,
        marginTop: 20
    },
    headerRow: {
        ...AppStyles.horiCommon,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: hv(15),
    },
    todayBox: {
        backgroundColor: AppColors.blue.lighterBlue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    headerSelectedDate: {
        color: AppColors.black.lighter,
        fontSize: normalized(16),
        ...AppStyles.textBold,
    },
    todayText: {
        color: AppColors.blue.mainBlue,
        ...AppStyles.textSemiBold,
        fontSize: normalized(13)
    },
    commonDayStyles: {
        color: AppColors.black.lighter,
        fontSize: normalized(11),
        fontWeight: isAndroid ? '800' : '600',
        marginTop: 8,
        marginRight: isAndroid ? 1 : -1,
    },
    bottomBtn: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 15,
    },
})