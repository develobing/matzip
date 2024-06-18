import {getFormDataImages} from '@/utils';
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import useMutateImages from './queries/useMutateImages';
import {useState} from 'react';
import {ImageUri} from '@/types';
import {Alert} from 'react-native';

interface UseImagePickerProps {
  initialImages?: ImageUri[];
}

function useImagePicker({initialImages = []}: UseImagePickerProps = {}) {
  const uploadImages = useMutateImages();
  const [imageUris, setImageUris] = useState(initialImages);

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert('이미지 개수 초과', '사진은 최대 5장까지 업로드 가능합니다.');
      return;
    }

    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
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
      maxFiles: 5,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then(images => {
        const formData = getFormDataImages(images as Image[]);

        uploadImages.mutate(formData, {
          onSuccess: data => addImageUris(data),
        });
      })
      .catch(error => {
        console.error('useImagePicker() - error', error);

        if (error.code === 'E_PICKER_CANCELLED') {
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
