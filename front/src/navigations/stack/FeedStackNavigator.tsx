import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import ImageZoomScreen from '@/components/feed/ImageZoomScreen';
import {colors, feedNavigations} from '@/constants';
import EditPostScreen from '@/screens/feed/EditPostScreen';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import useThemeStore from '@/store/useThemeStore';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {LatLng} from 'react-native-maps';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: {id: number};
  [feedNavigations.EDIT_POST]: {location: LatLng};
  [feedNavigations.IMAGE_ZOOM]: {index: number};
};

const Stack = createStackNavigator<FeedStackParamList>();

function FeedStackNavigator({}) {
  const {theme} = useThemeStore();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors[theme].WHITE,
        },
        headerStyle: {
          backgroundColor: colors[theme].WHITE,
          shadowColor: colors[theme].GRAY_200,
        },
        headerTitleStyle: {
          color: colors[theme].BLACK,
          fontSize: 20,
        },
        headerTintColor: colors[theme].BLACK,
      }}>
      <Stack.Screen
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={({navigation}) => ({
          headerTitle: '피드',
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
      />
      <Stack.Screen
        name={feedNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
        options={{
          headerShown: false,
          headerTitle: ' ',
          cardStyle: {
            backgroundColor: colors[theme].GRAY_100,
          },
        }}
      />
      <Stack.Screen
        name={feedNavigations.EDIT_POST}
        component={EditPostScreen}
        options={{
          headerTitle: '게시물 수정',
        }}
      />
      <Stack.Screen
        name={feedNavigations.IMAGE_ZOOM}
        component={ImageZoomScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default FeedStackNavigator;
