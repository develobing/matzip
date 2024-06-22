import useGetInfinitePosts from '@/hooks/useGetInfinitePosts';
import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import FeedItem from './FeedItem';

interface FeedListProps {}

const FeedList = ({}: FeedListProps) => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      contentContainerStyle={styles.container}
      scrollIndicatorInsets={{right: 1}}
      indicatorStyle="black"
      onEndReachedThreshold={0.5}
      onEndReached={handleEndReached}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default FeedList;
