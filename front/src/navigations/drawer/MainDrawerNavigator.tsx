import {colors, mainNavigations} from '@/constants';
import MapStackNavigator, {
  MapStackParamList,
} from '@/navigations/stack/MapStackNavigator';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import React from 'react';
import {Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeedTabNavigator, {FeedTabParamList} from '../tab/FeedTabNavigator';
import CustomDrawerContent from './CustomDrawerContent';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import SettingStackNavigator, {
  SettingStackParamList,
} from '../stack/SettingStackNavigator';
import SettingHeaderLeft from '@/components/setting/SettingHeaderLeft';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: NavigatorScreenParams<FeedTabParamList>;
  [mainNavigations.CALENDAR]: undefined;
  [mainNavigations.SETTING]: NavigatorScreenParams<SettingStackParamList>;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function DrawerIcons(route: RouteProp<MainDrawerParamList>, focused: boolean) {
  let iconsName = '';
  switch (route.name) {
    case mainNavigations.HOME:
      iconsName = 'location-on';
      break;
    case mainNavigations.FEED:
      iconsName = 'book';
      break;
    case mainNavigations.CALENDAR:
      iconsName = 'event-note';
      break;
    case mainNavigations.SETTING:
      iconsName = 'settings';
      break;
  }

  return (
    <MaterialIcons
      name={iconsName}
      size={18}
      color={focused ? colors.BLACK : colors.GRAY_500}
    />
  );
}

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({route}) => ({
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: Dimensions.get('screen').width * 0.6,
          backgroundColor: colors.WHITE,
        },
        drawerActiveTintColor: colors.BLACK,
        drawerInactiveTintColor: colors.GRAY_500,
        drawerActiveBackgroundColor: colors.PINK_200,
        drawerInactiveBackgroundColor: colors.GRAY_100,
        drawerLabelStyle: {
          fontWeight: '600',
        },
        drawerIcon: ({focused}) => DrawerIcons(route, focused),
      })}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={MapStackNavigator}
        options={{title: '홈', swipeEnabled: false}}
      />
      <Drawer.Screen
        name={mainNavigations.FEED}
        component={FeedTabNavigator}
        options={{title: '피드'}}
      />
      <Drawer.Screen
        name={mainNavigations.CALENDAR}
        component={CalendarHomeScreen}
        options={({navigation}) => ({
          title: '캘린더',
          headerShown: true,
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
      />
      <Drawer.Screen
        name={mainNavigations.SETTING}
        component={SettingStackNavigator}
        options={{
          title: '설정',
          drawerItemStyle: {height: 0},
        }}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
