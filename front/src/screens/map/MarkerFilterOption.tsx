import {CompoundOption} from '@/components/common/CompoundOption';
import {categoryList, colorHex} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useMarkerFilterStorage from '@/hooks/useMarkerFilter';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  isVisible: boolean;
  hideOption: () => void;
}

const MarkerFilterOption: FC<Props> = ({
  isVisible,
  hideOption,
}: Props): JSX.Element => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const insets = useSafeAreaInsets();
  const {getProfileQuery} = useAuth();
  const {categories} = getProfileQuery.data || {};
  const markerFilter = useMarkerFilterStorage();
  const [filterCondition, setFilterCondition] = useState('색상');

  const handleCondition = (condition: string) => {
    setFilterCondition(condition);
  };

  const handleFilter = (name: string) => {
    markerFilter.set({
      ...markerFilter.items,
      [name]: !markerFilter.items[name],
    });
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Title>마커 필터링</CompoundOption.Title>
          <CompoundOption.Divider />

          <View style={styles.filterContainer}>
            {['색상', '평점'].map(condition => (
              <CompoundOption.Filter
                key={condition}
                isSelected={filterCondition === condition}
                onPress={() => handleCondition(condition)}>
                {condition}
              </CompoundOption.Filter>
            ))}
          </View>
          <CompoundOption.Divider />

          {filterCondition === '색상' && (
            <>
              {categoryList.map(color => (
                <CompoundOption.CheckBox
                  key={color}
                  isChecked={markerFilter.items[color]}
                  icon={
                    <View
                      style={[
                        styles.marker,
                        {backgroundColor: colorHex[color]},
                      ]}
                    />
                  }
                  onPress={() => handleFilter(color)}>
                  {categories?.[color]}
                </CompoundOption.CheckBox>
              ))}
            </>
          )}

          {filterCondition === '평점' && (
            <>
              {['1', '2', '3', '4', '5'].map(score => (
                <CompoundOption.CheckBox
                  key={score}
                  isChecked={markerFilter.items[score]}
                  icon={<View style={[styles.marker]} />}
                  onPress={() => handleFilter(score)}>
                  {score}점
                </CompoundOption.CheckBox>
              ))}
            </>
          )}

          <CompoundOption.Divider />

          <CompoundOption.Button onPress={hideOption}>
            완료
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.Background>
    </CompoundOption>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    filterContainer: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      justifyContent: 'space-around',
    },
    marker: {
      width: 20,
      height: 20,
      borderRadius: 10,
    },
  });

export default MarkerFilterOption;
