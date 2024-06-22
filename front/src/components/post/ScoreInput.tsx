import {colors} from '@/constants';
import Slider from '@react-native-community/slider';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface ScoreInputProps {
  score: number;
  onScoreChange: (score: number) => void;
}

const ScoreInput = ({score, onScoreChange}: ScoreInputProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>평점</Text>
        <Text style={styles.labelText}>{score}점</Text>
      </View>

      <Slider
        step={1}
        minimumValue={1}
        maximumValue={5}
        minimumTrackTintColor={colors.PINK_700}
        maximumTrackTintColor={colors.GRAY_300}
        thumbTintColor={colors.GRAY_100}
        value={score}
        onValueChange={onScoreChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.GRAY_200,
  },

  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  labelText: {
    color: colors.GRAY_700,
  },
});

export default ScoreInput;
