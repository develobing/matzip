import {colors} from '@/constants';
import useModal from '@/hooks/useModal';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import {MonthYear, isSameAsCurrentDate} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CalendarHomHeaderRight from './CalendarHomHeaderRight';
import DateBox from './DateBox';
import DayOfWeeks from './DayOfWeeks';
import YearSelector from './YearSelector';

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
  const {theme} = useThemeStore();
  const navigation = useNavigation();
  const {month, year, lastDate, firstDOW} = monthYear;
  const yearSelector = useModal();
  const styles = styling(theme);

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
            color={colors[theme].BLACK}
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
            color={colors[theme].GRAY_500}
          />
        </Pressable>
        <Pressable
          onPress={() => onChangeMonth(1)}
          style={styles.monthButtonContainer}>
          <Ionicons
            name="arrow-down-circle-outline"
            size={25}
            color={colors[theme].BLACK}
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

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
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
      color: colors[theme].BLACK,
    },
    bodyContainer: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors[theme].GRAY_300,
      backgroundColor: colors[theme].GRAY_100,
    },
  });

export default Calendar;
