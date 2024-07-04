import CustomButton from '@/components/common/CustomButton';
import {alerts, colors, errorMessages} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import React, {FC} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import Toast from 'react-native-toast-message';

interface Props {}

const DeleteAccountScreen: FC<Props> = (): JSX.Element => {
  const {theme} = useThemeStore();
  const {deleteAccountMutation} = useAuth();
  const styles = styling(theme);

  const handlePressDeleteAccount = () => {
    Alert.alert(
      alerts.DELETE_ACCOUNT.TITLE,
      alerts.DELETE_ACCOUNT.DESCRIPTION,

      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '탈퇴',
          style: 'destructive',
          onPress: () => {
            deleteAccountMutation.mutate(null, {
              onSuccess: () => {
                Toast.show({
                  type: 'success',
                  text1: '회원 탈퇴가 완료되었습니다.',
                  position: 'bottom',
                });
              },

              onError: error => {
                Toast.show({
                  type: 'error',
                  text1:
                    error.response?.data.message ||
                    errorMessages.UNEXPECTED_ERROR,
                  position: 'bottom',
                });
              },
            });
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>저장된 데이터를 모두 삭제해야</Text>
        <Text style={styles.infoText}>회원 탈퇴가 가능해요.</Text>
        <Text style={styles.infoText}>
          저장된 장소가 남아있다면 삭제해주세요.
        </Text>
      </View>

      <CustomButton label="회원탈퇴" onPress={handlePressDeleteAccount} />
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      marginBottom: 20,
    },

    infoContainer: {
      alignItems: 'center',
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 30,
      borderWidth: 1,
      borderColor: colors[theme].PINK_700,
      borderRadius: 3,
      padding: 10,
      gap: 10,
    },

    infoText: {
      color: colors[theme].PINK_700,
      fontSize: 15,
      fontWeight: 600,
    },
  });

export default DeleteAccountScreen;
