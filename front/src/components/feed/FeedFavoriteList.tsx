import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import FeedItem from './FeedItem';
import useGetInfiniteFavoritePosts from '@/hooks/queries/useGetInfiniteFavoritePosts';
import {Text} from 'react-native';

interface FeedListProps {}

const FeedFavoriteList = ({}: FeedListProps) => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteFavoritePosts();
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
      ListEmptyComponent={
        <View>
          <Text style={{textAlign: 'center'}}>즐겨찾기한 장소가 없습니다.</Text>
        </View>
      }
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

export default FeedFavoriteList;
