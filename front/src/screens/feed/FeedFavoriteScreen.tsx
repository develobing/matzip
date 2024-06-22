import FeedFavoriteList from '@/components/feed/FeedFavoriteList';
import {colors} from '@/constants';
import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

interface FeedFavoriteScreenProps {}

const FeedFavoriteScreen = ({}: FeedFavoriteScreenProps) => {
  return (
    <SafeAreaView>
      <FeedFavoriteList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default FeedFavoriteScreen;
