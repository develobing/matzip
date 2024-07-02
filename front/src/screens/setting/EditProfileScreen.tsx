import InputField from '@/components/common/InputField';
import {colors, errorMessages, settingNavigations} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import {validateEditProfile} from '@/utils';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditProfileHeaderRight from './EditProfileHeaderRight';
import EditProfileImageOption from './EditProfileImageOption';

type EditProfileScreenProps = StackScreenProps<SettingStackParamList>;

const EditProfileScreen = ({navigation}: EditProfileScreenProps) => {
  const {getProfileQuery, profileMutation} = useAuth();
  const {nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {};
  const imageModal = useModal();

  const imagePicker = useImagePicker({
    initialImages: imageUri ? [{uri: imageUri}] : [],
    mode: 'single',
    onSettled: imageModal.hide,
  });

  const editProfile = useForm({
    initialValue: {nickname: nickname ?? ''},
    validate: validateEditProfile,
  });

  const handlePressImage = () => {
    imageModal.show();
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    profileMutation.mutate(
      {
        ...editProfile.values,
        nickname: editProfile.values.nickname.trim(),
        imageUri: imagePicker.imageUris[0]?.uri,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: '프로필 수정 완료',
            position: 'bottom',
          });
        },
        onError: error => {
          Toast.show({
            type: 'error',
            text1:
              error.response?.data.message || errorMessages.UNEXPECTED_ERROR,
            position: 'bottom',
          });
        },
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => EditProfileHeaderRight(handleSubmit),
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Pressable
          style={[styles.imageContainer, styles.emptyImageContainer]}
          onPress={handlePressImage}>
          {imagePicker.imageUris.length === 0 && !kakaoImageUri && (
            <Ionicons name="camera" color={colors.GRAY_500} size={30} />
          )}

          {imagePicker.imageUris.length > 0 && (
            <Image
              source={{
                uri: `${
                  Platform.OS === 'android'
                    ? 'http://10.0.2.2:3030'
                    : 'http://localhost:3030'
                }/${imagePicker.imageUris[0]?.uri}`,
              }}
              style={styles.image}
              resizeMode="cover"
            />
          )}

          {imagePicker.imageUris.length > 0 && kakaoImageUri && (
            <Image
              source={{
                uri: `${
                  Platform.OS === 'android'
                    ? 'http://10.0.2.2:3030'
                    : 'http://localhost:3030'
                }/${kakaoImageUri}`,
              }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        </Pressable>
      </View>

      <InputField
        {...editProfile.getTextInputProps('nickname')}
        placeholder="닉네임을 입력해주세요."
        error={editProfile.errors.nickname}
        touched={editProfile.touched.nickname}
      />

      <Pressable
        style={styles.deleteAccountContainer}
        onPress={() => navigation.navigate(settingNavigations.DELETE_ACCOUNT)}>
        <Ionicons name="remove-circle-sharp" size={18} color={colors.RED_500} />
        <Text style={styles.deleteAccountText}>회원탈퇴</Text>
      </Pressable>

      <EditProfileImageOption
        isVisible={imageModal.isVisible}
        hideOption={imageModal.hide}
        onChangeImage={imagePicker.handleChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  emptyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GRAY_200,
    borderRadius: 50,
    borderWidth: 1,
  },
  deleteAccountContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    right: 20,
    bottom: 70,
    backgroundColor: colors.GRAY_100,
    borderRadius: 10,
    padding: 10,
  },
  deleteAccountText: {
    color: colors.RED_500,
    fontSize: 15,
  },
});

export default EditProfileScreen;
