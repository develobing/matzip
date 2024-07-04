import {CompoundOption} from '@/components/common/CompoundOption';
import useThemeStorage from '@/hooks/useThemeStorage';
import React, {FC} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';

interface Props {
  isVisible: boolean;
  hideOption: () => void;
}

const DarkModeOption: FC<Props> = ({isVisible, hideOption}): JSX.Element => {
  const systemDefault = useColorScheme();
  const {theme, isSystem, setMode, setSystem} = useThemeStorage();

  const handlePressLight = () => {
    setMode('light');
    setSystem(false);
    hideOption();
  };

  const handlePressDark = () => {
    setMode('dark');
    setSystem(false);
    hideOption();
  };

  const handlePressSystem = () => {
    setMode(systemDefault ?? 'light');
    setSystem(true);
    hideOption();
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Button
            isChecked={!isSystem && theme === 'light'}
            onPress={handlePressLight}>
            라이트모드
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button
            isChecked={!isSystem && theme === 'dark'}
            onPress={handlePressDark}>
            다크모드
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button
            isChecked={isSystem}
            onPress={handlePressSystem}>
            시스템 기본값 모드
          </CompoundOption.Button>
          <CompoundOption.Divider />
        </CompoundOption.Container>

        <CompoundOption.Container>
          <CompoundOption.Button onPress={hideOption}>
            취소
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.Background>
    </CompoundOption>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default DarkModeOption;
