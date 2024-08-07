import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import CustomMarker from '../common/CustomMarker';
import {categoryList, colors} from '@/constants';
import {ScrollView} from 'react-native';
import {MarkerColor, ThemeMode} from '@/types';
import useThemeStore from '@/store/useThemeStore';

interface MarkerSelectorProps {
  score: number;
  markerColor: MarkerColor;
  onPressMarker?: (color: MarkerColor) => void;
}

const MarkerSelector = ({
  score,
  markerColor,
  onPressMarker,
}: MarkerSelectorProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.markerLabel}>마커 선택</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {categoryList.map(color => (
            <Pressable
              key={color}
              style={[
                styles.markerBox,
                markerColor === color && styles.pressedMarker,
              ]}
              onPress={() => onPressMarker && onPressMarker(color)}>
              <CustomMarker color={color} score={score} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      padding: 15,
    },

    markerLabel: {
      marginBottom: 15,
      color: colors[theme].GRAY_700,
    },

    markerInputScroll: {
      flexDirection: 'row',
      gap: 20,
    },

    markerBox: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 55,
      height: 55,
      borderRadius: 6,
      backgroundColor: colors[theme].GRAY_100,
    },

    pressedMarker: {
      borderWidth: 2,
      borderColor: colors[theme].RED_500,
    },
  });

export default MarkerSelector;
