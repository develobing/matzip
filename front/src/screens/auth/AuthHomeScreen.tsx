import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {authNavigations, colors} from '@/constants';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import CustomButton from '@/components/common/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  const {appleLoginMutation} = useAuth();

  const handlePressAppleLogin = async () => {
    try {
      const {identityToken, fullName} = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      if (identityToken) {
        appleLoginMutation.mutate({
          identityToken,
          appId: 'com.matzip-robin.front',
          nickname: fullName?.givenName ?? null,
        });
      }
    } catch (error: any) {
      console.log('handlePressAppleLogin() - error', error);

      if (error.code !== appleAuth.Error.CANCELED) {
        Toast.show({type: 'error', text1: '애플 로그인에 실패했습니다.'});
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/logo.jpg')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={styles.buttonContainer}>
        {Platform.OS === 'ios' && (
          <AppleButton
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_IN}
            style={styles.appleButton}
            cornerRadius={3}
            onPress={handlePressAppleLogin}
          />
        )}

        <CustomButton
          label="카카오 로그인하기"
          icon={
            <Ionicons name="chatbubble-sharp" size={20} color={'#181500'} />
          }
          style={styles.kakaoButtonContainer}
          textStyle={styles.kakaoButtonText}
          onPress={() => navigation.navigate(authNavigations.KAKAO)}
        />
        <CustomButton
          label="이메일 로그인하기"
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />

        <Pressable
          style={styles.emailTextContainer}
          onPress={() => navigation.navigate(authNavigations.SIGNUP)}>
          <Text style={styles.emailText}>이메일로 가입하기</Text>
        </Pressable>

        <CustomButton
          label="회원가입하기"
          variant="outlined"
          onPress={() => navigation.navigate(authNavigations.SIGNUP)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    alignItems: 'center',
  },

  imageContainer: {
    flex: 1.5,
    width: '100%',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  buttonContainer: {
    flex: 1,
    gap: 10,
  },

  kakaoButtonContainer: {
    backgroundColor: '#FEE503',
  },

  kakaoButtonText: {
    color: '#181500',
  },

  emailTextContainer: {alignItems: 'center'},

  emailText: {
    textDecorationLine: 'underline',
    fontWeight: '500',
    padding: 10,
    color: colors.BLACK,
  },

  appleButton: {
    width: Dimensions.get('screen').width - 60,
    height: 45,
    paddingVertical: 25,
  },
});

export default AuthHomeScreen;
