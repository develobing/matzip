import {colors} from '@/constants';
import React from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

interface DatePickerOptionProps {
  date: Date;
  isVisible: boolean;
  onChangeDate: (date: Date) => void;
  onConfirmDate: () => void;
}

const DatePickerOption = ({
  date,
  isVisible,
  onChangeDate,
  onConfirmDate,
}: DatePickerOptionProps) => {
  return (
    <Modal transparent animationType="slide" visible={isVisible}>
      <SafeAreaView style={styles.optionBackground}>
        <View style={styles.optionContainer}>
          <View style={styles.pickerContainer}>
            <DatePicker
              mode="date"
              locale="ko"
              date={date}
              onDateChange={onChangeDate}
            />
          </View>

          <Pressable style={styles.optionButton} onPress={onConfirmDate}>
            <Text style={styles.optionText}>확인</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  optionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  optionContainer: {
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: colors.GRAY_100,
    overflow: 'hidden',
  },

  pickerContainer: {alignItems: 'center'},

  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    gap: 5,
  },

  optionText: {
    color: colors.BLUE_500,
    fontSize: 17,
    fontWeight: 500,
  },
});

export default DatePickerOption;
