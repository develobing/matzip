import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import useForm from '@/hooks/useForm';
import {validateLogin} from '@/utils';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';
import {errorMessages} from '@/constants';

interface LoginScreenProps {}

function LoginScreen({}: LoginScreenProps) {
  const {loginMutation} = useAuth();
  const passwordRef = useRef<TextInput | null>(null);

  const login = useForm({
    initialValue: {
      email: '',
      password: '',
    },

    validate: validateLogin,
  });

  const handleSubmit = () => {
    loginMutation.mutate(login.values, {
      onError: error => {
        Toast.show({
          type: 'error',
          text1: error.response?.data.message || errorMessages.UNEXPECTED_ERROR,
          position: 'bottom',
          visibilityTime: 3000,
        });
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          inputMode="email"
          placeholder="이메일"
          returnKeyType="next"
          error={login.errors.email}
          touched={login.touched.email}
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...login.getTextInputProps('email')}
        />
        <InputField
          secureTextEntry
          ref={passwordRef}
          placeholder="비밀번호"
          returnKeyType="join"
          error={login.errors.password}
          touched={login.touched.password}
          blurOnSubmit={false}
          onSubmitEditing={handleSubmit}
          {...login.getTextInputProps('password')}
        />
      </View>

      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },

  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default LoginScreen;
