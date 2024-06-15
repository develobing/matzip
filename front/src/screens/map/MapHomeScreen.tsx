import React from 'react';
import {Button, Text, View} from 'react-native';
import useAuth from '@/hooks/queries/useAuth';

interface MapHomeScreenProps {}

function MapHomeScreen({}: MapHomeScreenProps) {
  const {logoutMutation} = useAuth();

  return (
    <View>
      <Text>맵 스크린</Text>
      <Button title="로그아웃" onPress={() => logoutMutation.mutate(null)} />
    </View>
  );
}

export default MapHomeScreen;
