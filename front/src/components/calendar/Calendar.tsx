import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View, Pressable, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {MonthYear, isSameAsCurrentDate} from '@/utils';
import {colors} from '@/constants';
import DayOfWeeks from './DayOfWeeks';
import DateBox from './DateBox';
import YearSelector from './YearSelector';
import useModal from '@/hooks/useModal';
import {useNavigation} from '@react-navigation/native';
import CalendarHomHeaderRight from './CalendarHomHeaderRight';

interface CalendarProps<T> {
  monthYear: MonthYear;
  selectedDate: number;
  schedules: Record<number, T>;
  moveToToday: () => void;
  onPressDate: (date: number) => void;
  onChangeMonth: (increment: number) => void;
}

function Calendar<T>({
  monthYear,
  selectedDate,
  schedules,
  moveToToday,
  onPressDate,
  onChangeMonth,
}: CalendarProps<T>) {
  const navigation = useNavigation();
  const {month, year, lastDate, firstDOW} = monthYear;
  const yearSelector = useModal();

  const onChangeYear = (selectedYear: number) => {
    onChangeMonth((selectedYear - year) * 12);
    yearSelector.hide();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => CalendarHomHeaderRight({moveToToday}),
    });
  }, [moveToToday, navigation]);

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => onChangeMonth(-1)}
          style={styles.monthButtonContainer}>
          <Ionicons
            name="arrow-up-circle-outline"
            size={25}
            color={colors.BLACK}
          />
        </Pressable>

        <Pressable
          style={styles.monthYearContainer}
          onPress={yearSelector.show}>
          <Text style={styles.titleText}>
            {year}년 {month}월
          </Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={20}
            color={colors.GRAY_500}
          />
        </Pressable>
        <Pressable
          onPress={() => onChangeMonth(1)}
          style={styles.monthButtonContainer}>
          <Ionicons
            name="arrow-down-circle-outline"
            size={25}
            color={colors.BLACK}
          />
        </Pressable>
      </View>

      <DayOfWeeks />
      <View style={styles.bodyContainer}>
        <FlatList
          data={Array.from({length: lastDate + firstDOW}, (_, i) => ({
            id: i,
            date: i - firstDOW + 1,
          }))}
          renderItem={({item}) => (
            <DateBox
              date={item.date}
              isToday={isSameAsCurrentDate(year, month, item.date)}
              hasSchedule={Boolean(schedules[item.date])}
              selectedDate={selectedDate}
              onPressDate={onPressDate}
            />
          )}
          keyExtractor={item => String(item.id)}
          numColumns={7}
        />
      </View>

      <YearSelector
        currentYear={year}
        isVisible={yearSelector.isVisible}
        hide={yearSelector.hide}
        onChangeYear={onChangeYear}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 16,
  },
  monthYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  monthButtonContainer: {
    padding: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.BLACK,
  },
  bodyContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.GRAY_300,
    backgroundColor: colors.GRAY_100,
  },
});

export default Calendar;
