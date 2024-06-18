import AddPostHeaderRight from '@/components/AddPostHeaderRight';
import CustomButton from '@/components/CustomButton';
import DatePickerOption from '@/components/DatePickerOption';
import ImageInput from '@/components/ImageInput';
import InputField from '@/components/InputField';
import MarkerSelector from '@/components/MarkerSelector';
import PreviewImageList from '@/components/PreviewImageList';
import ScoreInput from '@/components/ScoreInput';
import {colors, mapNavigations} from '@/constants';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {MarkerColor} from '@/types/domain';
import {getDateWithSeparator, validateAddPost} from '@/utils';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

const AddPostScreen = ({route, navigation}: AddPostScreenProps) => {
  const {location} = route.params;
  const createPost = useMutateCreatePost();
  const descriptionRef = useRef<TextInput | null>(null);

  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const [date, setDate] = useState(new Date());
  const [isPicked, setIsPicked] = useState(false);
  const imagePicker = useImagePicker({initialImages: []});
  usePermission('PHOTO');

  const dateOption = useModal();
  const address = useGetAddress(location);
  const addPost = useForm({
    initialValue: {
      title: '',
      description: '',
    },

    validate: validateAddPost,
  });

  const handleSelectMarker = (color: MarkerColor) => {
    setMarkerColor(color);
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
  };

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleConfirmDate = () => {
    setIsPicked(true);
    dateOption.hide();
  };

  const handleSubmit = () => {
    if (addPost.values.title.trim() === '') {
      Alert.alert('제목을 입력해주세요');
      return;
    }

    const body = {
      date,
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      address,
      imageUris: imagePicker.imageUris,
      ...location,
    };
    createPost.mutate(body, {
      onSuccess: () => {
        console.log('게시글 작성 성공 - body', body);
        navigation.goBack();
      },
      onError: error => {
        console.log('게시글 작성 실패 - body, error', body, error);
      },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight({onSubmit: handleSubmit}),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            disabled={true}
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
            value={address}
          />
          <CustomButton
            variant="outlined"
            size="large"
            label={isPicked ? getDateWithSeparator(date, '. ') : '날짜 선택'}
            onPress={dateOption.show}
          />

          <InputField
            placeholder="제목을 입력하세요"
            returnKeyType="next"
            error={addPost.errors.title}
            touched={addPost.touched.title}
            blurOnSubmit={false}
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...addPost.getTextInputProps('title')}
          />
          <InputField
            multiline
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
            returnKeyType="next"
            error={addPost.errors.description}
            touched={addPost.touched.description}
            blurOnSubmit={false}
            {...addPost.getTextInputProps('description')}
          />

          <MarkerSelector
            score={score}
            markerColor={markerColor}
            onPressMarker={handleSelectMarker}
          />
          <ScoreInput score={score} onScoreChange={handleChangeScore} />

          <View style={styles.imagesViewer}>
            <ImageInput onChange={imagePicker.handleChange} />

            <PreviewImageList
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.delete}
              onChangeOrder={imagePicker.changeOrder}
            />
          </View>

          <DatePickerOption
            date={date}
            isVisible={dateOption.isVisible}
            onChangeDate={handleChangeDate}
            onConfirmDate={handleConfirmDate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {gap: 20, marginBottom: 20},
  imagesViewer: {flexDirection: 'row', gap: 10, flexWrap: 'wrap'},
});

export default AddPostScreen;
