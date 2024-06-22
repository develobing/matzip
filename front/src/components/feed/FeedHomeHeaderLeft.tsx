import React from 'react';
import HeaderButton from '../common/HeaderButton';
import {colors} from '@/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CompositeNavigationProp} from '@react-navigation/native';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';

type FeedHomeHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const FeedHomeHeaderLeft = (navigation: FeedHomeHeaderLeftProps) => {
  return (
    <HeaderButton
      icon={<Ionicons name="menu" color={colors.BLACK} size={24} />}
      onPress={() => navigation.openDrawer()}
    />
  );
};

export default FeedHomeHeaderLeft;
