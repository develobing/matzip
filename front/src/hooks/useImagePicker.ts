import {getFormDataImages} from '@/utils';
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import useMutateImages from './queries/useMutateImages';
import {useState} from 'react';
import {ImageUri} from '@/types';
import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';

interface UseImagePickerProps {
  initialImages?: ImageUri[];
  mode?: 'single' | 'multiple';
  onSettled?: () => void;
}

function useImagePicker({
  initialImages = [],
  mode = 'multiple',
  onSettled,
}: UseImagePickerProps = {}) {
  const uploadImages = useMutateImages();
  const [imageUris, setImageUris] = useState(initialImages);

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert('이미지 개수 초과', '사진은 최대 5장까지 업로드 가능합니다.');
      return;
    }

    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const replaceImageUri = (uris: string[]) => {
    if (uris.length > 1) {
      Alert.alert('이미지 개수 초과', '사진은 최대 1장까지 업로드 가능합니다.');
      return;
    }

    setImageUris([...uris.map(uri => ({uri}))]);
  };

  const deleteImageUri = (uri: string) => {
    const newImageUris = imageUris.filter(imageUri => imageUri.uri !== uri);
    setImageUris(newImageUris);
  };

  const changeImageUrisOrder = (fromIndex: number, toIndex: number) => {
    const copyImageUris = [...imageUris];
    const [movedImage] = copyImageUris.splice(fromIndex, 1);
    copyImageUris.splice(toIndex, 0, movedImage);
    setImageUris(copyImageUris);
  };

  const handleChange = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: mode === 'multiple' ? 5 : 1,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then(images => {
        const formData = getFormDataImages(images as Image[]);

        uploadImages.mutate(formData, {
          onSuccess: data =>
            mode === 'multiple' ? addImageUris(data) : replaceImageUri(data),
          onSettled: () => onSettled && onSettled(),
        });
      })
      .catch(error => {
        console.error('useImagePicker() - error', error);

        if (error.code === 'E_PICKER_CANCELLED') {
          Toast.show({
            type: 'error',
            text1: '갤러리를 열 수 없어요.',
            text2: '권한을 허용했는지 확인해주세요.',
            position: 'bottom',
          });
          return;
        }

        if (error.code === 'E_PERMISSION_MISSING') {
          // 에러 메시지 표시
          Alert.alert('사진을 가져오기 위해서는 권한이 필요합니다.');
        }
      });
  };

  return {
    imageUris,
    delete: deleteImageUri,
    changeOrder: changeImageUrisOrder,
    handleChange,
  };
}

export default useImagePicker;
