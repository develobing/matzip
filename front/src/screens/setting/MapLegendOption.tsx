import {CompoundOption} from '@/components/common/CompoundOption';
import useLegendStorage from '@/hooks/useLegendStorage';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';

interface Props {
  isVisible: boolean;
  hideOption: () => void;
}

const MapLegendOption: FC<Props> = ({isVisible, hideOption}): JSX.Element => {
  const {isVisible: isVisibleLegend, set} = useLegendStorage();

  const handlePressShow = () => {
    set(true);
    hideOption();
  };

  const handlePressHide = () => {
    set(false);
    hideOption();
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Button
            onPress={handlePressShow}
            isChecked={isVisibleLegend}>
            표시하기
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button
            onPress={handlePressHide}
            isChecked={!isVisibleLegend}>
            숨기기
          </CompoundOption.Button>
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

export default MapLegendOption;
