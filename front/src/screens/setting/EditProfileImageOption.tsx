import {CompoundOption} from '@/components/common/CompoundOption';
import React, {FC} from 'react';

interface Props {
  isVisible: boolean;
  hideOption: () => void;
  onChangeImage: () => void;
}

const EditProfileImageOption: FC<Props> = ({
  isVisible,
  hideOption,
  onChangeImage,
}): JSX.Element => {
  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Button onPress={onChangeImage}>
            앨범에서 사진 선택
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

export default EditProfileImageOption;
