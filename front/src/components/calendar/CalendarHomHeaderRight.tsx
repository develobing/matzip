import React from 'react';
import HeaderButton from '../common/HeaderButton';

interface CalendarHomHeaderRightProps {
  moveToToday: () => void;
}

const CalendarHomHeaderRight = ({moveToToday}: CalendarHomHeaderRightProps) => {
  return <HeaderButton labelText="오늘" onPress={moveToToday} />;
};

export default CalendarHomHeaderRight;
