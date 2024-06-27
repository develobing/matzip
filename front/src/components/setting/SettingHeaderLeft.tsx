import {colors} from '@/constants';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderButton from '../common/HeaderButton';

type SettingHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<SettingStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const SettingHeaderLeft = (navigation: SettingHeaderLeftProps): JSX.Element => {
  return (
    <HeaderButton
      icon={<Ionicons name="menu" color={colors.BLACK} size={24} />}
      onPress={() => navigation.openDrawer()}
    />
  );
};

export default SettingHeaderLeft;
