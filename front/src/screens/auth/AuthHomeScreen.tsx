import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import {authNavigations} from '@/constants';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import CustomButton from '@/components/CustomButton';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
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
        <CustomButton
          label="로그인하기"
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
        <CustomButton
          label="회원가입하기"
          variant="outlined"
          onPress={() => navigation.navigate(authNavigations.SIGNUP)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = {
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
};

export default AuthHomeScreen;
