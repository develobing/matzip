import FeedFavoriteList from '@/components/feed/FeedFavoriteList';
import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

interface FeedFavoriteScreenProps {}

const FeedFavoriteScreen = ({}: FeedFavoriteScreenProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <SafeAreaView>
      <FeedFavoriteList />
    </SafeAreaView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
  });

export default FeedFavoriteScreen;
