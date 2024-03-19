import React, { ReactNode, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import ReactNativeCalendarStrip from 'react-native-calendar-strip';
import { toggleDrawer } from '../../../Redux/reducers/AppReducer';
import { AppImages, AppColors, normalized, AppFonts } from '../../../Utils/AppConstants';
import { AppStyles } from '../../../Utils/AppStyles';
import AppHeader from '../Header/AppHeader';
import CalendarPickerModal from './CalendarPickerModal';
import moment from 'moment';

interface Props {
  selectedDate: any;
  setSelectedDate: (dt: any) => void;
  children: ReactNode;
  noDropdown?: boolean;
  showRowCalendar: boolean;
  setShowRowCalendar: (val: boolean) => void;
  onLeftIconPress?: () => void;
  statusBgColorAppointment?: boolean;
  minimumDate?: any,
  maximumDate?: any,
  existingEventsList?: any
}

const CalendarWrapper = ({
  selectedDate,
  setSelectedDate,
  children,
  noDropdown,
  showRowCalendar,
  setShowRowCalendar,
  onLeftIconPress,
  minimumDate,
  maximumDate,
  existingEventsList
}: Props) => {
  const dispatch = useDispatch();
  const [showCalendarPicker, setShowCalendarPicker] = useState(false);
  const minDate = minimumDate || moment().startOf('month').subtract(18, 'days');
  const maxDate = maximumDate || moment().endOf('month');

  return (
    <View style={styles.mainStyles}>
      <View style={!showRowCalendar && styles.headerShadeStyle}>
        <AppHeader
          isDropDown={noDropdown ? false : true}
          title={noDropdown ? 'Create Appointment' : ''}
          leftIcon={noDropdown ? AppImages.Common.BackIcon : AppImages.Common.Menu}
          leftIconStyles={styles.menuStyles}
          onLeftIconPress={() => onLeftIconPress ? onLeftIconPress() : dispatch(toggleDrawer(true))}
          rightIcon={AppImages.Common.Calendar}
          onRightIconPress={() => setShowCalendarPicker(true)}
          listType='children'
          useLightHeaderColor={showRowCalendar ? true : false}
          containerStyles={{ backgroundColor: showRowCalendar ? AppColors.blue.mainBlue : AppColors.white.white }}
          statusBgColor={showRowCalendar ? AppColors.blue.mainBlue : AppColors.white.white}
        />
        {
          !showRowCalendar &&
          <View style={styles.selectedDateBox}>
            <Text style={styles.selectedDateTxt}>{moment(selectedDate).format('Do MMM, YYYY')}</Text>
          </View>
        }
      </View>
      <View
        style={styles.subContainer}>
        {
          showRowCalendar &&
          <ReactNativeCalendarStrip
            style={styles.calendar}
            calendarHeaderStyle={{
              color: AppColors.white.white
            }}
            dayContainerStyle={styles.dayContainer}
            dayComponentHeight={70}
            dateNumberStyle={styles.dateNumber}
            dateNameStyle={styles.dateName}
            disabledDateNameStyle={[styles.dateName,
            { color: AppColors.white.white }
            ]}
            disabledDateNumberStyle={[styles.dateNumber, {
              color: AppColors.white.white
            }]}
            showMonth={false}
            iconLeft={null}
            iconRight={null}
            selectedDate={selectedDate}
            onDateSelected={setSelectedDate}
            scrollable
            highlightDateContainerStyle={styles.highlightedDayContainer}
            highlightDateNumberStyle={styles.highlightedDateNumber}
            highlightDateNameStyle={styles.highlightedDateName}
            minDate={minDate}
            maxDate={maxDate}
            datesWhitelist={[{
              start: minDate,
              end: maxDate
            }]}
          />
        }
        <View style={[styles.childContainer, !showRowCalendar && { borderTopLeftRadius: 0, borderTopRightRadius: 0 }]}>
          {children}
        </View>
      </View>
      {
        showCalendarPicker &&
        <CalendarPickerModal
          onClose={() => setShowCalendarPicker(false)}
          onProceedClick={dt => {
            setShowCalendarPicker(false);
            setShowRowCalendar(false);
            setSelectedDate(dt);
          }}
          onCurrentDaySelect={() => {
            setShowCalendarPicker(false);
            setShowRowCalendar(true);
            setSelectedDate(moment());
          }}
          selectedDay={selectedDate}
          minDate={minimumDate}
          existingEventsList={existingEventsList}
        />
      }
    </View>
  )
}

export default CalendarWrapper;

const styles = StyleSheet.create({
  mainStyles: {
    ...AppStyles.MainStyle,
  },
  menuStyles: {
    height: '55%',
    width: '55%',
  },
  subContainer: {
    flex: 1,
    backgroundColor: AppColors.blue.mainBlue
  },
  calendar: {
    height: 100,
    paddingTop: 20,
    paddingBottom: 10,
    marginBottom: 5,
  },
  childContainer: {
    flex: 1,
    backgroundColor: AppColors.white.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  dayContainer: {
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  dateNumber: {
    fontSize: normalized(18),
    color: AppColors.purple.lightPurple,
    fontWeight: '900'
  },
  dateName: {
    fontSize: normalized(12),
    color: AppColors.purple.darkPurple,
    fontWeight: '600',
    marginTop: 5
  },
  highlightedDayContainer: {
    backgroundColor: AppColors.yellow.selectedDayYellow,
  },
  highlightedDateNumber: {
    fontSize: normalized(18),
    color: AppColors.white.white,
    fontWeight: '900',
  },
  highlightedDateName: {
    fontSize: normalized(12),
    color: AppColors.white.white,
    fontWeight: '600',
    marginTop: 5
  },
  headerShadeStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1, // Adjust this value to make the shadow lighter
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: AppColors.white.white,
    marginBottom: 15
  },
  selectedDateBox: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: normalized(20),
  },
  selectedDateTxt: {
    fontFamily: AppFonts.Synonyms.Bold,
    fontSize: normalized(18),
    color: AppColors.black.lighter
  }
})